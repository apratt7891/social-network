const { Schema, model } = require('mongoose');
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
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: []
    },
        {
            toJSON: {
            virtuals: true,
            getters: true
    },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length 
});

const User = model('User', UserSchema);

module.exports = User;