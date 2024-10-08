import { StatusCodes } from 'http-status-codes'
import { type Request, type Response } from 'express'

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: any
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware
