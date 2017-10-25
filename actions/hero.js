'use strict'
const ActionHero = require('actionhero')
const giphy = require('giphy-api-without-credentials')()

module.exports = class MyAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'hero'
    this.description = 'I reppond to Slack channels with images of super heros'
    this.outputExample = {}
    this.blockedConnectionTypes = ['web', 'websocket', 'socket']
    this.inputs = {
      text: {
        retuired: false
      }
    }
  }

  async loadImage (search) {
    if (!search) { search = 'superhero' }

    return new Promise((resolve, reject) => {
      giphy.random(search, (error, response) => {
        if (error) { return reject(error) }
        if (response.data.length === 0) { return reject(new Error('no image found')) }
        resolve(response.data.image_url)
      })
    })
  }

  async run (data) {
    let search = ''
    if (data.params.text) {
      search = data.params.text.replace(this.name, '').trim()
    }

    data.response.search = search
    data.response.text = await this.loadImage(search)
  }
}
