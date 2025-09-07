// utils/responses.js

/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {object} data - The payload to send
 * @param {string} message - Optional message
 * @param {number} status - HTTP status code (default: 200)
 */
export const successResponse = (res, data = {}, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error response
 * @param {object} res - Express response object
 * @param {string} message - Error message
 * @param {number} status - HTTP status code (default: 500)
 * @param {object|null} errors - Extra error details (validation, etc.)
 */
export const errorResponse = (res, message = "Something went wrong", status = 500, errors = null) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
