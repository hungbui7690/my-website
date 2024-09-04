import { type Request, type Response, type NextFunction } from 'express'
import { UnauthenticatedError, UnauthorizedError } from '../errors'
import jwt, { type JwtPayload } from 'jsonwebtoken'

interface Payload extends JwtPayload {
  username: string
}

interface UserRequest extends Request {
  user: any
}

export const authenticateUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid')
  }

  try {
    const { username } = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as Payload
    req.user = { username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}
