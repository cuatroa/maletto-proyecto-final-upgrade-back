const express = require('express')
const passport = require('passport')

const { isAuthenticated } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/profile', [isAuthenticated], (req, res) => res.status(200).json(req.user))

router.post('/register', passport.authenticate('register'), (req, res) =>
  res.status(200).json({ data: req.user })
)

router.post('/login', passport.authenticate('login'), (req, res) =>
  res.status(200).json({ data: req.user })
)

router.get('/logout', (req, res) => {
    // Logout using the passport added logout method
    req.logout()
  
    // Send user to check if it's really logged out
    res.status(200).json({ data: 'OK' })
})

 module.exports = router