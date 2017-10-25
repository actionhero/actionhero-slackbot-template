const path = require('path')

exports['default'] = {
  plugins: (api) => {
    return {
      'slack': {path: path.join(__dirname, '..', 'node_modules', 'ah-slack-plugin')}
    }
  }
}
