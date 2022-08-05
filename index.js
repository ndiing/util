const events = require("events");

/**
 * Nodejs piece of code
 * 
 * ### Install
 * ```
 * npm install @ndiing/util
 * ```
 * 
 * @module util
 */

/**
 * @class Text
*/
class Text {
    /**
     * transform text to Kebab Case
     * @param {String} string  -
     * @returns {String}
     */
    static toKebabCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([^\w]|_)/g, "-")
            .toLowerCase();
    }

    /**
     * transform text to Snake Case
     * @param {String} string  -
     * @returns {String}
     */
    static toSnakeCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([^\w]|_)/g, "_")
            .toLowerCase();
    }

    /**
     * transform text to Pascal Case
     * @param {String} string  -
     * @returns {String}
     */
    static toPascalCase(string) {
        return string //
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2) => $2.toUpperCase());
    }

    /**
     * transform text to Camel Case
     * @param {String} string  -
     * @returns {String}
     */
    static toCamelCase(string) {
        return string //
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //
            .toLowerCase()
            .replace(/([^\w]|_)(\w)/g, ($, $1, $2, i) => $2.toUpperCase());
    }

    /**
     * transform text to Title Case
     * @param {String} string  -
     * @returns {String}
     */
    static toTitleCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i > 0 ? " " : "") + $2.toUpperCase());
    }

    /**
     * template message
     * @param {String} message -
     * @param {RegExp} regexp -
     * @param  {Object/Array} data 
     * @returns {String}
     */
    static getMessage(message, regexp, ...data) {
        if (!(regexp instanceof RegExp)) {
            data = [regexp, ...data];
            regexp = /\<(\w+)\>/g;
        }
        const [object] = data;
        if (typeof object == "object") data = object;
        let i = -1;

        return message //

            .replace(regexp, function ($, $1) {
                ++i;
                return data[$1] ?? data[i] ?? Object.values(data)[i] ?? "";
            });
    }

    /**
     * escape string for regexp
     * @param {String} string -
     * @returns {String}
     */
    static escapeRegExp(string) {
        return string //
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}

/**
 * Copy object/array
 * @param {Object/Array} object -
 * @returns {Object/Array}
 */
function structuredClone(object) {
    return JSON.parse(JSON.stringify(object));
    // return Object.assign({},object)
    // return { ...object };
}

/**
 * @class DateTime
 * @extends Date
 */
class DateTime extends Date {
    constructor(...args) {
        super(...args);
        Object.defineProperties(this, {
            data: { writable: true, value: {} },
            keys: { writable: true, value: {} },
            rate: { writable: true, value: {} },
            weekdays: { writable: true, value: [] },
            months: { writable: true, value: [] },
        });
        this.keys = {
            year: "YYYY",
            years: "YYYY",
            month: "M",
            months: "M",
            week: "W",
            weeks: "W",
            date: "D",
            dates: "D",
            hour: "H",
            hours: "H",
            minute: "m",
            minutes: "m",
            second: "s",
            seconds: "s",
        };
        this.rate = {
            YYYY: 3.154e10,
            M: 2.628e9,
            W: 6.048e8,
            D: 8.64e7,
            H: 3.6e6,
            m: 60000,
            s: 1000,
        };

        var i18n = new Intl.DateTimeFormat(DateTime.locales, { weekday: "long" });
        for (let i = 0; i < 7; i++) this.weekdays.push(i18n.format(new Date(0, 0, i)));

        var i18n = new Intl.DateTimeFormat(DateTime.locales, { month: "long" });
        for (let i = 0; i < 12; i++) this.months.push(i18n.format(new Date(0, i)));

        this.update();
    }

    /** @private */
    update(date = this) {
        this.data.YYYY = date.getFullYear();
        this.data.M = date.getMonth() + 1;
        this.data.D = date.getDate();
        this.data.H = date.getHours();
        this.data.m = date.getMinutes();
        this.data.s = date.getSeconds();
        this.data.YY = String(this.data.YYYY).slice(-2);
        this.data.MM = String(this.data.M).padStart(2, 0);
        this.data.DD = String(this.data.D).padStart(2, 0);
        this.data.HH = String(this.data.H).padStart(2, 0);
        this.data.mm = String(this.data.m).padStart(2, 0);
        this.data.ss = String(this.data.s).padStart(2, 0);
        this.data.MMMM = this.months[this.data.M - 1];
        this.data.DDDD = this.weekdays[date.getDay()];
        this.data.MMM = this.data.MMMM.slice(0, 3);
        this.data.DDD = this.data.DDDD.slice(0, 3);

        if (date !== this) {
            this.setFullYear(this.data.YYYY);
            this.setMonth(this.data.M - 1);
            this.setDate(this.data.D);
            this.setHours(this.data.H);
            this.setMinutes(this.data.m);
            this.setSeconds(this.data.s);
            this.update();
        }
    }

    /** @private */
    getKey(name) {
        return this.keys[name] ?? name;
    }

    /** @private */
    getMaxDays(year, month) {
        return 32 - new Date(year, month).getDate();
    }

    /** @private */
    getValues(condition, name) {
        const key = this.getKey(name);
        const values = {
            YYYY: [this.data.YYYY, this.data.YYYY],
            M: [1, 12],
            D: [1, this.getMaxDays(this.data.YYYY, this.data.M)],
            H: [0, 24 - 1],
            m: [0, 60 - 1],
            s: [0, 60 - 1],
        };
        let skip = true;

        for (const name in values) {
            if (key == name) skip = false;
            if (skip) continue;
            this.data[name] = values[name][condition];
        }
        return [this.data.YYYY, this.data.M - 1, this.data.D, this.data.H, this.data.m, this.data.s];
    }

    /** @private */
    getRateValue(name, value) {
        return value * this.rate[this.getKey(name)];
    }

    /**
     * add value by `name`
     * @param {Number} value -
     * @param {String} name -
     * @returns {Date}
     */
    add(value = 0, name = "") {
        this.update(new Date(this.valueOf() + this.getRateValue(name, value)));
        return this;
    }

    /**
     * substract value by `name`
     * @param {Number} value -
     * @param {String} name -
     * @returns {Date}
     */
    substract(value = 0, name = "") {
        this.update(new Date(this.valueOf() - this.getRateValue(name, value)));
        return this;
    }

    /**
     * get date start of
     * @param {String} name -
     * @returns {Date}
     */
    startOf(name) {
        this.update(new Date(...this.getValues(0, name)));
        return this;
    }

    /**
     * get date end of
     * @param {String} name -
     * @returns {Date}
     */
    endOf(name) {
        this.update(new Date(...this.getValues(1, name)));
        return this;
    }

    /**
     * Date format
     * @param {String} template -
     * @returns {String}
     */
    format(template = "") {
        return String(template).replace(/\b(YYYY|M|D|H|m|s|YY|MM|DD|HH|mm|ss|MMMM|DDDD|MMM|DDD)\b/g, ($, $1) => this.data[$1]);
    }
}

/**
 * @class EventEmitter
 * @extends events
 */
class EventEmitter extends events {
    on(eventName, listener) {
        super.on(eventName.source ?? eventName, listener);
    }

    emit(eventName, ...args) {
        super.emit(eventName, ...args);

        for (const name in this._events) if (new RegExp("^" + name + "$").test(name) && eventName !== name) super.emit(name, eventName, ...args);
    }
}

module.exports = {
    Text,
    DateTime,
    EventEmitter,
};
