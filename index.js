const crypto = require("crypto");

/**
 * @see {@link https://en.wikipedia.org/wiki/Type_Allocation_Code}
 */
const TAC = [
    {
        TAC: "35875105",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875205",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875305",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875405",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875505",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875605",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875705",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875805",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35875905",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35876005",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35880005",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35880105",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35880205",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35880305",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35880405",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35880505",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35880605",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35880705",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35951406",
        manufacturer: "Samsung",
        model: "Galaxy Tab E",
    },
    {
        TAC: "35880805",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35880905",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35881005",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35881105",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35881205",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35881305",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35881405",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35881505",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35881605",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35881705",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35881805",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35881905",
        manufacturer: "Apple",
        model: "iPhone 5C",
    },
    {
        TAC: "35201906",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35925406",
        manufacturer: "Apple",
        model: "iPhone 6",
    },
    {
        TAC: "35438506",
        manufacturer: "Apple",
        model: "iPhone 6+",
    },
    {
        TAC: "35325807",
        manufacturer: "Apple",
        model: "iPhone A86s",
    },
    {
        TAC: "35299209",
        manufacturer: "Apple",
        model: "iPhone 8",
    },
    {
        TAC: "35705623",
        manufacturer: "Nokia",
        model: "FastMile 5G Gateway 3.2",
    },
    {
        TAC: "35089080",
        manufacturer: "Nokia",
        model: "3410",
    },
    {
        TAC: "35099480",
        manufacturer: "Nokia",
        model: "3410",
    },
    {
        TAC: "35148420",
        manufacturer: "Nokia",
        model: "3410",
    },
    {
        TAC: "35148820",
        manufacturer: "Nokia",
        model: "6310i",
    },
    {
        TAC: "35151304",
        manufacturer: "Nokia",
        model: "E72-1",
    },
    {
        TAC: "35154900",
        manufacturer: "Nokia",
        model: "6310i",
    },
    {
        TAC: "35171005",
        manufacturer: "Sony Ericsson",
        model: "Xperia S",
    },
    {
        TAC: "35174605",
        manufacturer: "Google",
        model: "Galaxy Nexus",
    },
    {
        TAC: "35191405",
        manufacturer: "Motorola",
        model: "Defy Mini",
    },
    {
        TAC: "35226005",
        manufacturer: "Samsung",
        model: "Galaxy SIII",
    },
    {
        TAC: "35044670",
        manufacturer: "Siemens",
        model: "A50",
    },
    {
        TAC: "35238402",
        manufacturer: "Sony Ericsson",
        model: "K770i",
    },
    {
        TAC: "35274901",
        manufacturer: "Nokia",
        model: "6233",
    },
    {
        TAC: "35291402",
        manufacturer: "Nokia",
        model: "6210 Navigator",
    },
    {
        TAC: "35316004",
        manufacturer: "ZTE",
        model: "Blade",
    },
    {
        TAC: "35316605",
        manufacturer: "Samsung",
        model: "Galaxy S3",
    },
    {
        TAC: "35332705",
        manufacturer: "Samsung",
        model: "Galaxy SII",
    },
    {
        TAC: "35328504",
        manufacturer: "Samsung",
        model: "Galaxy S",
    },
    {
        TAC: "35351200",
        manufacturer: "Motorola",
        model: "V300",
    },
    {
        TAC: "35357800",
        manufacturer: "Samsung",
        model: "SGH-A800",
    },
    {
        TAC: "35376800",
        manufacturer: "Nokia",
        model: "6230",
    },
    {
        TAC: "35391805",
        manufacturer: "Google",
        model: "Nexus 4",
    },
    {
        TAC: "35405600",
        manufacturer: "Wavecom",
        model: "M1306B",
    },
    {
        TAC: "35421803",
        manufacturer: "Nokia",
        model: "5310",
    },
    {
        TAC: "35433004",
        manufacturer: "Nokia",
        model: "C5-00",
    },
    {
        TAC: "35450502",
        manufacturer: "GlobeTrotter",
        model: "HSDPA Modem",
    },
    {
        TAC: "35511405",
        manufacturer: "Sony Ericsson",
        model: "Xperia U",
    },
    {
        TAC: "35524803",
        manufacturer: "Nokia",
        model: "2330C-2",
    },
    {
        TAC: "35566600",
        manufacturer: "Nokia",
        model: "6230",
    },
    {
        TAC: "35569500",
        manufacturer: "Nokia",
        model: "1100",
    },
    {
        TAC: "35679404",
        manufacturer: "Samsung",
        model: "Galaxy Mini",
    },
    {
        TAC: "35685702",
        manufacturer: "Nokia",
        model: "6300",
    },
    {
        TAC: "35693803",
        manufacturer: "Nokia",
        model: "N900",
    },
    {
        TAC: "35694603",
        manufacturer: "Nokia",
        model: "2700",
    },
    {
        TAC: "35699601",
        manufacturer: "Nokia",
        model: "N95",
    },
    {
        TAC: "35700804",
        manufacturer: "Nokia",
        model: "C1",
    },
    {
        TAC: "35714904",
        manufacturer: "Huawei",
        model: "E398U-15 LTE Stick",
    },
    {
        TAC: "35733104",
        manufacturer: "Samsung",
        model: "Galaxy Gio",
    },
    {
        TAC: "35739804",
        manufacturer: "Nokia",
        model: "N8",
    },
    {
        TAC: "35744105",
        manufacturer: "Samsung",
        model: "Galaxy S4",
    },
    {
        TAC: "35765206",
        manufacturer: "Sony",
        model: "Xperia Z3 Compact",
    },
    {
        TAC: "35788104",
        manufacturer: "Nokia",
        model: "N950",
    },
    {
        TAC: "35803106",
        manufacturer: "HTC",
        model: "HTC One M8s",
    },
    {
        TAC: "35824005",
        manufacturer: "Google",
        model: "Nexus 5",
    },
    {
        TAC: "35828103",
        manufacturer: "Nokia",
        model: "6303C",
    },
    {
        TAC: "35836800",
        manufacturer: "Nokia",
        model: "6230i",
    },
    {
        TAC: "35837501",
        manufacturer: "XDA",
        model: "Orbit 2",
    },
    {
        TAC: "35837800",
        manufacturer: "Nokia",
        model: "N6030",
    },
    {
        TAC: "35838706",
        manufacturer: "LG",
        model: "G Stylo",
    },
    {
        TAC: "35850000",
        manufacturer: "Nokia",
        model: "Lumia 720",
    },
    {
        TAC: "35851004",
        manufacturer: "Sony Ericsson",
        model: "Xperia Active",
    },
    {
        TAC: "35853704",
        manufacturer: "Samsung",
        model: "Galaxy SII",
    },
    {
        TAC: "35869205",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35876105",
        manufacturer: "Apple",
        model: "iPhone 5S",
    },
    {
        TAC: "35896704",
        manufacturer: "HTC",
        model: "Desire S",
    },
    {
        TAC: "35902803",
        manufacturer: "HTC",
        model: "Wildfire",
    },
    {
        TAC: "35903908",
        manufacturer: "Samsung",
        model: "Galaxy S8",
    },
    {
        TAC: "35909205",
        manufacturer: "Samsung",
        model: "Galaxy Note III",
    },
    {
        TAC: "35918804",
        manufacturer: "HTC",
        model: "One X",
    },
    {
        TAC: "35920605",
        manufacturer: "Nokia",
        model: "Lumia 625",
    },
    {
        TAC: "35447909",
        manufacturer: "Nokia",
        model: "Nokia 1",
    },
    {
        TAC: "35604008",
        manufacturer: "Nokia",
        model: "Nokia 2",
    },
    {
        TAC: "35602508",
        manufacturer: "Nokia",
        model: "Nokia 5",
    },
    {
        TAC: "35929005",
        manufacturer: "Motorola",
        model: "Moto G",
    },
    {
        TAC: "35933005",
        manufacturer: "OROD",
        model: "6468",
    },
    {
        TAC: "35935003",
        manufacturer: "Nokia",
        model: "2720A-2",
    },
    {
        TAC: "35972100",
        manufacturer: "Lobster",
        model: "544",
    },
    {
        TAC: "35974101",
        manufacturer: "GlobeTrotter",
        model: "HSDPA Modem",
    },
    {
        TAC: "35979504",
        manufacturer: "Samsung",
        model: "Galaxy Note",
    },
    {
        TAC: "35808005",
        manufacturer: "Sony",
        model: "Sony C6833 - XPERIA Z ULTRA",
    },
    {
        TAC: "35815207",
        manufacturer: "Samsung",
        model: "Samsung S7",
    },
    {
        TAC: "35415808",
        manufacturer: "Samsung",
        model: "Samsung J7 Prime",
    },
    {
        TAC: "35664906",
        manufacturer: "Samsung",
        model: "Xcover 271",
    },
    {
        TAC: "35330509",
        manufacturer: "Samsung",
        model: "Galaxy S9",
    },
    {
        TAC: "35326907",
        manufacturer: "Apple",
        model: "iPhone 6s",
    },
    {
        TAC: "35197310",
        manufacturer: "irisguard",
        model: "EyePay Phone",
    },
    {
        TAC: "35664906",
        manufacturer: "Samsung",
        model: "Xcover 271",
    },
    {
        TAC: "35314409",
        manufacturer: "Go Mobile",
        model: "GO Onyx LTE",
    },
    {
        TAC: "35293708",
        manufacturer: "Samsung",
        model: "Galaxy A5 2016",
    },
    {
        TAC: "35684610",
        manufacturer: "Samsung",
        model: "Galaxy Fold 5G",
    },
    {
        TAC: "35620409",
        manufacturer: "Samsung",
        model: "Galaxy J7 2017",
    },
    {
        TAC: "35253108",
        manufacturer: "Google",
        model: "Google Pixel",
    },
    {
        TAC: "35803408",
        manufacturer: "Google",
        model: "Google Pixel 2 XL (Verizon)",
    },
    {
        TAC: "35803508",
        manufacturer: "Google",
        model: "Google Pixel 2 XL (Unlocked)",
    },
    {
        TAC: "35964309",
        manufacturer: "Google",
        model: "Google Pixel 3a XL",
    },
    {
        TAC: "35751110",
        manufacturer: "Google",
        model: "Google Pixel 4a",
    },
    {
        TAC: "35751310",
        manufacturer: "Google",
        model: "Google Pixel 4a",
    },
];

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

    add(value, unit) {
        this.set[this.getUnit(unit)](this.get[this.getUnit(unit)]() + value);
        return this;
    }

    subtract(value, unit) {
        this.set[this.getUnit(unit)](this.get[this.getUnit(unit)]() - value);
        return this;
    }

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
     */
    static pascalCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => $2.toUpperCase());
    }

    /**
     *
     */
    static camelCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? $2.toLowerCase() : $2.toUpperCase()));
    }

    /**
     *
     */
    static kebabCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? "" : "-") + $2)
            .toLowerCase();
    }

    /**
     *
     */
    static snakeCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? "" : "_") + $2)
            .toLowerCase();
    }

    /**
     *
     */
    static titleCase(string = "") {
        return ("" + string)
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i == 0 ? "" : " ") + $2.toUpperCase());
    }
}

