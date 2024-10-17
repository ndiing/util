## Classes

<dl>
<dt><a href="#Mutex">Mutex</a></dt>
<dd><p>Kelas Mutex untuk mengimplementasikan mekanisme penguncian (mutex) pada fungsi asinkron.</p>
</dd>
<dt><a href="#Semaphore">Semaphore</a></dt>
<dd><p>Kelas Semaphore untuk mengontrol akses ke sumber daya dengan batasan jumlah izin.</p>
</dd>
<dt><a href="#CircuitBreaker">CircuitBreaker</a></dt>
<dd><p>Kelas CircuitBreaker untuk menangani kegagalan fungsi asinkron dengan pola circuit breaker.</p>
</dd>
<dt><a href="#Bulkhead">Bulkhead</a></dt>
<dd><p>Kelas Bulkhead untuk membatasi jumlah permintaan yang dapat dijalankan secara bersamaan.</p>
</dd>
<dt><a href="#RateLimiter">RateLimiter</a></dt>
<dd><p>Kelas RateLimiter untuk membatasi jumlah permintaan yang dapat dilakukan dalam interval waktu tertentu.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#retry">retry(fn, [retries], [delay])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Mencoba menjalankan fungsi yang diberikan beberapa kali jika terjadi error.</p>
</dd>
<dt><a href="#timeout">timeout(fn, ms)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Menjalankan fungsi yang diberikan dengan batas waktu.
Jika fungsi tidak selesai dalam waktu yang ditentukan, akan melempar error &#39;Timeout&#39;.</p>
</dd>
<dt><a href="#toPascalCase">toPascalCase(string)</a> ⇒ <code>string</code></dt>
<dd><p>Mengubah string menjadi format PascalCase.</p>
</dd>
<dt><a href="#toCamelCase">toCamelCase(string)</a> ⇒ <code>string</code></dt>
<dd><p>Mengubah string menjadi format camelCase.</p>
</dd>
<dt><a href="#toSnakeCase">toSnakeCase(string)</a> ⇒ <code>string</code></dt>
<dd><p>Mengubah string menjadi format snake_case.</p>
</dd>
<dt><a href="#toKebabCase">toKebabCase(string)</a> ⇒ <code>string</code></dt>
<dd><p>Mengubah string menjadi format kebab-case.</p>
</dd>
<dt><a href="#toTitleCase">toTitleCase(string)</a> ⇒ <code>string</code></dt>
<dd><p>Mengubah string menjadi format Title Case.</p>
</dd>
</dl>

<a name="Mutex"></a>

## Mutex

Kelas Mutex untuk mengimplementasikan mekanisme penguncian (mutex) pada fungsi asinkron.

**Kind**: global class

