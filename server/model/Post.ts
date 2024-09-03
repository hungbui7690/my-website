import { Schema, type InferSchemaType, model } from 'mongoose'

interface IPost {
  title: string
  description: string
  content: string
  image: string
  github: string
  url: string
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

export type SchemaPost = InferSchemaType<typeof postSchema>
export const Post = model('Post', postSchema)
