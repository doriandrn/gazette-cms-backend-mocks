var fs = require('fs')
var path = require('path')
const getUserBy = require('../data/users').getUserBy
const getUsersBy = require('../data/users').getUsersBy

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

var router = require('express').Router();

const contentDir = resolve('../data/content')

// const content = {}

// const files = fs.readdirSync(contentDir)
// files
//   .filter(filename => filename.indexOf('.js') === filename.length - 3)
//   .map(filename => filename.replace('.js', ''))
//   .forEach(file => { content[file] = require(`${contentDir}/${file}`); console.log(file) })
// // console.log(content)

router.post('/', function (req, res, next) {
  const { body } = req
  if (!body.slug) {
    throw new Error('Invalid content: No slug provided')
  }
  if (!body.content.blocks.length) {
    throw new Error('Invalid content length')
  }
  const filePath = `${contentDir}/${body.slug}.json`
  if (fs.readFileSync(filePath)) {
    throw new Error('A content file with this slug already exists')
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(body))
    res.json({ status: 'OK' })
  } catch (e) {
    console.error('Could not post new content', body, e)
  }
})

router.get('/trending', function (req, res, next) {

})

router.get('/:slug', function (req, res, next) {
  let content
  try {
    content = { ...require(resolve('../data/content/') + req.params.slug) }
    // console.log('c', getUserBy('id'))
    // console.log('s', getUsersBy('id'))
    // assign authors data
    if (content.authors && content.authors.length) {
      console.log(content.authors)
      content.authors = content.authors.map(id => getUserBy('id', String(id)))
    }

    // assign topics data
    if (content.topics && content.topics.length) {
      console.log('has topicz')
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
