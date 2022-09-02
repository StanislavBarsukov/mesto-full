// error 400
const { BadRequestError } = require('./BadRequestError');
// error 401
const { UnauthorizedError } = require('./UnauthorizedError');
// error 403
const { ForbiddenError } = require('./ForbiddenError');
// error 404
const { NotFoundError } = require('./NotFoundError');
// error 409
const { ConflictError } = require('./ConflictError');

module.exports = {
  BadRequestError, UnauthorizedError, ConflictError, NotFoundError, ForbiddenError,
};
