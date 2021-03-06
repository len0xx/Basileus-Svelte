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
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
})

export const PostModel = mongoose.model('Post', postSchema)

// Backend model
export interface PostObject {
    _id: string,
    slug: string,
    title: string,
    text: string,
    author: string,
    created: string
}

// Frontend model
export interface Post {
    slug: string,
    title: string,
    text: string,
    author: string,
    created: Date
}

export function getPublicPostModel(post: PostObject): Post {
    return {
        slug: post.slug,
        title: post.title,
        text: post.text,
        author: post.author,
        created: new Date(post.created)
    }
}
