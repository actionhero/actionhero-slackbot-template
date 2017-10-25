'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
let api

describe('Action: hero', () => {
  before(async () => { api = await actionhero.start() })
  after(async () => { await actionhero.stop() })

  it('returns a default superhero image', async () => {
    const response = await api.specHelper.runAction('hero')
    expect(response.error).not.to.exist()
    expect(response.text).to.include('giphy.gif')
  })

  it('returns a search with an image', async () => {
    const response = await api.specHelper.runAction('hero', {text: 'hero superman'})
    expect(response.error).not.to.exist()
    expect(response.search).to.equal('superman')
    expect(response.text).to.include('giphy.gif')
  })

  it('returns an image even with a crazy search', async () => {
    const response = await api.specHelper.runAction('hero', {text: 'hero setouywg4ih4wurhglsgh43o8iren'})
    expect(response.error).to.match(/no image found/)
  })
})
