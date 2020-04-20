var fs = require('fs')
var path = require('path')
const getUserBy = require('../data/users').getUserBy

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

var router = require('express').Router();

const contentDir = resolve('../data/content')

const content = {}

const files = fs.readdirSync(contentDir)
files
  .filter(filename => filename.indexOf('.js') === filename.length - 3)
  .map(filename => filename.replace('.js', ''))
  .forEach(file => { content[file] = require(`${contentDir}/${file}`); console.log(file) })
console.log(content)

router.get('/trending', function (req, res, next) {

})

router.get('/:slug', function (req, res, next) {
  try {
    const content = require(resolve('../data/content/') + req.params.slug)
    if (content.authors && content.authors.length) {
      content.authors = content.authors.map(id => getUserBy('id', id))
    }
    res.json(content)
  } catch (e) {
  }
});

module.exports = router

// router.put('/:userid', function (req, res, next) {
//     // User.findByIdAndUpdate(req.userid, req.body, function (err) {
//     //     if (err) { return next(err); }
//     //     res.render('user-updated');
//     // });
// });

// router.delete('/:userid', function (req, res, next) {
//     // User.findByIdAndDelete(req.userid, function (err) {
//     //     if (err) { return next(err); }
//     //     res.render('user-deleted');
//     // });
// });
