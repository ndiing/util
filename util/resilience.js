/**
 * @module resilience
 */

/**
 * Mencoba menjalankan fungsi secara berulang hingga berhasil atau mencapai batas retry.
 *
 * @memberof module:resilience
 * @param {Function} fn - Fungsi yang akan dicoba. Harus mengembalikan sebuah promise.
 * @param {number} [retries=3] - Jumlah maksimum percobaan sebelum melemparkan kesalahan.
 * @param {number} [delay=1000] - Waktu dalam milidetik untuk menunggu sebelum mencoba lagi setelah gagal.
 * @returns {Promise<any>} - Mengembalikan hasil dari fungsi yang berhasil.
 * @throws {Error} - Melemparkan kesalahan jika semua percobaan gagal.
 */
async function retry(fn, retries = 3, delay = 1000) {
    let attempts = 0;

    while (attempts < retries) {
        try {
            return await fn();
        } catch (error) {
            attempts++;

            if (attempts >= retries) throw error;

            await new Promise((res) => setTimeout(res, delay));
        }
    }
}

/**
 * Menjalankan fungsi dan mengatur batas waktu. Jika fungsi tidak selesai dalam waktu yang ditentukan, akan melemparkan kesalahan "Timeout".
 *
 * @memberof module:resilience
 * @param {Function} fn - Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise.
 * @param {number} ms - Waktu maksimum dalam milidetik sebelum timeout.
 * @returns {Promise<any>} - Mengembalikan hasil dari fungsi jika selesai dalam batas waktu.
 * @throws {Error} - Melemparkan kesalahan jika fungsi tidak selesai dalam waktu yang ditentukan.
 */
async function timeout(fn, ms) {
    return Promise.race([fn(), new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))]);
}

/**
 * Kelas CircuitBreaker untuk mengelola dan melindungi fungsi dari kesalahan yang berulang.
 * Circuit Breaker mencegah fungsi dari pemanggilan berulang ketika kesalahan telah mencapai ambang batas.
 */
class CircuitBreaker {
    /**
     * @param {number} [failureThreshold=3] - Ambang batas jumlah kesalahan sebelum sirkuit terbuka.
     * @param {number} [resetTimeout=5000] - Waktu dalam milidetik sebelum sirkuit setengah terbuka setelah terbuka.
     */
    constructor(failureThreshold = 3, resetTimeout = 5000) {
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.failureCount = 0;
        this.state = "CLOSED";
        this.lastFailureTime = null;
    }

    /**
     * Menjalankan fungsi dan menerapkan circuit breaker.
     * Jika sirkuit terbuka, fungsi tidak akan dieksekusi hingga waktu reset berlalu.
     *
     * @param {Function} fn - Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise.
     * @returns {Promise<any>} - Mengembalikan hasil dari fungsi jika berhasil.
     * @throws {Error} - Melemparkan kesalahan jika fungsi gagal atau jika sirkuit terbuka.
     */
    async execute(fn) {
        if (this.state === "OPEN") {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.state = "HALF_OPEN";
            } else {
                throw new Error("Circuit is open");
            }
        }

        try {
            const result = await fn();

            this.reset();

            return result;
        } catch (error) {
            this.failureCount++;
            this.lastFailureTime = Date.now();

            if (this.failureCount >= this.failureThreshold) {
                this.state = "OPEN";
            }

            throw error;
        }
    }

    /**
     * Mereset status circuit breaker ke keadaan tertutup dan mengatur ulang hitungan kesalahan.
     */
    reset() {
        this.failureCount = 0;
        this.state = "CLOSED";
    }
}

/**
 * Kelas Bulkhead untuk mengelola batas maksimum permintaan yang dapat dieksekusi secara bersamaan.
 * Bulkhead membantu mencegah satu bagian dari aplikasi mempengaruhi bagian lainnya dengan membatasi
 * jumlah permintaan yang dapat diproses dalam waktu bersamaan.
 */
class Bulkhead {
    /**
     * @param {number} maxRequests - Jumlah maksimum permintaan yang dapat diproses secara bersamaan.
     */
    constructor(maxRequests) {
        this.maxRequests = maxRequests;
        this.queue = [];
        this.currentRequests = 0;
    }

    /**
     * Menjalankan fungsi dan mengatur antrian permintaan jika batas maksimum tercapai.
     *
     * @param {Function} fn - Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise.
     * @returns {Promise<any>} - Mengembalikan hasil dari fungsi jika berhasil.
     */
    async execute(fn) {
        if (this.currentRequests < this.maxRequests) {
            this.currentRequests++;

            try {
                return await fn();
            } finally {
                this.currentRequests--;
                this.processQueue();
            }
        } else {
            return await new Promise((resolve, reject) => {
                this.queue.push({ fn, resolve, reject });
            });
        }
    }

    /**
     * Memproses antrian permintaan yang menunggu jika ada kapasitas yang tersedia.
     */
    processQueue() {
        if (this.queue.length > 0 && this.currentRequests < this.maxRequests) {
            const { fn, resolve, reject } = this.queue.shift();

            this.execute(fn).then(resolve).catch(reject);
        }
    }
}

/**
 * Kelas RateLimiter untuk membatasi jumlah permintaan yang dapat dilakukan dalam jangka waktu tertentu.
 * Berguna untuk menghindari kelebihan beban pada server atau API.
 */
class RateLimiter {
    /**
     * @param {number} maxRequests - Jumlah maksimum permintaan yang diizinkan dalam interval waktu.
     * @param {number} interval - Interval waktu dalam milidetik untuk membatasi permintaan.
     */
    constructor(maxRequests, interval) {
        this.maxRequests = maxRequests;
        this.interval = interval;
        this.requests = [];
    }

    /**
     * Menjalankan fungsi jika batas permintaan belum terlampaui.
     *
     * @param {Function} fn - Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise.
     * @returns {Promise<any>} - Mengembalikan hasil dari fungsi jika batas permintaan belum terlampaui.
     * @throws {Error} - Melempar error jika batas permintaan telah terlampaui.
     */
    async execute(fn) {
        const now = Date.now();

        this.requests = this.requests.filter((timestamp) => now - timestamp < this.interval);

        if (this.requests.length >= this.maxRequests) {
            throw new Error("Rate limit exceeded");
        }

        this.requests.push(now);

        return await fn();
    }
}

module.exports = {
    retry,
    timeout,
    CircuitBreaker,
    Bulkhead,
    RateLimiter,
};
