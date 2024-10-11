const router = require('express').Router()
const { policeCheck } = require('../../middleware/index')
const cartController = require('./controller')

router.get('/carts', policeCheck('read', 'CartItem'), cartController.index)
router.put('/carts', policeCheck('update', 'CartItem'), cartController.update)
router.post('/carts', policeCheck('create', 'CartItem'), cartController.addToCart)

module.exports = router