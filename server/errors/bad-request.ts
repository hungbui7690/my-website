import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class BadRequestError extends CustomAPIError {
  statusCode: StatusCodes

  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError
