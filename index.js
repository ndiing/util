const Crypto = require('@ndiing/crypto');
const events = require("events");

// piece of code

class Text {
    static toKebabCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([^\w]|_)/g, "-")
            .toLowerCase();
    }

    static toSnakeCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/([^\w]|_)/g, "_")
            .toLowerCase();
    }

    static toPascalCase(string) {
        return string //
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2) => $2.toUpperCase());
    }

    static toCamelCase(string) {
        return string //
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "") //
            .toLowerCase()
            .replace(/([^\w]|_)(\w)/g, ($, $1, $2, i) => $2.toUpperCase());
    }

    static toTitleCase(string) {
        return string
            .replace(/^([^\w]|_)|([^\w]|_)$/g, "")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase()
            .replace(/(^|[^\w]|_)(\w)/g, ($, $1, $2, i) => (i > 0 ? " " : "") + $2.toUpperCase());
    }

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

    static escapeRegExp(string) {
        return string //
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
// // Text
// //
// // Usage
// //
// var examples = [
//     "_lorem ipsum dolor sit amet_",
//     "_lorem_ipsum_dolor_sit_amet_",
//     "_lorem-ipsum-dolor-sit-amet_",
//     "_lorem/ipsum/dolor/sit/amet_",
//     "_lorem.ipsum.dolor.sit.amet_",
//     //
//     "_LOREM IPSUM DOLOR SIT AMET_",
//     "_LOREM_IPSUM_DOLOR_SIT_AMET_",
//     "_LOREM-IPSUM-DOLOR-SIT-AMET_",
//     "_LOREM/IPSUM/DOLOR/SIT/AMET_",
//     "_LOREM.IPSUM.DOLOR.SIT.AMET_",
// ];
// console.log(examples.map(Text.toKebabCase))
// console.log(examples.map(Text.toSnakeCase))
// console.log(examples.map(Text.toPascalCase));
// console.log(examples.map(Text.toCamelCase));
// console.log(examples.map(Text.toTitleCase))
// //
// var template='hi my name is <name>, and im from <city>'
// console.log(Text.getMessage(template))
// console.log(Text.getMessage(template,{name:'ndiing',city:'pacitan'}))
// console.log(Text.getMessage(template,['ndiing','pacitan']))
// console.log(Text.getMessage(template,'ndiing','pacitan'))
// var template='hi my name is $name, and im from $city'
// var regexp=/\$(\w+)/g
// console.log(Text.getMessage(template,regexp))
// console.log(Text.getMessage(template,regexp,{name:'ndiing',city:'pacitan'}))
// console.log(Text.getMessage(template,regexp,['ndiing','pacitan']))
// console.log(Text.getMessage(template,regexp,'ndiing','pacitan'))
// var template='hi my name is %s, and im from %s'
// var regexp=/(%s)/g
// console.log(Text.getMessage(template,regexp))
// console.log(Text.getMessage(template,regexp,{name:'ndiing',city:'pacitan'}))
// console.log(Text.getMessage(template,regexp,['ndiing','pacitan']))
// console.log(Text.getMessage(template,regexp,'ndiing','pacitan'))
// //
// console.log(Text.escapeRegExp('at+cgmi\r\n'))

function structuredClone(object) {
    return JSON.parse(JSON.stringify(object));
    // return Object.assign({},object)
    // return { ...object };
}
// // structuredClone
// let data = { nama: 1 };
// let data2 = structuredClone(data);
// data.name = 2;
// console.log(data);
// console.log(data2);

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

    getKey(name) {
        return this.keys[name] ?? name;
    }

    getMaxDays(year, month) {
        return 32 - new Date(year, month).getDate();
    }

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

    getRateValue(name, value) {
        return value * this.rate[this.getKey(name)];
    }

    add(value = 0, name = "") {
        this.update(new Date(this.valueOf() + this.getRateValue(name, value)));
        return this;
    }

    substract(value = 0, name = "") {
        this.update(new Date(this.valueOf() - this.getRateValue(name, value)));
        return this;
    }

    startOf(name) {
        this.update(new Date(...this.getValues(0, name)));
        return this;
    }

    endOf(name) {
        this.update(new Date(...this.getValues(1, name)));
        return this;
    }

    format(template = "") {
        return String(template).replace(/\b(YYYY|M|D|H|m|s|YY|MM|DD|HH|mm|ss|MMMM|DDDD|MMM|DDD)\b/g, ($, $1) => this.data[$1]);
    }
}

