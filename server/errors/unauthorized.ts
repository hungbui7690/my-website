import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class UnauthorizedError extends CustomAPIError {
  statusCode: StatusCodes
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}

export default UnauthorizedError
