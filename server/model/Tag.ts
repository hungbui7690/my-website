import { Schema, type InferSchemaType, model } from 'mongoose'

interface ITag {
  name: string
  color: string
}

const tagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

export type SchemaTag = InferSchemaType<typeof tagSchema>
export const Tag = model('Tag', tagSchema)