/**
 *
 */
class Math2 {
    /**
     *
     */
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     *
     */
    static randomFixed(count) {
        let small = parseInt("1".padEnd(count, 0));
        let large = parseInt("9".padEnd(count, 0));
        return Math.floor(small + Math.random() * large);
    }

    /**
     *
     */
    static markup(cost, markup) {
        return cost + (cost * markup) / 100;
    }

    /**
     *
     */
    static margin(cost, margin) {
        return cost * (cost / (cost - (cost * margin) / 100));
    }

    /**
     *
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

/**
 *
 */
class Util {
    /**
     *
     */
    static checkLuhn(purportedCC) {
        let nDigits = purportedCC.length;
        let sum = 0;
        let parity = (nDigits - 2) % 2;
        for (let i = 0; i < nDigits - 1; i++) {
            let digit = parseInt(purportedCC[i]);
            if (i % 2 == parity) {
                digit = digit * 2;
            }
            if (digit > 9) {
                digit = digit - 9;
            }
            sum = sum + digit;
        }
        return sum % 10 == 0;
    }

    /**
     *
     */
    static randomIMEI() {
        let tac = TAC[Math2.random(0, TAC.length - 1)].TAC;

        let sncd = Math2.randomFixed(7);

        let imei = "" + tac + sncd;
        let valid = this.checkLuhn(imei);
        if (!valid) {
            return this.randomIMEI();
        }
        return imei;
    }

    /**
     *
     */
    static randomUUID() {
        return crypto.randomUUID();
    }
}

Util.Date2 = Date2;
Util.String2 = String2;
Util.Math2 = Math2;

module.exports = Util;
