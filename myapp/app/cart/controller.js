const Product = require('../product/model')
const CartItems = require('../../cart-item/model')
// const { policyFor } = require('../../utils/index')

const update = async (req, res, next) => {
    try {
        const { items } = req.body
        const productId = items.map(item => item.product._id)
        const products = await Product.find({ _id: { $in: productId } })
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item.product._id)
            return {
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        })

        await CartItems.deleteMany({ user: req.user._Id })
        await CartItems.bulkWrite(
            cartItems.map(item => {
                return {
                    updateOne: {
                        filter: {
                            user: req.user._id,
                            product: item.product
                        },
                        update: item,
                        upsert: true
                    }
                }
            })
        )

        return res.json(cartItems)
    } catch (err) {

        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)

    }
}

const index = async (req, res, next) => {
    try {
        console.log(req.user);
        let items = await CartItems.findOne({ user: req.user._id })
            .populate('product')

        return res.json(items)
    } catch (err) {

        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)


    }
}

const addToCart = async (req, res, next) => {
    try {
        let payload = {
            ...req.body,
            user: req.user._id  // Pastikan ID pengguna diisi
        };
        let cartItem = new CartItems(payload);
        await cartItem.save();
        return res.json(cartItem);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
};


module.exports = { update, index, addToCart }