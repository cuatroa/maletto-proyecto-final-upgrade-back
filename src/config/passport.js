const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const uuid = require('uuid').v4
const bcrypt = require('bcrypt')

const User = require('../models/User')

// Guide on how to config: https://developers.google.com/adwords/api/docs/guides/authentication#create_a_client_id_and_client_secret
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/auth/google/redirect'
//     },
//     (_accessToken, _refreshToken, profile, done) => {
//       // Profile contains out google user data
//       const { id: googleId, displayName, name, emails } = profile
//       // User main email is in profile.emails[0]
//       const { value: email } = emails[0]

//       // Find user with the same googleId and if does not exist create it.
//       User.findOne({ email })
//         .then((user) => {
//           // Create a random password and encrypt it so user field exists
//           const salt = bcrypt.genSaltSync(12)
//           const hash = bcrypt.hashSync(uuid(), salt)

//           // In case user is already in database, log the user with a valid cookie.
//           if (!user) {
//             const newUser = new User({
//               email,
//               googleId,
//               password: hash
//             })

//             newUser.save().then(() => {
//               done(null, newUser)
//             })
//           } else {
//             done(null, user)
//           }
//         })
//         .catch((err) => done(err, null))
//     }
//   )
// )

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // Receive req in case more fields are needed when registering user
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // If there is no user in DB, register it
          if (!user) {
            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hashSync(password, salt)

            const newUser = new User({
              email,
              password: hash,
              name: req.body.name,
              lastName: req.body.lastName,
              birthDate: req.body.birthDate
              // Add all other fields from here on using the req object...
            })

            newUser
              .save()
              .then(() => done(null, newUser))
              .catch((err) => done(err, null))
          } else {
            throw new Error('User already exists')
          }
        })
        .catch((err) => done(err, null))
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // Receive req in case more fields are needed when registering user
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            throw new Error('User does not exist')
          }

          const userPassword = user.get('password')
          const isValidPassword = bcrypt.compareSync(password, userPassword)

          if (!isValidPassword) {
            throw new Error('Incorrect email and password')
          }

          done(null, user)
        })
        .catch((err) => done(err, null))
    }
  )
)

// Create a cookie containing the user id
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Get the cookie from the request and convert it into the user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user))
})
