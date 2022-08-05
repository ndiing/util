<a name="module_util"></a>

## util
Nodejs piece of code### Install```npm install @ndiing/util```


* [util](#module_util)
    * [~Text](#module_util..Text)
        * [.toKebabCase(string)](#module_util..Text.toKebabCase) ⇒ <code>String</code>
        * [.toSnakeCase(string)](#module_util..Text.toSnakeCase) ⇒ <code>String</code>
        * [.toPascalCase(string)](#module_util..Text.toPascalCase) ⇒ <code>String</code>
        * [.toCamelCase(string)](#module_util..Text.toCamelCase) ⇒ <code>String</code>
        * [.toTitleCase(string)](#module_util..Text.toTitleCase) ⇒ <code>String</code>
        * [.getMessage(message, regexp, ...data)](#module_util..Text.getMessage) ⇒ <code>String</code>
        * [.escapeRegExp(string)](#module_util..Text.escapeRegExp) ⇒ <code>String</code>
    * [~DateTime](#module_util..DateTime) ⇐ <code>Date</code>
        * [.add(value, name)](#module_util..DateTime+add) ⇒ <code>Date</code>
        * [.substract(value, name)](#module_util..DateTime+substract) ⇒ <code>Date</code>
        * [.startOf(name)](#module_util..DateTime+startOf) ⇒ <code>Date</code>
        * [.endOf(name)](#module_util..DateTime+endOf) ⇒ <code>Date</code>
        * [.format(template)](#module_util..DateTime+format) ⇒ <code>String</code>
    * [~EventEmitter](#module_util..EventEmitter) ⇐ <code>events</code>
    * [~structuredClone(object)](#module_util..structuredClone) ⇒ <code>Object/Array</code>

<a name="module_util..Text"></a>

### util~Text
**Kind**: inner class of [<code>util</code>](#module_util)  

* [~Text](#module_util..Text)
    * [.toKebabCase(string)](#module_util..Text.toKebabCase) ⇒ <code>String</code>
    * [.toSnakeCase(string)](#module_util..Text.toSnakeCase) ⇒ <code>String</code>
    * [.toPascalCase(string)](#module_util..Text.toPascalCase) ⇒ <code>String</code>
    * [.toCamelCase(string)](#module_util..Text.toCamelCase) ⇒ <code>String</code>
    * [.toTitleCase(string)](#module_util..Text.toTitleCase) ⇒ <code>String</code>
    * [.getMessage(message, regexp, ...data)](#module_util..Text.getMessage) ⇒ <code>String</code>
    * [.escapeRegExp(string)](#module_util..Text.escapeRegExp) ⇒ <code>String</code>

<a name="module_util..Text.toKebabCase"></a>

#### Text.toKebabCase(string) ⇒ <code>String</code>
transform text to Kebab Case

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | - |

<a name="module_util..Text.toSnakeCase"></a>

#### Text.toSnakeCase(string) ⇒ <code>String</code>
transform text to Snake Case

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | - |

<a name="module_util..Text.toPascalCase"></a>

#### Text.toPascalCase(string) ⇒ <code>String</code>
transform text to Pascal Case

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | - |

<a name="module_util..Text.toCamelCase"></a>

#### Text.toCamelCase(string) ⇒ <code>String</code>
transform text to Camel Case

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | - |

<a name="module_util..Text.toTitleCase"></a>

#### Text.toTitleCase(string) ⇒ <code>String</code>
transform text to Title Case

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | - |

<a name="module_util..Text.getMessage"></a>

#### Text.getMessage(message, regexp, ...data) ⇒ <code>String</code>
template message

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | - |
| regexp | <code>RegExp</code> | - |
| ...data | <code>Object/Array</code> |  |

<a name="module_util..Text.escapeRegExp"></a>

#### Text.escapeRegExp(string) ⇒ <code>String</code>
escape string for regexp

**Kind**: static method of [<code>Text</code>](#module_util..Text)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | - |

<a name="module_util..DateTime"></a>

### util~DateTime ⇐ <code>Date</code>
**Kind**: inner class of [<code>util</code>](#module_util)  
**Extends**: <code>Date</code>  

* [~DateTime](#module_util..DateTime) ⇐ <code>Date</code>
    * [.add(value, name)](#module_util..DateTime+add) ⇒ <code>Date</code>
    * [.substract(value, name)](#module_util..DateTime+substract) ⇒ <code>Date</code>
    * [.startOf(name)](#module_util..DateTime+startOf) ⇒ <code>Date</code>
    * [.endOf(name)](#module_util..DateTime+endOf) ⇒ <code>Date</code>
    * [.format(template)](#module_util..DateTime+format) ⇒ <code>String</code>

<a name="module_util..DateTime+add"></a>

#### dateTime.add(value, name) ⇒ <code>Date</code>
add value by `name`

**Kind**: instance method of [<code>DateTime</code>](#module_util..DateTime)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Number</code> | <code>0</code> | - |
| name | <code>String</code> |  | - |

<a name="module_util..DateTime+substract"></a>

#### dateTime.substract(value, name) ⇒ <code>Date</code>
substract value by `name`

**Kind**: instance method of [<code>DateTime</code>](#module_util..DateTime)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Number</code> | <code>0</code> | - |
| name | <code>String</code> |  | - |

<a name="module_util..DateTime+startOf"></a>

#### dateTime.startOf(name) ⇒ <code>Date</code>
get date start of

**Kind**: instance method of [<code>DateTime</code>](#module_util..DateTime)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | - |

<a name="module_util..DateTime+endOf"></a>

#### dateTime.endOf(name) ⇒ <code>Date</code>
get date end of

**Kind**: instance method of [<code>DateTime</code>](#module_util..DateTime)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | - |

<a name="module_util..DateTime+format"></a>

#### dateTime.format(template) ⇒ <code>String</code>
Date format

**Kind**: instance method of [<code>DateTime</code>](#module_util..DateTime)  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>String</code> | - |

<a name="module_util..EventEmitter"></a>

### util~EventEmitter ⇐ <code>events</code>
**Kind**: inner class of [<code>util</code>](#module_util)  
**Extends**: <code>events</code>  
<a name="module_util..structuredClone"></a>

### util~structuredClone(object) ⇒ <code>Object/Array</code>
Copy object/array

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object/Array</code> | - |

