import mongoose from 'mongoose'

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
} 

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
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
			},
			message: '{VALUE} is not a valid email!'
		}
	},
	role: {
		type: String,
		enum: [...Object.values(UserRole).filter(k => typeof k === 'string')],
		default: UserRole.USER
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	age: {
		type: Number,
		min: 1,
		max: 110
	}
})

export const UserModel = mongoose.model('User', userSchema)

// Backend model
export interface UserObject {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: UserRole,
    password: string,
    created: Date,
	age: number
}

// Frontend model
export interface User {
    id: string,
    firstname: string,
    lastname?: string,
    email: string,
    role: UserRole,
	age: number
}

// Convert UserObject to User
export function getPublicUserModel(user: UserObject): User {
	return {
		id: user._id.toString(),
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		role: user.role,
		age: user.age
	}
}
