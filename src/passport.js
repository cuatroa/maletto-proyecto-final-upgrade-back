const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');

const saltRounds = 10;

passport.use(
  'register', // Nombre de la estrategia, en este caso será register
  new LocalStrategy(
    {
        nameField: 'name',
        lastNameField: 'lastName',
        // birthDateField: 'birthDate',
        emailField: 'email', // Elegimos el campo email del req.body
        passwordField: 'password', // Elegimos el campo password del req.body
        passReqToCallback: true, // Hace que el callback reciba la Request (req)
    },
    async (req, name, lastName, email, password, done) => {
            // Aquí pondremos la lógica de registro
        try {
            // Primero buscamos si el usuario existe en nuestra DB
            const previousUser = await User.findOne({ email: email});

            // Si hay usuario previamente, lanzamos un error
            if (previousUser) {
                const error = new Error('The user is already registered!');
                return done(error);
            }

            // Si no existe el usuario, vamos a "hashear" el password antes de registrarlo
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email: email,
                password: hash,
            });

            const savedUser = await newUser.save();

            // Invocamos el callback con null donde iría el error y el usuario creado
            done(null, savedUser);
            } catch (err) {

                // Si hay un error, resolvemos el callback con el error
            return done(err);
        }
    }
  )
);