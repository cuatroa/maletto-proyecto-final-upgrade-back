// const jwt = require('jsonwebtoken');

// const SECRET = "Maletto2020"

// const authMid = (req, res, next) => {

//     if (!req.headers.authorization) {
//         return res.status(401).send("Fuera de aquí")
//     }

//     const token = req.headers.authorization.split(" ")[1]

//     jwt.verify(token, SECRET , (err, decoded) => {
//         if (err || !decoded) {
//             return res.status(401).send("Fuera de aquí")
//         }
//         req.userID = decoded.userID
//         next()
//     });
// }

// module.exports = authMid

const isAuthenticated = (req, res, next) => (req.user ? next() : next(new Error('Unauthorized')))

module.exports = {
  isAuthenticated
}
