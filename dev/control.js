const { Mutex } = require("../lib/control");
const { CircuitBreaker } = require("../lib/resilience");

const mutex = new Mutex();
const circuitBreaker = new CircuitBreaker(3, 30 * 1000); // Inisialisasi circuit breaker
let loggedIn = false;

async function refreshToken() {
    console.log("Refreshing token...");
    return new Promise((resolve, reject) => {
        // Simulasi proses refresh token
        setTimeout(() => {
            // Simulasi keberhasilan atau kegagalan
            if (Math.random() > 0.5) {
                // 50% sukses
                loggedIn = true; // Set status loggedIn ke true
                resolve("Token refreshed successfully");
            } else {
                reject("Failed to refresh token");
            }
        }, 1000); // Simulasi waktu refresh token
    });
}

async function cekSesi() {
    try {
        if (!loggedIn) {
            await mutex.lock(); // Mengunci mutex sebelum refresh token
            try {
                await circuitBreaker.execute(refreshToken); // Mencoba refresh token dengan circuit breaker
            } finally {
                mutex.unlock(); // Pastikan untuk membuka kunci setelah selesai
            }
        }
        // Jika berhasil login, lanjutkan
        console.log("Session is active");
    } catch (error) {
        throw error;
    }
}

async function transaksi() {
    try {
        await cekSesi(); // Cek sesi sebelum transaksi
        console.log("Transaction is being processed");
    } catch (error) {
        console.log("Transaction failed:", error);
    }
}

// Menjalankan beberapa transaksi secara bersamaan
for (let i = 0; i < 10; i++) {
    transaksi();
}
