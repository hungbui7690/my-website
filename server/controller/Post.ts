import { type Request, type Response } from 'express'
import { Post, type SchemaPost } from '../model/Post'
import { BadRequestError } from '../errors'
import { StatusCodes } from 'http-status-codes'

export const createPost = async (req: Request, res: Response) => {
  const { title, description, github, featured, url, tags, image } = req.body
  if (!title || !description || !github || !tags)
    throw new BadRequestError('Please provide all information.')

  const post = new Post<SchemaPost>({
    title,
    description,
    github,
    featured: featured || false,
    url: url || github,
    tags,
    image: image || 'images/default-image.png',
  })
  await post.save()

  res.status(StatusCodes.CREATED).json(post)
}

export const getAllPosts = async (req: Request, res: Response) => {
  console.log('Get All Posts')
  const posts = await Post.find({})
  res.status(StatusCodes.OK).json(posts)
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!post) {
    res.status(StatusCodes.NOT_FOUND).json()
  }
  res.status(StatusCodes.OK).json(post)
}

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      res.status(404).send()
    }
    res.status(StatusCodes.OK).json(post)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)
    if (!post) {
      res.status(404).send("Post wasn't found")
    }
    res.status(200).send(post)
  } catch (error) {
    res.status(500).send(error)
  }
}
