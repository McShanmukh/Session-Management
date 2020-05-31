const express = require('express');
const router = express.Router();

const authenticate = require('../controller/session-auth');
const authController = require('../controller/authorisation');
const profileController = require('../controller/profile');
const logoutController = require('../controller/logout');


router.post('/login', authController.login);
router.post('/register', authController.register);

// all routes that come after this middleware are protected
// and can only be accessed if the user is logged in

router.post('/check_session', authenticate.check_session);
router.post('/redirect_to_login', authenticate.redirect_to_login);
router.post('/redirect_to_profile', authenticate.redirect_to_profile);
router.post('/logout', logoutController.logout);

router.post('/profile', profileController.profile);

module.exports = router;

