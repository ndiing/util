## Modules

<dl>
<dt><a href="#module_file">file</a></dt>
<dd></dd>
<dt><a href="#module_resilience">resilience</a></dt>
<dd></dd>
<dt><a href="#module_string">string</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Mutex">Mutex</a></dt>
<dd><p>Kelas yang mengimplementasikan mekanisme mutex untuk penguncian sumber daya.</p>
</dd>
<dt><a href="#Semaphore">Semaphore</a></dt>
<dd><p>Kelas yang mengimplementasikan mekanisme semaphore untuk pengelolaan akses ke sumber daya.</p>
</dd>
</dl>

<a name="module_file"></a>

## file

* [file](#module_file)
    * [.read(filename)](#module_file.read) ⇒ <code>string</code> \| <code>null</code>
    * [.write(filename, data)](#module_file.write)

<a name="module_file.read"></a>

### file.read(filename) ⇒ <code>string</code> \| <code>null</code>
Membaca konten dari file dengan nama yang diberikan.

**Kind**: static method of [<code>file</code>](#module_file)  
**Returns**: <code>string</code> \| <code>null</code> - - Mengembalikan konten file dalam bentuk string atau `null` jika terjadi kesalahan.  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Nama file yang akan dibaca. |

<a name="module_file.write"></a>

### file.write(filename, data)
Menulis data ke file dengan nama yang diberikan.Jika direktori tidak ada, direktori akan dibuat.

**Kind**: static method of [<code>file</code>](#module_file)  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | Nama file di mana data akan ditulis. |
| data | <code>string</code> | Konten yang akan ditulis ke file. |

<a name="module_resilience"></a>

## resilience

* [resilience](#module_resilience)
    * _static_
        * [.retry(fn, [retries], [delay])](#module_resilience.retry) ⇒ <code>Promise.&lt;any&gt;</code>
        * [.timeout(fn, ms)](#module_resilience.timeout) ⇒ <code>Promise.&lt;any&gt;</code>
    * _inner_
        * [~CircuitBreaker](#module_resilience..CircuitBreaker)
            * [new CircuitBreaker([failureThreshold], [resetTimeout])](#new_module_resilience..CircuitBreaker_new)
            * [.execute(fn)](#module_resilience..CircuitBreaker+execute) ⇒ <code>Promise.&lt;any&gt;</code>
            * [.reset()](#module_resilience..CircuitBreaker+reset)
        * [~Bulkhead](#module_resilience..Bulkhead)
            * [new Bulkhead(maxRequests)](#new_module_resilience..Bulkhead_new)
            * [.execute(fn)](#module_resilience..Bulkhead+execute) ⇒ <code>Promise.&lt;any&gt;</code>
            * [.processQueue()](#module_resilience..Bulkhead+processQueue)
        * [~RateLimiter](#module_resilience..RateLimiter)
            * [new RateLimiter(maxRequests, interval)](#new_module_resilience..RateLimiter_new)
            * [.execute(fn)](#module_resilience..RateLimiter+execute) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="module_resilience.retry"></a>

### resilience.retry(fn, [retries], [delay]) ⇒ <code>Promise.&lt;any&gt;</code>
Mencoba menjalankan fungsi secara berulang hingga berhasil atau mencapai batas retry.

**Kind**: static method of [<code>resilience</code>](#module_resilience)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi yang berhasil.  
**Throws**:

- <code>Error</code> - Melemparkan kesalahan jika semua percobaan gagal.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  | Fungsi yang akan dicoba. Harus mengembalikan sebuah promise. |
| [retries] | <code>number</code> | <code>3</code> | Jumlah maksimum percobaan sebelum melemparkan kesalahan. |
| [delay] | <code>number</code> | <code>1000</code> | Waktu dalam milidetik untuk menunggu sebelum mencoba lagi setelah gagal. |

<a name="module_resilience.timeout"></a>

### resilience.timeout(fn, ms) ⇒ <code>Promise.&lt;any&gt;</code>
Menjalankan fungsi dan mengatur batas waktu. Jika fungsi tidak selesai dalam waktu yang ditentukan, akan melemparkan kesalahan "Timeout".

**Kind**: static method of [<code>resilience</code>](#module_resilience)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi jika selesai dalam batas waktu.  
**Throws**:

- <code>Error</code> - Melemparkan kesalahan jika fungsi tidak selesai dalam waktu yang ditentukan.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise. |
| ms | <code>number</code> | Waktu maksimum dalam milidetik sebelum timeout. |

<a name="module_resilience..CircuitBreaker"></a>

### resilience~CircuitBreaker
Kelas CircuitBreaker untuk mengelola dan melindungi fungsi dari kesalahan yang berulang.Circuit Breaker mencegah fungsi dari pemanggilan berulang ketika kesalahan telah mencapai ambang batas.

**Kind**: inner class of [<code>resilience</code>](#module_resilience)  

* [~CircuitBreaker](#module_resilience..CircuitBreaker)
    * [new CircuitBreaker([failureThreshold], [resetTimeout])](#new_module_resilience..CircuitBreaker_new)
    * [.execute(fn)](#module_resilience..CircuitBreaker+execute) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.reset()](#module_resilience..CircuitBreaker+reset)

<a name="new_module_resilience..CircuitBreaker_new"></a>

#### new CircuitBreaker([failureThreshold], [resetTimeout])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [failureThreshold] | <code>number</code> | <code>3</code> | Ambang batas jumlah kesalahan sebelum sirkuit terbuka. |
| [resetTimeout] | <code>number</code> | <code>5000</code> | Waktu dalam milidetik sebelum sirkuit setengah terbuka setelah terbuka. |

<a name="module_resilience..CircuitBreaker+execute"></a>

#### circuitBreaker.execute(fn) ⇒ <code>Promise.&lt;any&gt;</code>
Menjalankan fungsi dan menerapkan circuit breaker.Jika sirkuit terbuka, fungsi tidak akan dieksekusi hingga waktu reset berlalu.

**Kind**: instance method of [<code>CircuitBreaker</code>](#module_resilience..CircuitBreaker)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi jika berhasil.  
**Throws**:

- <code>Error</code> - Melemparkan kesalahan jika fungsi gagal atau jika sirkuit terbuka.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise. |

<a name="module_resilience..CircuitBreaker+reset"></a>

#### circuitBreaker.reset()
Mereset status circuit breaker ke keadaan tertutup dan mengatur ulang hitungan kesalahan.

**Kind**: instance method of [<code>CircuitBreaker</code>](#module_resilience..CircuitBreaker)  
<a name="module_resilience..Bulkhead"></a>

### resilience~Bulkhead
Kelas Bulkhead untuk mengelola batas maksimum permintaan yang dapat dieksekusi secara bersamaan.Bulkhead membantu mencegah satu bagian dari aplikasi mempengaruhi bagian lainnya dengan membatasijumlah permintaan yang dapat diproses dalam waktu bersamaan.

**Kind**: inner class of [<code>resilience</code>](#module_resilience)  

* [~Bulkhead](#module_resilience..Bulkhead)
    * [new Bulkhead(maxRequests)](#new_module_resilience..Bulkhead_new)
    * [.execute(fn)](#module_resilience..Bulkhead+execute) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.processQueue()](#module_resilience..Bulkhead+processQueue)

<a name="new_module_resilience..Bulkhead_new"></a>

#### new Bulkhead(maxRequests)

| Param | Type | Description |
| --- | --- | --- |
| maxRequests | <code>number</code> | Jumlah maksimum permintaan yang dapat diproses secara bersamaan. |

<a name="module_resilience..Bulkhead+execute"></a>

#### bulkhead.execute(fn) ⇒ <code>Promise.&lt;any&gt;</code>
Menjalankan fungsi dan mengatur antrian permintaan jika batas maksimum tercapai.

**Kind**: instance method of [<code>Bulkhead</code>](#module_resilience..Bulkhead)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi jika berhasil.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise. |

<a name="module_resilience..Bulkhead+processQueue"></a>

#### bulkhead.processQueue()
Memproses antrian permintaan yang menunggu jika ada kapasitas yang tersedia.

**Kind**: instance method of [<code>Bulkhead</code>](#module_resilience..Bulkhead)  
<a name="module_resilience..RateLimiter"></a>

### resilience~RateLimiter
Kelas RateLimiter untuk membatasi jumlah permintaan yang dapat dilakukan dalam jangka waktu tertentu.Berguna untuk menghindari kelebihan beban pada server atau API.

**Kind**: inner class of [<code>resilience</code>](#module_resilience)  

* [~RateLimiter](#module_resilience..RateLimiter)
    * [new RateLimiter(maxRequests, interval)](#new_module_resilience..RateLimiter_new)
    * [.execute(fn)](#module_resilience..RateLimiter+execute) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_module_resilience..RateLimiter_new"></a>

#### new RateLimiter(maxRequests, interval)

| Param | Type | Description |
| --- | --- | --- |
| maxRequests | <code>number</code> | Jumlah maksimum permintaan yang diizinkan dalam interval waktu. |
| interval | <code>number</code> | Interval waktu dalam milidetik untuk membatasi permintaan. |

<a name="module_resilience..RateLimiter+execute"></a>

#### rateLimiter.execute(fn) ⇒ <code>Promise.&lt;any&gt;</code>
Menjalankan fungsi jika batas permintaan belum terlampaui.

**Kind**: instance method of [<code>RateLimiter</code>](#module_resilience..RateLimiter)  
**Returns**: <code>Promise.&lt;any&gt;</code> - - Mengembalikan hasil dari fungsi jika batas permintaan belum terlampaui.  
**Throws**:

- <code>Error</code> - Melempar error jika batas permintaan telah terlampaui.


| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Fungsi yang akan dijalankan. Harus mengembalikan sebuah promise. |

<a name="module_string"></a>

## string

* [string](#module_string)
    * [.toPascalCase(string)](#module_string.toPascalCase) ⇒ <code>string</code>
    * [.toCamelCase(string)](#module_string.toCamelCase) ⇒ <code>string</code>
    * [.toSnakeCase(string)](#module_string.toSnakeCase) ⇒ <code>string</code>
    * [.toKebabCase(string)](#module_string.toKebabCase) ⇒ <code>string</code>
    * [.toTitleCase(string)](#module_string.toTitleCase) ⇒ <code>string</code>

<a name="module_string.toPascalCase"></a>

### string.toPascalCase(string) ⇒ <code>string</code>
Mengubah string menjadi format PascalCase.

**Kind**: static method of [<code>string</code>](#module_string)  
**Returns**: <code>string</code> - - String dalam format PascalCase.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String input yang akan diubah. |

<a name="module_string.toCamelCase"></a>

### string.toCamelCase(string) ⇒ <code>string</code>
Mengubah string menjadi format camelCase.

**Kind**: static method of [<code>string</code>](#module_string)  
**Returns**: <code>string</code> - - String dalam format camelCase.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String input yang akan diubah. |

<a name="module_string.toSnakeCase"></a>

### string.toSnakeCase(string) ⇒ <code>string</code>
Mengubah string menjadi format snake_case.

**Kind**: static method of [<code>string</code>](#module_string)  
**Returns**: <code>string</code> - - String dalam format snake_case.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String input yang akan diubah. |

<a name="module_string.toKebabCase"></a>

### string.toKebabCase(string) ⇒ <code>string</code>
Mengubah string menjadi format kebab-case.

**Kind**: static method of [<code>string</code>](#module_string)  
**Returns**: <code>string</code> - - String dalam format kebab-case.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String input yang akan diubah. |

<a name="module_string.toTitleCase"></a>

### string.toTitleCase(string) ⇒ <code>string</code>
Mengubah string menjadi format Title Case.

**Kind**: static method of [<code>string</code>](#module_string)  
**Returns**: <code>string</code> - - String dalam format Title Case.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | String input yang akan diubah. |

<a name="Mutex"></a>

## Mutex
Kelas yang mengimplementasikan mekanisme mutex untuk penguncian sumber daya.

**Kind**: global class  

* [Mutex](#Mutex)
    * [.lock()](#Mutex+lock) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.unlock()](#Mutex+unlock)

<a name="Mutex+lock"></a>

### mutex.lock() ⇒ <code>Promise.&lt;void&gt;</code>
Mengunci mutex. Jika sudah terkunci, menunggu sampai dapat mengunci.

**Kind**: instance method of [<code>Mutex</code>](#Mutex)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Sebuah promise yang diselesaikan saat mutex terkunci.  
<a name="Mutex+unlock"></a>

### mutex.unlock()
Membuka kunci mutex dan memberi kesempatan kepada antrean untuk mengunci.

**Kind**: instance method of [<code>Mutex</code>](#Mutex)  
<a name="Semaphore"></a>

## Semaphore
Kelas yang mengimplementasikan mekanisme semaphore untuk pengelolaan akses ke sumber daya.

**Kind**: global class  

* [Semaphore](#Semaphore)
    * [new Semaphore(max)](#new_Semaphore_new)
    * [.acquire()](#Semaphore+acquire) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.release()](#Semaphore+release)

<a name="new_Semaphore_new"></a>

### new Semaphore(max)

| Param | Type | Description |
| --- | --- | --- |
| max | <code>number</code> | Jumlah maksimum akses yang diizinkan pada satu waktu. |

<a name="Semaphore+acquire"></a>

### semaphore.acquire() ⇒ <code>Promise.&lt;void&gt;</code>
Mengakuisisi akses semaphore. Jika sudah mencapai maksimum, menunggu sampai ada akses yang dilepaskan.

**Kind**: instance method of [<code>Semaphore</code>](#Semaphore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - Sebuah promise yang diselesaikan saat akses diperoleh.  
<a name="Semaphore+release"></a>

### semaphore.release()
Membebaskan akses semaphore, memberi kesempatan kepada antrean untuk mengakuisisi akses.

**Kind**: instance method of [<code>Semaphore</code>](#Semaphore)  
