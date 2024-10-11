const { getToken, policyFor } = require('../utils/index')
const jwt = require('jsonwebtoken')
const config = require('../app/config')
const User = require('../app/user/model')



function decodeToken() {
    return async function (req, res, next) {
        try {
            let token = getToken(req);

            if (!token) return next();

            req.user = jwt.verify(token, config.secretKey);
            let user = await User.findOne({ token: { $in: [token] } });

            if (!user) {
                return res.json({
                    error: 1,
                    message: 'Token expired'
                });
            }

            next(); // Pastikan next() dipanggil di sini

        } catch (err) {
            if (err && err.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: err.message,
                });
            }
            next(err);
        }
    };
}

    //middleware utk cek hak akses
    function policeCheck(action, subject){
        return function(req, res, next) {
            let policy = policyFor(req.user)
            if(!policy.can(action, subject)) {
                return res.json ({
                    error:1,
                    message: `kamu tidak disetujui untuk ${action} ${subject}`
                })
            }
            next()
        }
    }

module.exports =  { decodeToken, policeCheck } 