-   [Mutex](#Mutex)
    -   [.lock()](#Mutex+lock) ⇒ <code>Promise.&lt;void&gt;</code>
    -   [.unlock()](#Mutex+unlock)

<a name="Mutex+lock"></a>

### mutex.lock() ⇒ <code>Promise.&lt;void&gt;</code>

Mengunci mutex. Jika mutex sudah terkunci, fungsi akan menunggu hingga terbuka.

**Kind**: instance method of [<code>Mutex</code>](#Mutex)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Mengembalikan promise yang akan diselesaikan ketika mutex berhasil dikunci.  
<a name="Mutex+unlock"></a>

### mutex.unlock()

Membuka kunci mutex. Jika ada permintaan dalam antrian, akan menyelesaikan permintaan berikutnya.

**Kind**: instance method of [<code>Mutex</code>](#Mutex)  
<a name="Semaphore"></a>

## Semaphore

Kelas Semaphore untuk mengontrol akses ke sumber daya dengan batasan jumlah izin.

**Kind**: global class

-   [Semaphore](#Semaphore)
    -   [new Semaphore(max)](#new_Semaphore_new)
    -   [.acquire()](#Semaphore+acquire) ⇒ <code>Promise.&lt;void&gt;</code>
    -   [.release()](#Semaphore+release)

<a name="new_Semaphore_new"></a>

### new Semaphore(max)

| Param | Type                | Description                                                    |
| ----- | ------------------- | -------------------------------------------------------------- |
| max   | <code>number</code> | Jumlah maksimum izin yang diperbolehkan untuk akses bersamaan. |

<a name="Semaphore+acquire"></a>

### semaphore.acquire() ⇒ <code>Promise.&lt;void&gt;</code>

Mengakuisisi izin untuk mengakses sumber daya. Jika sudah mencapai maksimum,
fungsi akan menunggu dalam antrean.

**Kind**: instance method of [<code>Semaphore</code>](#Semaphore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Mengembalikan promise yang akan diselesaikan saat izin berhasil diperoleh.  
<a name="Semaphore+release"></a>

### semaphore.release()

Mengembalikan izin setelah selesai mengakses sumber daya. Jika ada thread
lain dalam antrean, beri tahu thread berikutnya.

**Kind**: instance method of [<code>Semaphore</code>](#Semaphore)  
<a name="CircuitBreaker"></a>

## CircuitBreaker

Kelas CircuitBreaker untuk menangani kegagalan fungsi asinkron dengan pola circuit breaker.

**Kind**: global class

-   [CircuitBreaker](#CircuitBreaker)
    -   [new CircuitBreaker([failureThreshold], [resetTimeout])](#new_CircuitBreaker_new)
    -   [.execute(fn)](#CircuitBreaker+execute) ⇒ <code>Promise.&lt;any&gt;</code>
    -   [.reset()](#CircuitBreaker+reset)

<a name="new_CircuitBreaker_new"></a>

### new CircuitBreaker([failureThreshold], [resetTimeout])

| Param              | Type                | Default           | Description                                                                                         |
| ------------------ | ------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| [failureThreshold] | <code>number</code> | <code>3</code>    | Jumlah kegagalan yang diperbolehkan sebelum circuit terbuka. Default adalah 3.                      |
| [resetTimeout]     | <code>number</code> | <code>5000</code> | Waktu (dalam milidetik) sebelum circuit dapat mencoba lagi setelah terbuka. Default adalah 5000 ms. |

<a name="CircuitBreaker+execute"></a>

### circuitBreaker.execute(fn) ⇒ <code>Promise.&lt;any&gt;</code>

Menjalankan fungsi yang diberikan, memantau kegagalan dan menangani state circuit breaker.

**Kind**: instance method of [<code>CircuitBreaker</code>](#CircuitBreaker)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi yang berhasil dijalankan.  
**Throws**:

-   <code>Error</code> - Melempar error jika circuit terbuka atau jika fungsi gagal.

| Param | Type                  | Description                            |
| ----- | --------------------- | -------------------------------------- |
| fn    | <code>function</code> | Fungsi asinkron yang ingin dijalankan. |

<a name="CircuitBreaker+reset"></a>

### circuitBreaker.reset()

Mengatur ulang status circuit breaker ke kondisi awal.

**Kind**: instance method of [<code>CircuitBreaker</code>](#CircuitBreaker)  
<a name="Bulkhead"></a>

## Bulkhead

Kelas Bulkhead untuk membatasi jumlah permintaan yang dapat dijalankan secara bersamaan.

**Kind**: global class

-   [Bulkhead](#Bulkhead)
    -   [new Bulkhead(maxRequests)](#new_Bulkhead_new)
    -   [.execute(fn)](#Bulkhead+execute) ⇒ <code>Promise.&lt;any&gt;</code>
    -   [.processQueue()](#Bulkhead+processQueue)

<a name="new_Bulkhead_new"></a>

### new Bulkhead(maxRequests)

| Param       | Type                | Description                                                   |
| ----------- | ------------------- | ------------------------------------------------------------- |
| maxRequests | <code>number</code> | Batas jumlah permintaan yang dapat diproses secara bersamaan. |

<a name="Bulkhead+execute"></a>

### bulkhead.execute(fn) ⇒ <code>Promise.&lt;any&gt;</code>

Menjalankan fungsi yang diberikan. Jika batas permintaan saat ini terlampaui,
fungsi akan dimasukkan ke dalam antrian.

**Kind**: instance method of [<code>Bulkhead</code>](#Bulkhead)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi yang berhasil dijalankan.

| Param | Type                  | Description                            |
| ----- | --------------------- | -------------------------------------- |
| fn    | <code>function</code> | Fungsi asinkron yang ingin dijalankan. |

<a name="Bulkhead+processQueue"></a>

### bulkhead.processQueue()

Memproses antrian permintaan. Menjalankan fungsi dari antrian jika ada
permintaan yang menunggu dan batas belum terlampaui.

**Kind**: instance method of [<code>Bulkhead</code>](#Bulkhead)  
<a name="RateLimiter"></a>

## RateLimiter

Kelas RateLimiter untuk membatasi jumlah permintaan yang dapat dilakukan dalam interval waktu tertentu.

**Kind**: global class

-   [RateLimiter](#RateLimiter)
    -   [new RateLimiter(maxRequests, interval)](#new_RateLimiter_new)
    -   [.execute(fn)](#RateLimiter+execute) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_RateLimiter_new"></a>

### new RateLimiter(maxRequests, interval)

| Param       | Type                | Description                                                   |
| ----------- | ------------------- | ------------------------------------------------------------- |
| maxRequests | <code>number</code> | Jumlah maksimum permintaan yang diperbolehkan dalam interval. |
| interval    | <code>number</code> | Interval waktu (dalam milidetik) untuk membatasi permintaan.  |

<a name="RateLimiter+execute"></a>

### rateLimiter.execute(fn) ⇒ <code>Promise.&lt;any&gt;</code>

Menjalankan fungsi yang diberikan jika jumlah permintaan saat ini dalam interval yang ditentukan tidak melebihi batas.

**Kind**: instance method of [<code>RateLimiter</code>](#RateLimiter)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi yang berhasil dijalankan.  
**Throws**:

-   <code>Error</code> - Melempar error jika batas permintaan terlampaui.

| Param | Type                  | Description                            |
| ----- | --------------------- | -------------------------------------- |
| fn    | <code>function</code> | Fungsi asinkron yang ingin dijalankan. |

<a name="retry"></a>

## retry(fn, [retries], [delay]) ⇒ <code>Promise.&lt;any&gt;</code>

Mencoba menjalankan fungsi yang diberikan beberapa kali jika terjadi error.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi yang berhasil dijalankan.  
**Throws**:

-   <code>Error</code> - Melempar error jika semua percobaan gagal.

| Param     | Type                  | Default           | Description                                                                          |
| --------- | --------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| fn        | <code>function</code> |                   | Fungsi asinkron yang ingin dicoba.                                                   |
| [retries] | <code>number</code>   | <code>3</code>    | Jumlah percobaan ulang jika terjadi error. Default adalah 3.                         |
| [delay]   | <code>number</code>   | <code>1000</code> | Waktu (dalam milidetik) untuk menunggu sebelum mencoba lagi. Default adalah 1000 ms. |

<a name="timeout"></a>

## timeout(fn, ms) ⇒ <code>Promise.&lt;any&gt;</code>

Menjalankan fungsi yang diberikan dengan batas waktu.
Jika fungsi tidak selesai dalam waktu yang ditentukan, akan melempar error 'Timeout'.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi yang berhasil dijalankan.  
**Throws**:

-   <code>Error</code> - Melempar error jika waktu habis.

| Param | Type                  | Description                                       |
| ----- | --------------------- | ------------------------------------------------- |
| fn    | <code>function</code> | Fungsi asinkron yang ingin dijalankan.            |
| ms    | <code>number</code>   | Waktu (dalam milidetik) batas waktu untuk fungsi. |

<a name="toPascalCase"></a>

## toPascalCase(string) ⇒ <code>string</code>

Mengubah string menjadi format PascalCase.

**Kind**: global function  
**Returns**: <code>string</code> - - String dalam format PascalCase.

| Param  | Type                | Description                    |
| ------ | ------------------- | ------------------------------ |
| string | <code>string</code> | String input yang akan diubah. |

<a name="toCamelCase"></a>

## toCamelCase(string) ⇒ <code>string</code>

Mengubah string menjadi format camelCase.

**Kind**: global function  
**Returns**: <code>string</code> - - String dalam format camelCase.

| Param  | Type                | Description                    |
| ------ | ------------------- | ------------------------------ |
| string | <code>string</code> | String input yang akan diubah. |

<a name="toSnakeCase"></a>

## toSnakeCase(string) ⇒ <code>string</code>

Mengubah string menjadi format snake_case.

**Kind**: global function  
**Returns**: <code>string</code> - - String dalam format snake_case.

| Param  | Type                | Description                    |
| ------ | ------------------- | ------------------------------ |
| string | <code>string</code> | String input yang akan diubah. |

<a name="toKebabCase"></a>

## toKebabCase(string) ⇒ <code>string</code>

Mengubah string menjadi format kebab-case.

**Kind**: global function  
**Returns**: <code>string</code> - - String dalam format kebab-case.

| Param  | Type                | Description                    |
| ------ | ------------------- | ------------------------------ |
| string | <code>string</code> | String input yang akan diubah. |

<a name="toTitleCase"></a>

## toTitleCase(string) ⇒ <code>string</code>

Mengubah string menjadi format Title Case.

**Kind**: global function  
**Returns**: <code>string</code> - - String dalam format Title Case.

| Param  | Type                | Description                    |
| ------ | ------------------- | ------------------------------ |
| string | <code>string</code> | String input yang akan diubah. |
