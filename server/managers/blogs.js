import Blog from "../models/blog.js";

/**
 * Returns a new blog
 * Create a new blog in the database
 * @param {Object} data
 * @returns {Object}
 */
export const createBlog = async (data) => {
  const blog = new Blog(data);
  await blog.save();
  return blog;
};

/**
 * Returns a collection of all blogs
 * Find blogs defined by {project} based on the {conditions}
 * @param {Object} conditions
 * @param {Object} project
 * @returns {Object}
 */
export const getBlogs = async (conditions = {}, project = {}, sort = {}) => {
  const blogs = await Blog.find(conditions, project).sort(sort);
  return blogs;
};

/**
 * Returns a specific blog
 * Find the blog fields defined by {project} based on the {conditions}
 * @param {Object} conditions
 * @param {Object} project
 * @returns {Object}
 */
export const getBlog = async (conditions = {}, project = {}) => {
  return await Blog.findOne(conditions, project);
};

/**
 * Find the blog and update.
 * @param {Object} conditions
 * @param {Object} updateDoc
 * @returns
 */
export const updateBlog = async (conditions, updateDoc) => {
  return await Blog.findOneAndUpdate(
    conditions,
    { $set: updateDoc },
    { returnOriginal: false }
  );
};
