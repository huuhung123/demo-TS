import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
    title: { type: String, required: true},
    url: { type: String, required: true, unique: true, lowercase: true},
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now}
})

export default model('Post', PostSchema)