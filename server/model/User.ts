import { Schema, type InferSchemaType, model } from 'mongoose'

interface IUser {
  username: string
  password: string
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

export type SchemaPost = InferSchemaType<typeof userSchema>
export const User = model('User', userSchema)
