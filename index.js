

const path = require("path");
const fs = require("fs");


/**
 * @module string
 */

/**
 * Mengubah string menjadi format PascalCase.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format PascalCase.
 */
function toPascalCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2) => {
            return $2.toUpperCase();
        })
        .replace(/[^a-zA-Z0-9]+$/g, "");
}

/**
 * Mengubah string menjadi format camelCase.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format camelCase.
 */
function toCamelCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return $xx === 0 ? $2.toLowerCase() : $2.toUpperCase();
        })
        .replace(/[^a-zA-Z0-9]+$/g, "");
}

/**
 * Mengubah string menjadi format snake_case.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format snake_case.
 */
function toSnakeCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/([a-z])([A-Z])/g, ($, $1, $2) => {
            return $1 + "_" + $2;
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return "_" + $2;
        })
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
        .toLowerCase();
}

/**
 * Mengubah string menjadi format kebab-case.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format kebab-case.
 */
function toKebabCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/([a-z])([A-Z])/g, ($, $1, $2) => {
            return $1 + "-" + $2;
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return "-" + $2;
        })
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
        .toLowerCase();
}

/**
 * Mengubah string menjadi format Title Case.
 * @memberof module:string
 * @param {string} string - String input yang akan diubah.
 * @returns {string} - String dalam format Title Case.
 */
function toTitleCase(string) {
    return string
        .replace(/([A-Z])([A-Z]+)/g, ($, $1, $2) => {
            return $1 + $2.toLowerCase();
        })
        .replace(/([a-z])([A-Z])/g, ($, $1, $2) => {
            return $1 + " " + $2;
        })
        .replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, ($, $1, $2, $xx) => {
            return " " + $2.toUpperCase();
        })
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
}



/**
 * @module file
 */

/**
 * Membaca konten dari file dengan nama yang diberikan.
 *
 * @memberof module:file
 * @param {string} filename - Nama file yang akan dibaca.
 * @returns {string|null} - Mengembalikan konten file dalam bentuk string atau `null` jika terjadi kesalahan.
 */
function read(filename) {
    let data;
    try {
        data = fs.readFileSync(filename, { encoding: "utf8" });
    } catch (error) {}
    return data;
}

/**
 * Menulis data ke file dengan nama yang diberikan.
 * Jika direktori tidak ada, direktori akan dibuat.
 *
 * @memberof module:file
 * @param {string} filename - Nama file di mana data akan ditulis.
 * @param {string} data - Konten yang akan ditulis ke file.
 */
function write(filename, data) {
    const dirname = path.dirname(filename);
    try {
        fs.readdirSync(dirname);
    } catch (error) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(filename, data);
}


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


/**
 * Kelas yang mengimplementasikan mekanisme mutex untuk penguncian sumber daya.
 */
class Mutex {
    constructor() {
        this.locked = false;
        this.queue = [];
    }

    /**
     * Mengunci mutex. Jika sudah terkunci, menunggu sampai dapat mengunci.
     * @returns {Promise<void>} - Sebuah promise yang diselesaikan saat mutex terkunci.
     */
    async lock() {
        while (this.locked) {
            await new Promise((resolve) => this.queue.push(resolve));
        }
        this.locked = true;
    }

    /**
     * Membuka kunci mutex dan memberi kesempatan kepada antrean untuk mengunci.
     */
    unlock() {
        this.locked = false;
        if (this.queue.length > 0) {
            const nextResolve = this.queue.shift();
            nextResolve();
        }
    }
}

/**
 * Kelas yang mengimplementasikan mekanisme semaphore untuk pengelolaan akses ke sumber daya.
 */
class Semaphore {
    /**
     * @param {number} max - Jumlah maksimum akses yang diizinkan pada satu waktu.
     */
    constructor(max) {
        this.max = max;
        this.current = 0;
        this.queue = [];
    }

    /**
     * Mengakuisisi akses semaphore. Jika sudah mencapai maksimum, menunggu sampai ada akses yang dilepaskan.
     * @returns {Promise<void>} - Sebuah promise yang diselesaikan saat akses diperoleh.
     */
    async acquire() {
        if (this.current < this.max) {
            this.current++;
            return;
        }
        await new Promise((resolve) => this.queue.push(resolve));
        this.current++;
    }

    /**
     * Membebaskan akses semaphore, memberi kesempatan kepada antrean untuk mengakuisisi akses.
     */
    release() {
        this.current--;
        if (this.queue.length > 0) {
            const nextResolve = this.queue.shift();
            nextResolve();
        }
    }
}



module.exports = {
    read,
    write,

    Mutex,
    Semaphore,

    retry,
    timeout,
    CircuitBreaker,
    Bulkhead,
    RateLimiter,

    toPascalCase,
    toCamelCase,
    toSnakeCase,
    toKebabCase,
    toTitleCase,
};
