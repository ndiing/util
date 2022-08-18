/**
 *
 */
class Date2 extends Date {
    constructor(...args) {
        super(...args);

        Object.defineProperties(this, {
            unit: { value: {}, writable: true },
            get: { value: {}, writable: true },
            set: { value: {}, writable: true },
            min: { value: {}, writable: true },
            max: { value: {}, writable: true },
            value: { value: {}, writable: true },
        });

        this.unit = {
            y: "YYYY",
            year: "YYYY",
            years: "YYYY",

            month: "M",
            months: "M",

            d: "D",
            day: "D",
            days: "D",
            date: "D",

            h: "H",
            hour: "H",
            hours: "H",

            m: "m",
            minute: "m",
            minutes: "m",

            s: "s",
            second: "s",
            seconds: "s",
        };

        this.get = {
            YYYY: () => this.getFullYear(),
            M: () => this.getMonth(),
            D: () => this.getDate(),
            H: () => this.getHours(),
            m: () => this.getMinutes(),
            s: () => this.getSeconds(),
        };

        this.set = {
            YYYY: (value) => this.setFullYear(value),
            M: (value) => this.setMonth(value),
            D: (value) => this.setDate(value),
            H: (value) => this.setHours(value),
            m: (value) => this.setMinutes(value),
            s: (value) => this.setSeconds(value),
        };

        this.min = {
            YYYY: () => this.value.YYYY,
            M: () => 0,
            D: () => 1,
            H: () => 0,
            m: () => 0,
            s: () => 0,
        };

        this.max = {
            YYYY: () => this.value.YYYY,
            M: () => 11,
            D: () => 32 - new Date(this.value.YYYY(), this.value.M()).getDate(),
            H: () => 23,
            m: () => 59,
            s: () => 59,
        };

        this.value = Object.assign(this.get, {
            YY: () => ("" + this.getFullYear()).slice(-2),
            M: () => this.getMonth() + 1,
            MM: () => ("" + (this.getMonth() + 1)).padStart(2, 0),
            MMM: () => new Intl.DateTimeFormat(Date2.locales, { month: "short" }).format(new Date(this.getFullYear(), this.getMonth())),
            MMMM: () => new Intl.DateTimeFormat(Date2.locales, { month: "long" }).format(new Date(this.getFullYear(), this.getMonth())),
            DD: () => ("" + this.getDate()).padStart(2, 0),
            DDD: () => new Intl.DateTimeFormat(Date2.locales, { weekday: "short" }).format(new Date(this.getFullYear(), this.getMonth(), this.getDay())),
            DDDD: () => new Intl.DateTimeFormat(Date2.locales, { weekday: "long" }).format(new Date(this.getFullYear(), this.getMonth(), this.getDay())),
            HH: () => ("" + this.getHours()).padStart(2, 0),
            mm: () => ("" + this.getMinutes()).padStart(2, 0),
            ss: () => ("" + this.getSeconds()).padStart(2, 0),
        });
    }

    getUnit(unit) {
        return this.unit[unit] ?? unit;
    }

    /**
     *
     * @example
     * // add
     * // unit=
     * // years
     * // year
     * // y
     * // months
     * // month
     * // M
     * // days
     * // day
     * // date
     * // d
     * // hours
     * // hour
     * // h
     * // minutes
     * // minute
     * // m
     * // seconds
     * // second
     * // s
     * console.log(date.add(1,'d')) // Date2 2022-08-18T04:52:09.758Z
     * console.log(date.add(1,'d')) // Date2 2022-08-19T04:52:09.758Z
     * console.log(date.add(1,'d')) // Date2 2022-08-20T04:52:09.758Z
     * @param {Number} value
     * @param {String} unit - `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds`
     * @returns {Object/Date2}
     */
    add(value, unit) {
        this.set[this.getUnit(unit)](this.get[this.getUnit(unit)]() + value);
        return this;
    }

    /**
     *
     * @param {Number} value
     * @param {String} unit - `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds`
     * @returns {Object/Date2}
     */
    subtract(value, unit) {
        this.set[this.getUnit(unit)](this.get[this.getUnit(unit)]() - value);
        return this;
    }

    /**
     *
     * @param {String} unit - `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds`
     * @returns {Object/Date2}
     */
    startOf(unit) {
        let skip = true;

        for (const name in this.min) {
            if (!skip) {
                this.set[name](this.min[name]());
            }

            if (this.getUnit(unit) == name) {
                skip = false;
            }
        }
        return this;
    }

