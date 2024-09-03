import { Schema, type InferSchemaType, model } from 'mongoose'

interface IPost {
  title: string
  content: string
  author?: string
  createdAt?: Date
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export type SchemaPost = InferSchemaType<typeof postSchema>
export const Post = model('Post', postSchema)
