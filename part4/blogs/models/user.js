const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();  // eslint-disable-line no-param-reassign
        delete returnedObject._id;  
        delete returnedObject.__v; 
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User
