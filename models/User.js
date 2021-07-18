const { Schema, model, Thought } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

        }
    }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.length + 1,0);
});

const User = model('User', UserSchema);

module.exports = User;