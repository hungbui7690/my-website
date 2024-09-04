import { type Request, type Response } from 'express'
import { User } from '../model/User'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { BadRequestError, UnauthorizedError } from '../errors'

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password)
    throw new BadRequestError('Please provide username and password')

  const isUserExists = await User.findOne({ username })
  if (isUserExists) {
    throw new BadRequestError('username already exists')
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_LIFETIME,
  })

  const user = await User.create({
    username,
    password: hashedPassword,
  })

  res.status(StatusCodes.CREATED).json({
    username,
    password: hashedPassword,
  })
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Please provide username and password')
  }
  const user = await User.findOne({ username })

  if (!user) {
    throw new UnauthorizedError('username does not exist')
  }

  const checkPassword = await bcrypt.compareSync(password, user.password)
  if (!checkPassword) {
    throw new UnauthorizedError('Your password is not correct')
  }

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', username, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })

  res.status(StatusCodes.OK).json({ username })
}

export { register, login }
