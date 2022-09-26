import dotenv from 'dotenv';
dotenv.config();

const APPLICATION_NAME = process.env.APPLICATION_NAME || 'ReactJs tutorial';
const PORT = process.env.PORT || '5003';
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://taranna:AoiWx4y6Ssclw4yy@cluster0.fovax.mongodb.net/react_tutorial?retryWrites=true&w=majority';

export const ENV_CONSTANTS = {
  APPLICATION_NAME,
  PORT,
  MONGO_URI,
};
