const { addMsg, getAllMsg } = require('../controllers/messagesController');


const router = require('express').Router();

router.post('/add-msg', addMsg)
router.post('/get-msg', getAllMsg)

module.exports = router