// var fs = require('fs')
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

var router = require('express').Router();

  // router.get('/', function (req, res, next) {
  //   res.render('users');
  // });

  // router.param('userid', function (req, res, next, userid) {
  //     // req.user = User.findById(userid);
  //     req.userid = userid;
  // });

router.get('/:slug', function (req, res, next) {
  console.log('sc', req.params.slug)
  try {
    const content = require(resolve('../data/content/') + req.params.slug)
    res.json(content)
    // console.log('c', content)
    // res.render('content', { content })
  } catch (e) {
    console.error('eee', e)
  }
  // res.json(getContentBy('id', req.params.contentid))
    // console.log('requested user', req.params.userid)
    // req.user.exec(function (err, user) {
    //     if (err) { return next(err); }
    //     res.render('user', {user: user});
    // });
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
