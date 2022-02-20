import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	}
})

export const PostModel = mongoose.model('Post', postSchema)

// Backend model
export interface PostObject {
    _id: string,
    slug: string,
    title: string,
    text: string
}

// Frontend model
export interface Post {
    slug: string,
    title: string,
    text: string
}
