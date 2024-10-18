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
    Mutex,
    Semaphore,
};
