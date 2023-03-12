const jwt = require('jsonwebtoken')


function authenticateToken(req, res, next) {
    const token = req.cookies.access_token;

    if (token == null) next()
    else {
        jwt.verify(token, 'SECRET', (err, user) => {
            if (err) next()
            req.userId = user.id

            next()
        })
    }



}


function generateAccesToken(userId) {
    return jwt.sign({ id: userId }, 'SECRET', { expiresIn: '7d' })

}

module.exports = { authenticateToken, generateAccesToken }