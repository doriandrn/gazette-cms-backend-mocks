const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const cors = require('cors');
var router = require('express').Router();

// Install middleware
router.use(cookieParser())
router.use(bodyParser.json({limit: '10mb', extended: true}))
router.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// router.use((req, res, next) => setTimeout(next, 3000))

router.use('/auth', require('./auth'))
router.use('/content', require('./content'))
router.use('/profile', require('./profile'))

// router.use('/products', require('./products'));

// // let's mount a few more...
// router.use('/search', require('./search'));
// router.use('/cart', require('./cart'));
// router.use('/userCreation', require('./userCreation'));
// router.use('/checkout', require('./checkout'));
// router.use('/promo', require('./promo'));
// router.use('/account', ensureAuthenticated, require('./account'));
// router.use('/admin', ensureAuthenticated, require('./admin'));

module.exports = router;
