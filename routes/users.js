const router = require('express').Router();
const { updateProfileValidator } = require('../validation/validation');
const { findMyProfile, updateProfile } = require('../controllers/users');

router.get('/me', findMyProfile); // возвращает информацию о пользователе (email и имя)
router.patch('/me', updateProfileValidator, updateProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;
