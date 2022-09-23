const {
  register,
  login,
  setAvatar,
  getAllContacts,
} = require("../controllers/userController");

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.post('/set-avatar/:id', setAvatar)
router.get('/get-all-contacts/:id', getAllContacts)

module.exports = router;
