import { type Request, type Response } from 'express'
import { User } from '../model/User'
import { StatusCodes } from 'http-status-codes'

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body

  const emailAlreadyExists = await User.findOne({ username })
  if (emailAlreadyExists) {
    throw new Error('User is already exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  // a. we use "fake token" now -> later, will use "crypto" library
  const verificationToken = 'fake token'

  // b. create user with token
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  })

  // c. postman -> db to check -> pic: postman-register
  res.status(StatusCodes.CREATED).json({
    msg: 'Success!!',
  })
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new Error('Please provide email and password')
  }
  const user = await User.findOne({ username })

  if (!user) {
    throw new Error('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid Credentials')
  }

  // 3.
  if (!user.isVerified)
    throw new CustomError.UnauthenticatedError('Please verify your account ')

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}