// // DateTime
// DateTime.locales = "id";
// var date = new DateTime();
// console.log(date.format("YYYY"));
// console.log(date.format("M"));
// console.log(date.format("D"));
// console.log(date.format("H"));
// console.log(date.format("m"));
// console.log(date.format("s"));
// console.log(date.format("YY"));
// console.log(date.format("MM"));
// console.log(date.format("DD"));
// console.log(date.format("HH"));
// console.log(date.format("mm"));
// console.log(date.format("ss"));
// console.log(date.format("MMMM"));
// console.log(date.format("DDDD"));
// console.log(date.format("MMM"));
// console.log(date.format("DDD"));
// console.log(date.add(1, "YYYY").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "M").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "W").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "D").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "H").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "m").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.add(1, "s").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "YYYY").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "M").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "W").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "D").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "H").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "m").format("YYYY-MM-DD HH:mm:ss"));
// console.log(date.substract(1, "s").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("YYYY").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("M").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("D").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("H").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("m").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().startOf("s").format("YYYY-MM-DD HH:mm:ss"));

// console.log(new DateTime().endOf("years").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("year").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("YYYY").format("YYYY-MM-DD HH:mm:ss"));

// console.log(new DateTime().endOf("M").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("D").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("H").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("m").format("YYYY-MM-DD HH:mm:ss"));
// console.log(new DateTime().endOf("s").format("YYYY-MM-DD HH:mm:ss"));

class JWT {
    static encode(data, options = {}) {
        data = {
            // iss:'',// (Issuer) Claim
            // sub:'',// (Subject) Claim
            // aud:'',// (Audience) Claim
            exp: new DateTime().add(1, "minute").valueOf(), // (Expiration Time) Claim
            // nbf:'',// (Not Before) Claim
            iat: Date.now(), // (Issued At) Claim
            // jti:'',// (JWT ID) Claim
            ...data,
        };
        headers = Crypto.base64UrlEncode(JSON.stringify(headers));
        data = Crypto.base64UrlEncode(JSON.stringify(data));
        const signature = this.sign(`${headers}.${data}`, options);
        return `${headers}.${data}.${signature}`;
    }

    static decode(data, options = {}) {
        let headers;
        let signature;
        [headers, data, signature] = data.split(".");
        headers = JSON.parse(Crypto.base64UrlDecode(headers));
        data = JSON.parse(Crypto.base64UrlDecode(data));
        // signature
        return { headers, data, signature };
    }

    static sign(data, options = {}) {
        const { secret = "", headers: { alg = "HS256" } = options.headers } = options;
        const algorithm = {
            HS256: "sha256",
            HS384: "sha384",
            HS512: "sha512",
        }[alg];
        let headers;
        let signature;
        [headers, data, signature] = data.split(".");
        return Crypto.hmac(`${headers}.${data}`, { algorithm, key: secret, encoding: "base64url" });
    }

    static verify(data, signature, options = {}, callback = function () {}) {
        const err = new Error();
        // signature?

        if (signature !== this.sign(data, options)) {
            err.code = "INVALID_SIGNATURE";
            err.message = "Invalid Signature";
            throw err;
        }

        // exp?
        ({ data } = this.decode(data));

        if (Date.now() > data.exp) {
            err.code = "EXPIRED_TOKEN";
            err.message = "Expired Token";
            throw err;
        }

        callback(data);

        return true;
    }
}
// // JWT
// //
// // Usage
// //
// var secret = "your-256-bit-secret";
// var headers = { alg: "HS256", typ: "JWT" };// alg=HS256/HS384/HS512
// var options = { headers, secret };
// var data = {
//     // sub: "1234567890",
//     // name: "John Doe",
//     // iat: 1516239022,
// };
// //
// var encoded = JWT.encode(data, options);
// // encoded = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTk1OTA1NDY0NDYsImlhdCI6MTY1OTU5MDQ4NjQ0OX0.v7Ze1oYNa1BazPJaRcvq2bOO1QOSvk8VaDHyLjMaw7w";
// console.log(encoded);
// console.log(JWT.decode(encoded));
// var signature = JWT.sign(encoded, options);
// console.log(signature);
// console.log(
//     JWT.verify(encoded, signature, options, async (data) => {
//         console.log(data);
//     })
// );

// console.log(Buffer.from('your-256-bit-secret').toString('base64'))
// console.log(Buffer.from('your-256-bit-secret').toString('base64url'))
// console.log(Buffer.from('your-256-bit-secret').toString('hex'))
// console.log(Buffer.from('your-256-bit-secret').toString('utf16le'))

class EventEmitter extends events {
    on(eventName, listener) {
        super.on(eventName.source ?? eventName, listener);
    }

    emit(eventName, ...args) {
        super.emit(eventName, ...args);

        for (const name in this._events) if (new RegExp("^" + name + "$").test(name) && eventName !== name) super.emit(name, eventName, ...args);
    }
}
// // EventEmitter
// // events with regexp
// //
// // Usage
// const event = new EventEmitter();
// event.on("hi", console.log);
// event.on(".*", console.log);
// event.on(/.*/, console.log);
// event.emit("hi", "ndiing");

module.exports = {
    Text,
    DateTime,
    Crypto,
    JWT,
    EventEmitter,
};
