import moment from 'moment'
import DATA from './data.js'

const TIME_FORMAT = 'YY-MM-DD HH:mm:ss [GMT] ZZ'

const TRANSFORM = {
  noop: value => value,
  jti: value => {
    return value
  },
  scope: value => value.split(' ').slice(0,5),
  exp: (value) => {
    let date = moment.unix(value).format(TIME_FORMAT)
    let minuteLeft = moment.unix(value).diff(moment(), 'minutes')
    if (minuteLeft >  0) {
      date += ` (${minuteLeft} minutes left)`
    } else {
      date += ` (${minuteLeft*-1} minutes ago)`
    }
    return date
  },
  iat: (value) => {
    let date = moment.unix(value).format(TIME_FORMAT)
    const minuteAgo = moment().diff(moment.unix(value), 'minutes')
    return `${date} (${minuteAgo} minutes ago)`
  }
}

export default class {

  #payload = null

  constructor (payload, opt) {
    this.#payload = payload
  }

  formatDate(unixTimestamp) {
    return moment.unix(unixTimestamp).format(TIME_FORMAT)
  }

  get validity() {
    const start = moment.unix(this.#payload.iat)
    const end = moment.unix(this.#payload.exp)
    return moment.duration(end.diff(start)).asMinutes() + ' minutes'
  }

  #flatten(obj) {
    var res = {};
    (function recurse(obj, current) {
      for(var key in obj) {
        var value = obj[key];
        var newKey = (current ? current + "." + key : key)
        if(value && false === Array.isArray(value) && typeof value === "object" ) {
          recurse(value, newKey);
        } else {
          res[newKey] = value;
        }
      }
    })(obj);
    return res

  }

  get payload () {
    const payload = this.#flatten(this.#payload)
    return Object
      .entries(payload)
      .map(([key, value], i) => {
        const result = DATA[key] || {}
        result.claim = key
        result.raw = value
        result.value = this.#transform(key)(value)
        result.order = result.order || 100 + parseInt(i)
        return result
      })
      .sort((a, b) => a.order - b.order)
  }

  get isValid() {
    return TRANSFORM.exp(this.#payload.exp).includes('left')
  }

  #transform(key) {
    return TRANSFORM[key] || TRANSFORM['noop']
  }

  get() {
    return {
      metadata: {
        isValid: this.isValid
      },
      data: this.payload,
    }
  }
}


