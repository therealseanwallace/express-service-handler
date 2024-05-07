/**
 * Handles the response from a service function.
 *
 * @function handleServiceResponse
 * @param {Object} params - The function parameters.
 * @param {Object} params.res - Express response object.
 * @param {Object} params.result - The result object from a service function. Should have an 'ok' property indicating success or failure, a 'status' property with the HTTP status code, and a 'reason' property with the reason for failure (if applicable).
 * @param {boolean} [params.sendResponse=true] - Whether to send a response back to the client. Defaults to true.
 * @returns {Object} Express response object. If the operation was successful, returns a status and the result of the operation. If the operation failed, returns a status and the reason for failure.
 */
const handleServiceResponse = ({ res, result, sendResponse = true }) => {
  if (!result.ok) {
    return res.status(result.status || 400).json({ errors: [result.reason] });
  }
  if (!sendResponse) {
    return result;
  }
  return res.status(result.status || 200).json(result);
};

export { handleServiceResponse };
