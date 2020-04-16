const getUserBy = require('../data/users').getUserBy

module.exports = router => {
  // router.get('/', function (req, res, next) {
  //   res.render('users');
  // });

  // router.param('userid', function (req, res, next, userid) {
  //     // req.user = User.findById(userid);
  //     req.userid = userid;
  // });

  router.get('/:userid', function (req, res, next) {
    res.json(getUserBy('handle', req.params.userid))
      // console.log('requested user', req.params.userid)
      // req.user.exec(function (err, user) {
      //     if (err) { return next(err); }
      //     res.render('user', {user: user});
      // });
  });

  router.put('/:userid', function (req, res, next) {
      // User.findByIdAndUpdate(req.userid, req.body, function (err) {
      //     if (err) { return next(err); }
      //     res.render('user-updated');
      // });
  });

  router.delete('/:userid', function (req, res, next) {
      // User.findByIdAndDelete(req.userid, function (err) {
      //     if (err) { return next(err); }
      //     res.render('user-deleted');
      // });
  });

  return router
}
