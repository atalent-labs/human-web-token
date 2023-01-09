import Transform from './transform.js'

const FORMATS = {
  'human': original => {
      const item = JSON.parse(JSON.stringify(original))
      if (!item.title) {
        item.title = '❓ custom claim'
      }
      delete item.order
      delete item.raw
      delete item.emoji
      if (Array.isArray(item.value)) {
        item.value = item.value.length + ' items'
      }
      return item
  },
  'raw': original => {
    const item = JSON.parse(JSON.stringify(original))
    delete item.order
    delete item.emoji
    delete item.title
    delete item.value
    return item
  }
}
export default function JWT (input, options = {}) {
  try {
    const {
      format = "human",
      claims
    } = options

    if (undefined === FORMATS[format]) {
      throw new Error(`The format "${format}" is not valid.`)
    }
    
    let [
      header,
      payload,
      signature
    ] = input.split('.')

    header = JSON.parse(Buffer.from(header, 'base64').toString('utf-8'))
    payload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))

    const transformer = new Transform(payload, format)

    const result = transformer.get()
    result.data = result.data.map(FORMATS[format])
    if (claims) {
      result.data = result.data.filter(({ claim }) => {
        return claims.includes(claim)
      })
    }
    return result
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new SyntaxError('The input is not a valid standard JWT')
    }
    throw e
  }
}