    /**
     *
     * @param {String} unit - `y, year, years, YYYY`,`month, months, M`,`d, day, days, date, D`,`h, hour, hours, H`,`m, minute, minutes`,`s, second, seconds`
     * @returns {Object/Date2}
     */
    endOf(unit) {
        let skip = true;

        for (const name in this.max) {
            if (!skip) {
                this.set[name](this.max[name]());
            }

            if (this.getUnit(unit) == name) {
                skip = false;
            }
        }
        return this;
    }

    /**
     *
     * @example
     * // Format output
     * console.log(date.format('YYYY')) // 2022
     * console.log(date.format('M')) // 8
     * console.log(date.format('D')) // 17
     * console.log(date.format('H')) // 11
     * console.log(date.format('m')) // 49
     * console.log(date.format('s')) // 25
     * console.log(date.format('YY')) // 22
     * console.log(date.format('MM')) // 08
     * console.log(date.format('DD')) // 17
     * console.log(date.format('HH')) // 11
     * console.log(date.format('mm')) // 49
     * console.log(date.format('ss')) // 25
     * console.log(date.format('MMM')) // Aug
     * console.log(date.format('MMMM')) // August
     * console.log(date.format('DDD')) // Wed
     * console.log(date.format('DDDD')) // Wednesday
     * console.log(date.format('H:m\r\nDD/MM/YYYY'))
     * @param {String} anyFmt - `YYYY`,`YY`,`M`,`MM`,`MMM`,`MMMM`,`D`,`DD`,`DDD`,`DDDD`,`H`,`HH`,`m`,`mm`,`s`,`ss`
     * @returns {String}
     */
    format(anyFmt) {
        const regexp = new RegExp(`\\b(${Object.getOwnPropertyNames(this.value).join("|")})\\b`, "g");
        return anyFmt.replace(regexp, ($, $1) => this.value[$1]());
    }
}

/**
 *
 */
class String2 {
    /**
     *
     * @param {String} string
     * @returns {String}
     */
    static pascalCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //trim
            .replace(/([a-z])([A-Z])/g, "$1 $2") //split
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => $2.toUpperCase()); //transform
    }

    /**
     *
     * @param {String} string
     * @returns {String}
     */
    static camelCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //trim
            .replace(/([a-z])([A-Z])/g, "$1 $2") //split
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? $2.toLowerCase() : $2.toUpperCase())); //transform
    }

    /**
     *
     * @param {String} string
     * @returns {String}
     */
    static kebabCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //trim
            .replace(/([a-z])([A-Z])/g, "$1 $2") //split
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? "" : "-") + $2)
            .toLowerCase(); //transform
    }

    /**
     *
     * @param {String} string
     * @returns {String}
     */
    static snakeCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //trim
            .replace(/([a-z])([A-Z])/g, "$1 $2") //split
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? "" : "_") + $2)
            .toLowerCase(); //transform
    }

    /**
     *
     * @param {String} string
     * @returns {String}
     */
    static titleCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //trim
            .replace(/([a-z])([A-Z])/g, "$1 $2") //split
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? "" : " ") + $2.toUpperCase()); //transform
    }
}

// // @test
// let strings = [
//     //
//     "PascalCase",
//     "camelCase",
//     "/Pascal/Case/",
//     "/camel/Case/",
//     "-kebab-case-",
//     "_snake_case_",
//     " Title Case ",
//     "GET/v3/trx/history",
// ];
// for (let i = 0; i < strings.length; i++) {
//     let string = strings[i];
//     // console.log(String2.pascalCase(string));
//     // console.log(String2.camelCase(string));
//     // console.log(String2.kebabCase(string));
//     // console.log(String2.snakeCase(string));
//     // console.log(String2.titleCase(string));
// }

/**
 *
 */
class Math2 {
    /**
     *
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     *
     * @param {Number} cost
     * @param {Number} markup
     * @returns {Number}
     */
    static markup(cost, markup) {
        return cost + (cost * markup) / 100;
    }

    /**
     *
     * @param {Number} cost
     * @param {Number} margin
     * @returns {Number}
     */
    static margin(cost, margin) {
        return cost * (cost / (cost - (cost * margin) / 100));
    }

    /**
     *
     * @param {Number} original_price
     * @param  {...any} discounts
     * @returns {Number}
     */
    static discount(original_price, ...discounts) {
        var discounted_price = original_price;
        for (let i = 0; i < discounts.length; i++) {
            const discount = discounts[i];
            discounted_price = discounted_price - (discounted_price * discount) / 100;
        }
        return discounted_price;
    }
}

// // @test
// console.log(Math2.random(0,62))
// console.log(Math2.markup(5000, 5));
// console.log(Math2.margin(5000, 5));
// console.log(Math2.discount(5000));
// console.log(Math2.discount(5000, 5));
// console.log(Math2.discount(5000, 5, 5, 5));

module.exports = {
    Date2,
    String2,
    Math2,
};
