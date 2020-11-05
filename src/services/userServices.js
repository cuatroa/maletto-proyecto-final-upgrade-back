const User = require("../models/User");

//Asincrono - primera function con todos los users
async function getAllUser () {
    try {
        const users = await User.find();
        return users;
    }
    catch (error) {
        throw new Error('Users not found');
    }
} 

//Function para encontrar users por ID
async function getUserById (id) {
    try {
        const user = await User.findById(id);
        return user;
    }
    catch (error) {
        throw new Error('User Id not found');
    }

}

//Function para encontrar el usuario por email
async function getUserByEmail (email) {
    try {
        //findOne = palabra reservada para email
        //Se recoge un parámetro para encontrar los datos del models definido
        const user = await User.findOne({'email':email});
        return user;
    }
    catch (error) {
        throw new Error('User Email not found');
    }

}

//Function para crear users
async function createUser (name , lastname , address , email , birthDate , password , guardian , telephone , img) {
    try {
        //Se genera una constante de nuevo usario para almacenar los datos requeridos en el siguiente parámetro 
        const newUser = new User();
        newUser.name = name;
        newUser.lastname = lastname;
        newUser.address = address;
        newUser.email = email;
        newUser.birthDate = birthDate;
        newUser.password = password;
        newUser.guardian = false;
        newUser.telephone = telephone;
        //Esto se añade por si hay img o no, no es requerido.
        if (img) {
            newUser.img = img;
        }
        //Se genera una constante para salvar los datos creando una nueva constante
        const saveUser = await newUser.save();
        return saveUser;               
    }

    catch (error) {
        throw new Error('User could not create');
    }

}

//Function para borrar users
async function deleteUserById(id) {
    try {
        const userDelete = await User.findByIdAndDelete(id);
        return userDelete;
    }
    catch (error) {
        throw new Error ('User could not delete');
    }
}

//Function para actualizar users
async function updateUserById(id , fields) {
    try {
        const updateFields = {};
        if (fields.name) {​​
            updatedFields.name = fields.name;  
        }
        if (fields.lastname) {​​
            updatedFields.lastname = fields.lastname;  
        }
        if (fields.address) {​​
            updatedFields.address = fields.address;  
        }
        if (fields.email) {​​
            updatedFields.email = fields.email;  
        }
        if (fields.birthDate) {​​
            updatedFields.birthDate = fields.birthDate;  
        }
        if (fields.password) {​​
            updatedFields.password = fields.password;  
        }
        if (fields.guardian) {​​
            updatedFields.guardian = fields.guardian;  
        }
        if (fields.telephone) {​​
            updatedFields.telephone = fields.telephone;  
        }
        const newUser = await User.findByIdAndUpdate(id , updateFields , {new:true});

        return newUser;​​
    }
    catch (error) {
        throw new Error ('User could not update');
    }
}

//Investigar Overwrite --- :)

module.exports = {getAllUser,getUserById,getUserByEmail,createUser,deleteUserById,updateUserById};