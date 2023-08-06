const router = require('express').Router();
const { celebrate } = require('celebrate');

const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { signinSchema, signupSchema } = require('../celebrateValidation/celebrateSchems');
const { handleOtherRouts } = require('../helpers/utils');

router.post('/signin', celebrate(signinSchema), login);
router.post('/signup', celebrate(signupSchema), createUser);
router.post('/signout', auth, logout);
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use(auth, handleOtherRouts);

module.exports = router;
