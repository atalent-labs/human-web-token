import JWT from '../src/index.js'
import yaml from 'yaml'
import path from 'path'
import fs from 'fs'
import jwtSimple from 'jwt-simple'

export class Fixture {

  #id = null
  #scenario = null
  #given = null
  #then = null

  constructor(filename) {
    const { Scenario, Given, Then } = yaml.parse(fs.readFileSync(filename).toString())

    this.#id = filename.match(/\/(\d+)-(.+).yml/)[1]
    this.#scenario = Scenario
    this.#given = Given
    this.#then = Then
  }

  get scenario () {
    return this.#scenario
  }

  get given () {
    return this.#given
  }

  get id () {
    return this.#id
  }

  get ok () {
    return this.#then.success === true
  }

  get output () {
    return this.#then.output
  }

  get options () {
    return Object.assign(this.#given.options || {})
  }

  get mock () {
    return this.#given.mock || {}
  }

  get token () {
    let result
    let {
      type,
      data
    } = this.given.token
    switch(type) {
      case 'plain':
        result = data
        break;
      case 'file':
        result = fs.readFileSync(path.resolve(FIXTURE_FOLDER, data)).toString()
        break;
      case 'decoded':
        result = jwtSimple.encode(data.payload, data.secret)
        break;
    }
    return result
  }

  run() {
    return JWT(this.token, this.options)
  }

  toString() {
    return  `${this.id} - ${this.scenario}`
  }
}
