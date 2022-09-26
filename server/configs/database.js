import { ENV_CONSTANTS } from './constants.js';

const URI = ENV_CONSTANTS.MONGO_URI;
const NAME = 'react_tutorial';
const NEW_URL_PARSER = true;
const AUTO_INDEX = true;
const USE_FIND_AND_MODIFY = false;
const USE_UNIFIED_TOPOLOGY = true;
const USE_CREATE_INDEX = true;
const POOL_SIZE = 10;
const CONNECTION_TIMEOUT_MS = 50000;
const SOCKET_TIMEOUT_MS = 50000;
const MONGO_DEBUG = false;

const ERROR = 'error';
const CONNECTED = 'connected';
const OPEN = 'open';
const RECONNECTED = 'reconnected';
const DISCONNECTED = 'disconnected';
const DEBUG = 'debug';

const MODEL_NAMES = {
  BLOGS: 'blogs',
};

export const DATABASE = {
  URI,
  NAME,
  NEW_URL_PARSER,
  AUTO_INDEX,
  USE_FIND_AND_MODIFY,
  USE_UNIFIED_TOPOLOGY,
  USE_CREATE_INDEX,
  POOL_SIZE,
  CONNECTION_TIMEOUT_MS,
  SOCKET_TIMEOUT_MS,
  MONGO_DEBUG,
  ERROR,
  CONNECTED,
  OPEN,
  RECONNECTED,
  DISCONNECTED,
  DEBUG,
  MODEL_NAMES,
};
