var fs = require('fs')
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const contentDir = resolve('./content')

const content = {}

const files = fs.readdirSync(contentDir)
files
  .filter(filename => filename.indexOf('.js') === filename.length - 3)
  .map(filename => filename.replace('.js', ''))
  .forEach(file => { content[file] = require(`${contentDir}/${file}`); console.log(file) })
// console.log(content)
