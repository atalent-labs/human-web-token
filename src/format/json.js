export default class {

  #payload = null

  constructor (payload) {
    this.#payload = payload
  }

  toString() {
    return JSON.stringify(this.#payload, null, 2)
  }
}
