import moment from 'moment'

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss [GMT] ZZ'

export default class {

  #payload = null

  constructor (payload) {
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

  get payload () {
    const minuteLeft = moment.unix(this.#payload.exp).diff(moment(), 'minutes')
    const expirate_at = `${this.formatDate(this.#payload.exp)} (${minuteLeft} minutes left)`

    const minuteAgo = moment().diff(moment.unix(this.#payload.iat), 'minutes')
    const issue_at = `${this.formatDate(this.#payload.iat)} (${minuteAgo} minutes ago)`

    return {
      token_id: this.#payload.jti,
      type: this.#payload.typ,
      expirate_at,
      issue_at,
      issue_by: this.#payload.iss,
      user_id: this.#payload.sub,
      client_id: this.#payload.azp,
      permissions: this.#payload.scope.split(' '),
      session_id: this.#payload.sid,
      session_state: "874fe383-966e-4e94-9717-9748bd1ccc81",
      validity: this.validity
    }
  }

  toString() {
    return JSON.stringify(this.payload, null, 2)
  }
}
