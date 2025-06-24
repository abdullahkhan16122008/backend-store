let express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/userAuth.js');
const { signupController, loginController } = require('../controllers/user.controller.js');
const { verifyToken } = require('../controllers/verifyToken.controller.js');
let router = express.Router();


router.post('/signup', signupValidation, signupController)
router.post('/login', loginValidation, loginController)
router.post('/verify',  verifyToken)

module.exports = router;