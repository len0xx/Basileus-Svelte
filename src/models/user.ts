import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name not provided ']
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: [true, 'Email already exists in database!'],
        required: [true, 'Email not provided'],
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

export const UserModel = mongoose.model('User', userSchema)

export interface UserObject {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: 'user' | 'admin',
    password: string,
    created: Date
}

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: 'user' | 'admin'
}

export function getPublicUserModel(user: UserObject): User {
    return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role
    }
}
