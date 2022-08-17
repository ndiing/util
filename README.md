# [util](https://ndiing.github.io/util/)
util

### Install
```
npm install @ndiinginc/util
```

### Usage
```js
// Create new date object
var date = new Date2()

// Format output
console.log(date.format('YYYY')) // 2022
console.log(date.format('M')) // 8
console.log(date.format('D')) // 17
console.log(date.format('H')) // 11
console.log(date.format('m')) // 49
console.log(date.format('s')) // 25
console.log(date.format('YY')) // 22
console.log(date.format('MM')) // 08
console.log(date.format('DD')) // 17
console.log(date.format('HH')) // 11
console.log(date.format('mm')) // 49
console.log(date.format('ss')) // 25
console.log(date.format('MMM')) // Aug
console.log(date.format('MMMM')) // August
console.log(date.format('DDD')) // Wed
console.log(date.format('DDDD')) // Wednesday
console.log(date.format('H:m\r\nDD/MM/YYYY'))

// add
// unit=
// years
// year
// y
// months
// month
// M
// days
// day
// date
// d
// hours
// hour
// h
// minutes
// minute
// m
// seconds
// second
// s
console.log(date.add(1,'d')) // Date2 2022-08-18T04:52:09.758Z
console.log(date.add(1,'d')) // Date2 2022-08-19T04:52:09.758Z
console.log(date.add(1,'d')) // Date2 2022-08-20T04:52:09.758Z

// subtract
// unit=same with `add` unit
console.log(date.subtract(1,'d')) // Date2 2022-08-19T04:53:58.724Z
console.log(date.subtract(1,'d')) // Date2 2022-08-18T04:53:58.724Z
console.log(date.subtract(1,'d')) // Date2 2022-08-17T04:53:58.724Z

// start of
// unit=same with `add` unit
console.log(date.startOf('year'))

// end of
// unit=same with `add` unit
console.log(date.endOf('year'))
```