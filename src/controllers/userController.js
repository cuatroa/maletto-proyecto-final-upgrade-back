const userServices = require ("../services/userServices");

//Se crea este archivo para llamar a las funciones del UserService --

//Su fin es para funcionamiento del service
const allUser = async (req, res, next) => {
    try {
        const all = await userServices.getAllUser();
        res.json({user:all});
    }
    catch (error) {
        next(error);
    }
}

const userById = async (req, res, next) => {
    try {
        const userId = await userServices.getUserById(req.params.id);
        res.json({user:[userId]});
    }
    catch (error) {
        next(error);
    }
}

const userByEmail = async (req, res, next) => {
    try {
        const userEmail = await userServices.getUserByEmail(req.params.email);
        res.json({user:[userEmail]});
    }
    catch (error) {
        next(error);
    }
}

const userCreate = async (req, res, next) => {
    try {
        const newUser = await userServices.createUser(
            req.body.name,
            req.body.lastname,
            req.body.address,
            req.body.email,
            req.body.birthDate,
            req.body.password,
            req.body.guardian,
            req.body.telephone,
            // req.fileImg, -- investigar
        );
        res.json({user:});
    }
    catch (error) {
        next(error);
    }
}

const userDelete = async (req, res, next) => {
    try {
        const deleteUser = await userServices.deleteUserById(req.params.id);
        res.json({user:[deleteUser]});
    }
    catch (error) {
        next(error);
    }
}

const userUpdate = async (req, res, next) => {
    try {
        const updateUser = await userServices.updateUserById(req.params.id, req.body);
        res.json({user:[updateUser]});
    }
    catch (error) {
        next(error);
    }
}

module.exports = {allUser,userById,userByEmail,userCreate,userDelete,userUpdate };

//Explicación Cutre Rocío 
//front ---> Back --> 1-- Models What --> Service--->Dastos Objetos Models --> Controller --> Datos -- Servidor -- Usuario --> Front --> profile 

//Models -> services -> controller -> rutas :)