const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit-config');
const pwdCheck = require('../middleware/pwdValidator');
const userCtrl = require('../controllers/user');

router.post('/signup', accessCheck.accessCreateAccountLimiter, pwdCheck, userCtrl.signup);
router.post('/login', accessCheck.accessCreateAccountLimiter, userCtrl.login);

module.exports = router;