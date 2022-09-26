import { APPLICATION } from "./application.js";
import { DATABASE } from "./database.js";

const EMPTY = "";
const APPLICATION_RUNNING = `🚀 Server is up and running on port: ${APPLICATION.PORT}`;
const WELCOME = `Welcome to ${APPLICATION.NAME}`;
const SUCCESS = "Success";
const NOT_FOUND = "Not found";
const DB_CONNECTED = `🔌 Database connected successfully - URI: ${DATABASE.URI}`;
const DB_ERROR = "🚨 Database connection failure";
const DB_CONNECTION_OPEN = "🔌 Database connection opened";
const DB_RECONNECTED = "🔁 Database reconnected";
const DB_DISCONNECTED = "📦 Database disconnected";
const DB_CONNECTION_CLOSED = "📦 Database connection closed";
const DB_CONNECTION_FAILED = "🚨 Failed to connect to database";

export const MESSAGES = {
  EMPTY,
  APPLICATION_RUNNING,
  WELCOME,
  SUCCESS,
  NOT_FOUND,
  DB_CONNECTED,
  DB_ERROR,
  DB_CONNECTION_OPEN,
  DB_RECONNECTED,
  DB_DISCONNECTED,
  DB_CONNECTION_CLOSED,
  DB_CONNECTION_FAILED,
};
