import {
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
} from '../managers/blogs.js';
import { RESPONSE_CODES } from '../configs/responseCodes.js';
import { responseType } from '../utils/responseTypes.js';
import { MESSAGES } from '../configs/messages.js';
import { helpers } from '../utils/helpers.js';

/**
 * Get all blogs
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
export const list = async (req, res) => {
  try {
    const conditions = { is_deleted: false };
    const project = { title: 1, body: 1, author: 1 };

    return getBlogs(conditions, project).then(blogs =>
      res
        .status(RESPONSE_CODES.OK)
        .json(responseType.success(RESPONSE_CODES.OK, MESSAGES.SUCCESS, blogs)),
    );
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

/**
 * Returns blog details
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const read = async (req, res) => {
  try {
    const conditions = {
      _id: req.params.id,
      is_deleted: false,
    };

    const project = {
      _id: 1,
      title: 1,
      body: 1,
      author: 1,
    };

    return getBlog(conditions, project).then(blog => {
      if (helpers.isNotEmpty(blog)) {
        res
          .status(RESPONSE_CODES.OK)
          .json(
            responseType.success(RESPONSE_CODES.OK, MESSAGES.SUCCESS, blog),
          );
      } else {
        res
          .status(RESPONSE_CODES.BAD_REQUEST)
          .json(
            responseType.success(
              RESPONSE_CODES.BAD_REQUEST,
              MESSAGES.NOT_FOUND,
            ),
          );
      }
    });
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

/**
 * Returns new blog
 * Creates blog in the BD
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
export const create = (req, res) => {
  try {
    const data = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
    };

    return createBlog(data).then(blog => {
      return res.json(
        responseType.success(RESPONSE_CODES.OK, MESSAGES.SUCCESS, blog),
      );
    });
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

/**
 * Soft delete blog using id
 * @param {object} req
 * @param {object} res
 * @returns {object}
 */
export const remove = (req, res) => {
  try {
    const conditions = {
      _id: req.params.id,
      is_deleted: false,
    };

    const doc = {
      is_deleted: true,
    };

    return updateBlog(conditions, doc).then(blog => {
      if (helpers.isNotEmpty(blog)) {
        return res.json(
          responseType.success(RESPONSE_CODES.OK, MESSAGES.SUCCESS, blog),
        );
      }

      return res.json(
        responseType.success(RESPONSE_CODES.NOT_FOUND, MESSAGES.NOT_FOUND),
      );
    });
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
