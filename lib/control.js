/**
 * Kelas Mutex untuk mengimplementasikan mekanisme penguncian (mutex) pada fungsi asinkron.
 */
class Mutex {
    constructor() {
        this.locked = false;
        this.queue = [];
    }

    /**
     * Mengunci mutex. Jika mutex sudah terkunci, fungsi akan menunggu hingga terbuka.
     * @returns {Promise<void>} - Mengembalikan promise yang akan diselesaikan ketika mutex berhasil dikunci.
     */
    async lock() {
        while (this.locked) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        this.locked = true;
    }

    /**
     * Membuka kunci mutex. Jika ada permintaan dalam antrian, akan menyelesaikan permintaan berikutnya.
     */
    unlock() {
        this.locked = false;
        if (this.queue.length > 0) {
            const nextResolve = this.queue.shift();
            nextResolve();
        }
    }
}

// // Contoh penggunaan Mutex
// const mutex = new Mutex();
// let sharedResource = 0;

// async function increment() {
//     await mutex.lock();
//     try {
//         // Mengakses dan memodifikasi sharedResource
//         console.log(`Incrementing: ${sharedResource}`);
//         sharedResource++;
//         console.log(`New Value: ${sharedResource}`);
//     } finally {
//         mutex.unlock();
//     }
// }

// // Simulasi beberapa thread (di sini menggunakan setTimeout untuk mensimulasikan concurrency)
// async function simulateConcurrentAccess() {
//     await Promise.all([
//         increment(),
//         increment(),
//         increment(),
//     ]);
// }

// simulateConcurrentAccess();

/**
 * Kelas Semaphore untuk mengontrol akses ke sumber daya dengan batasan jumlah izin.
 */
class Semaphore {
    /**
     * @param {number} max - Jumlah maksimum izin yang diperbolehkan untuk akses bersamaan.
     */
    constructor(max) {
        this.max = max; // Maksimum izin
        this.current = 0; // Jumlah thread saat ini yang mengakses
        this.queue = []; // Antrean untuk menunggu thread
    }

    /**
     * Mengakuisisi izin untuk mengakses sumber daya. Jika sudah mencapai maksimum,
     * fungsi akan menunggu dalam antrean.
     * @returns {Promise<void>} - Mengembalikan promise yang akan diselesaikan saat izin berhasil diperoleh.
     */
    async acquire() {
        // Jika jumlah thread saat ini kurang dari maksimum, izinkan akses
        if (this.current < this.max) {
            this.current++;
            return; // Langsung keluar setelah mengizinkan
        }

        // Jika sudah mencapai maksimum, tunggu dalam antrean
        await new Promise(resolve => this.queue.push(resolve));
        this.current++; // Tambah akses setelah keluar dari antrean
    }

    /**
     * Mengembalikan izin setelah selesai mengakses sumber daya. Jika ada thread
     * lain dalam antrean, beri tahu thread berikutnya.
     */
    release() {
        this.current--; // Kurangi akses saat thread selesai
        if (this.queue.length > 0) {
            const nextResolve = this.queue.shift();
            nextResolve(); // Beri tahu thread berikutnya dalam antrean
        }
    }
}

// // Contoh penggunaan Semaphore
// const semaphore = new Semaphore(2); // Maksimum 2 akses pada satu waktu
// let sharedResource = 0;

// async function accessResource(threadId) {
//     await semaphore.acquire();
//     try {
//         console.log(`Thread ${threadId} mengakses sumber daya. (Akses saat ini: ${sharedResource})`);
//         sharedResource++;
//         // Simulasi kerja dengan setTimeout
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi delay
//         console.log(`Thread ${threadId} selesai mengakses. (Nilai baru: ${sharedResource})`);
//     } finally {
//         semaphore.release();
//     }
// }

// // Simulasi beberapa thread yang mencoba mengakses sumber daya secara bersamaan
// async function simulateConcurrentAccess() {
//     const threads = [1, 2, 3, 4, 5];
//     await Promise.all(threads.map(id => accessResource(id)));
// }

// simulateConcurrentAccess();


module.exports={
    Mutex,
    Semaphore
}