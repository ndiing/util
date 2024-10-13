async function retry(fn, retries = 3, delay = 1000) {
    let attempts = 0;
    while (attempts < retries) {
        try {
            console.log(`Attempt ${attempts + 1}:`);
            return await fn();
        } catch (error) {
            attempts++;
            console.error(`Error: ${error.message}. Retrying...`);
            if (attempts >= retries) throw error;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

// // // Contoh penggunaan
// const mockRequestWithError = async () => {
//     await new Promise(resolve=>setTimeout(resolve,1000*Math.random()))
//     if (Math.random() < 0.1) { // 70% chance gagal
//         throw new Error('Request failed');
//     }
//     return 'Success!';
// };

// retry(mockRequestWithError)
//     .then(result => console.log(result))
//     .catch(error => console.error(`Final Error: ${error.message}`));


class CircuitBreaker {
    constructor(failureThreshold = 3, resetTimeout = 5000) {
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.failureCount = 0;
        this.state = 'CLOSED';
        this.lastFailureTime = null;
    }

    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('Circuit is open');
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
                this.state = 'OPEN';
                console.error('Circuit opened');
            }
            throw error;
        }
    }

    reset() {
        this.failureCount = 0;
        this.state = 'CLOSED';
        console.log('Circuit closed');
    }
}

// // Contoh penggunaan
// const circuitBreaker = new CircuitBreaker();

// const circuitBreakerRequest = async () => {
//     return await circuitBreaker.execute(mockRequestWithError);
// };

// const testCircuitBreaker = async () => {
//     for (let i = 0; i < 10; i++) {
//         try {
//             const result = await circuitBreakerRequest();
//             console.log(result);
//         } catch (error) {
//             console.error(`Error: ${error.message}`);
//         }
//     }
// };

// testCircuitBreaker();

class Bulkhead {
    constructor(maxRequests) {
        this.maxRequests = maxRequests;
        this.queue = []; // Menyimpan permintaan yang tertunda
        this.currentRequests = 0;
    }

    async execute(fn) {
        // Jika jumlah permintaan saat ini kurang dari batas, jalankan fungsi
        if (this.currentRequests < this.maxRequests) {
            this.currentRequests++;
            try {
                return await fn();
            } finally {
                this.currentRequests--;
                this.processQueue(); // Memproses antrian jika ada
            }
        } else {
            // Jika batas terlampaui, masukkan fungsi ke dalam antrian
            return await new Promise((resolve, reject) => {
                this.queue.push({ fn, resolve, reject });
            });
        }
    }

    // Memproses antrian
    processQueue() {
        if (this.queue.length > 0 && this.currentRequests < this.maxRequests) {
            const { fn, resolve, reject } = this.queue.shift(); // Ambil permintaan dari antrian
            this.execute(fn).then(resolve).catch(reject); // Jalankan fungsi
        }
    }
}

// // Contoh penggunaan
// const bulkhead = new Bulkhead(3); // Maksimal 3 permintaan bersamaan

// const bulkheadRequest = async () => {
//     return await bulkhead.execute(mockRequestWithError);
// };

// const testBulkhead = async () => {
//     const requests = Array.from({ length: 10 }, (_, i) => {
//         return bulkheadRequest()
//         .then(console.log).catch(error => console.error(`Request ${i + 1} failed: ${error.message}`));
//     });
//     await Promise.all(requests);
// };

// testBulkhead();

async function timeout(fn, ms) {
    return Promise.race([
        fn(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
}

// // Contoh penggunaan
// const timeoutRequest = async () => {
//     return await timeout(mockRequestWithError, 2000); // Timeout setelah 2 detik
// };

// const testTimeout = async () => {
//     try {
//         const result = await timeoutRequest();
//         console.log(result);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// };

// testTimeout();

class RateLimiter {
    constructor(maxRequests, interval) {
        this.maxRequests = maxRequests;
        this.interval = interval;
        this.requests = [];
    }

    async execute(fn) {
        const now = Date.now();
        this.requests = this.requests.filter(timestamp => now - timestamp < this.interval);

        if (this.requests.length >= this.maxRequests) {
            throw new Error('Rate limit exceeded');
        }

        this.requests.push(now);
        return await fn();
    }
}

// // Contoh penggunaan
// const rateLimiter = new RateLimiter(3, 5000); // Maksimal 3 permintaan setiap 5 detik

// const rateLimiterRequest = async () => {
//     return await rateLimiter.execute(mockRequestWithError);
// };

// const testRateLimiter = async () => {
//     const requests = Array.from({ length: 10 }, (_, i) => {
//         return rateLimiterRequest().catch(error => console.error(`Request ${i + 1} failed: ${error.message}`));
//     });
//     await Promise.all(requests);
// };

// testRateLimiter();



// const circuitBreaker = new CircuitBreaker();
// const bulkhead = new Bulkhead(5);
// const rateLimiter = new RateLimiter(3, 10000); // 3 requests every 10 seconds

// async function mockRequest() {
//     // Simulasi permintaan yang dapat gagal
//     if (Math.random() < 0.5) {
//         throw new Error('Request failed');
//     }
//     return 'Success!';
// }

// async function main() {
//     for (let i = 0; i < 10; i++) {
//         try {
//             const result = await rateLimiter.execute(() =>
//                 timeout(() => bulkhead.execute(() =>
//                     circuitBreaker.execute(() => retry(mockRequest))
//                 ), 2000)
//             );
//             console.log(result);
//         } catch (error) {
//             console.error(error.message);
//         }
//     }
// }

// main();

module.exports={
    retry,
    CircuitBreaker,
    Bulkhead,
    timeout,
    RateLimiter,
}