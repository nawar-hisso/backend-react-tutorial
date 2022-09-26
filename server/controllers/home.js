import { MESSAGES } from '../configs/messages.js';
import { RESPONSE_CODES } from '../configs/responseCodes.js';
import { responseType } from '../utils/responseTypes.js';

export const home = (req, res) => {
  try {
    return res
      .status(RESPONSE_CODES.OK)
      .json(responseType.success(RESPONSE_CODES.OK, MESSAGES.WELCOME));
  } catch (error) {
    return res
      .status(RESPONSE_CODES.INTERNAL_SERVER_ERROR)
      .json(
        responseType.error(
          RESPONSE_CODES.INTERNAL_SERVER_ERROR,
          error.message,
          error,
        ),
      );
  }
};
