import {jest} from '@jest/globals';
import path from 'path'
import fs from 'fs'
import { Fixture } from './fixture.js'

const FIXTURE_FOLDER = path.resolve('tests', 'fixtures') 

function loadFixtures(folder, only) {
  return fs
    .readdirSync(folder)
    .filter(fixture => path.extname(fixture) === '.yml')
    .filter(fixture => {
      if (0 === only.length) return true
      return only.some(el => fixture.startsWith(el))
    })
    .map(filename => {
      const fixture = path.resolve(folder, filename)
      return new Fixture(fixture)
    })
}

const selectedFixture = [
  //'02'
]

const fixtureList = loadFixtures(FIXTURE_FOLDER, selectedFixture)
test.each(fixtureList)('Tests - %s', async (fixture) => {

  if (fixture.mock.dateTime) {
    Date.now = jest.fn(() => new Date(fixture.mock.dateTime));
  }

  if (fixture.ok) {
    expect(fixture.run()).toEqual(fixture.output)
  } else {
    expect(() => fixture.run()).toThrow(fixture.output)
  }
})

