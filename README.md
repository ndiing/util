## Classes

<dl>
<dt><a href="#Date2">Date2</a></dt>
<dd></dd>
<dt><a href="#String2">String2</a></dt>
<dd></dd>
<dt><a href="#Math2">Math2</a></dt>
<dd></dd>
<dt><a href="#Util">Util</a></dt>
<dd></dd>
</dl>

<a name="Date2"></a>

## Date2
**Kind**: global class  

* [Date2](#Date2)
    * [.add(value, unit)](#Date2+add) ⇒ <code>Object/Date2</code>
    * [.subtract(value, unit)](#Date2+subtract) ⇒ <code>Object/Date2</code>
    * [.startOf(unit)](#Date2+startOf) ⇒ <code>Object/Date2</code>
    * [.endOf(unit)](#Date2+endOf) ⇒ <code>Object/Date2</code>
    * [.format(anyFmt)](#Date2+format) ⇒ <code>String</code>

<a name="Date2+add"></a>

### date2.add(value, unit) ⇒ <code>Object/Date2</code>
**Kind**: instance method of [<code>Date2</code>](#Date2)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> |  |
| unit | <code>String</code> | `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds` |

**Example**  
```js
// add// unit=// years// year// y// months// month// M// days// day// date// d// hours// hour// h// minutes// minute// m// seconds// second// sconsole.log(date.add(1,'d')) // Date2 2022-08-18T04:52:09.758Zconsole.log(date.add(1,'d')) // Date2 2022-08-19T04:52:09.758Zconsole.log(date.add(1,'d')) // Date2 2022-08-20T04:52:09.758Z
```
<a name="Date2+subtract"></a>

### date2.subtract(value, unit) ⇒ <code>Object/Date2</code>
**Kind**: instance method of [<code>Date2</code>](#Date2)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> |  |
| unit | <code>String</code> | `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds` |

<a name="Date2+startOf"></a>

### date2.startOf(unit) ⇒ <code>Object/Date2</code>
**Kind**: instance method of [<code>Date2</code>](#Date2)  

| Param | Type | Description |
| --- | --- | --- |
| unit | <code>String</code> | `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds` |

<a name="Date2+endOf"></a>

### date2.endOf(unit) ⇒ <code>Object/Date2</code>
**Kind**: instance method of [<code>Date2</code>](#Date2)  

| Param | Type | Description |
| --- | --- | --- |
| unit | <code>String</code> | `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds` |

<a name="Date2+format"></a>

### date2.format(anyFmt) ⇒ <code>String</code>
**Kind**: instance method of [<code>Date2</code>](#Date2)  

| Param | Type | Description |
| --- | --- | --- |
| anyFmt | <code>String</code> | `YYYY`,`YY`,`M`,`MM`,`MMM`,`MMMM`,`D`,`DD`,`DDD`,`DDDD`,`H`,`HH`,`m`,`mm`,`s`,`ss` |

**Example**  
```js
// Format outputconsole.log(date.format('YYYY')) // 2022console.log(date.format('M')) // 8console.log(date.format('D')) // 17console.log(date.format('H')) // 11console.log(date.format('m')) // 49console.log(date.format('s')) // 25console.log(date.format('YY')) // 22console.log(date.format('MM')) // 08console.log(date.format('DD')) // 17console.log(date.format('HH')) // 11console.log(date.format('mm')) // 49console.log(date.format('ss')) // 25console.log(date.format('MMM')) // Augconsole.log(date.format('MMMM')) // Augustconsole.log(date.format('DDD')) // Wedconsole.log(date.format('DDDD')) // Wednesdayconsole.log(date.format('H:m\r\nDD/MM/YYYY'))
```
<a name="String2"></a>

## String2
**Kind**: global class  

* [String2](#String2)
    * [.pascalCase(string)](#String2.pascalCase) ⇒ <code>String</code>
    * [.camelCase(string)](#String2.camelCase) ⇒ <code>String</code>
    * [.kebabCase(string)](#String2.kebabCase) ⇒ <code>String</code>
    * [.snakeCase(string)](#String2.snakeCase) ⇒ <code>String</code>
    * [.titleCase(string)](#String2.titleCase) ⇒ <code>String</code>

<a name="String2.pascalCase"></a>

### String2.pascalCase(string) ⇒ <code>String</code>
**Kind**: static method of [<code>String2</code>](#String2)  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

<a name="String2.camelCase"></a>

### String2.camelCase(string) ⇒ <code>String</code>
**Kind**: static method of [<code>String2</code>](#String2)  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

<a name="String2.kebabCase"></a>

### String2.kebabCase(string) ⇒ <code>String</code>
**Kind**: static method of [<code>String2</code>](#String2)  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

<a name="String2.snakeCase"></a>

### String2.snakeCase(string) ⇒ <code>String</code>
**Kind**: static method of [<code>String2</code>](#String2)  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

<a name="String2.titleCase"></a>

### String2.titleCase(string) ⇒ <code>String</code>
**Kind**: static method of [<code>String2</code>](#String2)  

| Param | Type |
| --- | --- |
| string | <code>String</code> | 

<a name="Math2"></a>

## Math2
**Kind**: global class  

* [Math2](#Math2)
    * [.random(min, max)](#Math2.random) ⇒ <code>Number</code>
    * [.randomFixed(count)](#Math2.randomFixed) ⇒ <code>Number</code>
    * [.markup(cost, markup)](#Math2.markup) ⇒ <code>Number</code>
    * [.margin(cost, margin)](#Math2.margin) ⇒ <code>Number</code>
    * [.discount(original_price, ...discounts)](#Math2.discount) ⇒ <code>Number</code>

<a name="Math2.random"></a>

### Math2.random(min, max) ⇒ <code>Number</code>
**Kind**: static method of [<code>Math2</code>](#Math2)  

| Param | Type |
| --- | --- |
| min | <code>Number</code> | 
| max | <code>Number</code> | 

<a name="Math2.randomFixed"></a>

### Math2.randomFixed(count) ⇒ <code>Number</code>
**Kind**: static method of [<code>Math2</code>](#Math2)  

| Param | Type |
| --- | --- |
| count | <code>Number</code> | 

<a name="Math2.markup"></a>

### Math2.markup(cost, markup) ⇒ <code>Number</code>
**Kind**: static method of [<code>Math2</code>](#Math2)  

| Param | Type |
| --- | --- |
| cost | <code>Number</code> | 
| markup | <code>Number</code> | 

<a name="Math2.margin"></a>

### Math2.margin(cost, margin) ⇒ <code>Number</code>
**Kind**: static method of [<code>Math2</code>](#Math2)  

| Param | Type |
| --- | --- |
| cost | <code>Number</code> | 
| margin | <code>Number</code> | 

<a name="Math2.discount"></a>

### Math2.discount(original_price, ...discounts) ⇒ <code>Number</code>
**Kind**: static method of [<code>Math2</code>](#Math2)  

| Param | Type |
| --- | --- |
| original_price | <code>Number</code> | 
| ...discounts | <code>any</code> | 

<a name="Util"></a>

## Util
**Kind**: global class  

* [Util](#Util)
    * [.checkLuhn(purportedCC)](#Util.checkLuhn) ⇒ <code>Boolean</code>
    * [.randomIMEI()](#Util.randomIMEI) ⇒ <code>String/Number</code>

<a name="Util.checkLuhn"></a>

### Util.checkLuhn(purportedCC) ⇒ <code>Boolean</code>
**Kind**: static method of [<code>Util</code>](#Util)  
**See**: [https://en.wikipedia.org/wiki/Luhn_algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)  

| Param | Type |
| --- | --- |
| purportedCC | <code>String/Number</code> | 

<a name="Util.randomIMEI"></a>

### Util.randomIMEI() ⇒ <code>String/Number</code>
**Kind**: static method of [<code>Util</code>](#Util)  
