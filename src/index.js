import HumanFormat from './format/human.js'
import RawFormat from './format/raw.js'
import JsonFormat from './format/json.js'

const FORMAT = {
  'raw': RawFormat,
  'json': JsonFormat,
  'human': HumanFormat
}

export default function JWT (input, options) {
  const {
    format = "human"
  } = options

  const Class = FORMAT[format]
  if (undefined == Class) {
    throw new Error(`The format "${format}" is not valid.`)
  }
  
  try {
    let [
      header,
      payload,
      signature
    ] = input.split('.')

    header = JSON.parse(Buffer.from(header, 'base64').toString('utf-8'))
    payload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
    const result = new Class(payload)
    return result.toString()
  } catch (e) {
    console.log(e)
    throw new Error('The input is not a valid standard JWT')
  }
}
