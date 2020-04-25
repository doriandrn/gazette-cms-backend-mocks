var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/:userid', function (req, res, next) {
  res.json(getUserBy('handle', req.params.userid))
})



module.exports = router
