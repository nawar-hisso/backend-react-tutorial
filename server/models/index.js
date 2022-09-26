import mongoose from "mongoose";
import { DATABASE } from "../configs/database.js";
import { MESSAGES } from "../configs/messages.js";

const db = mongoose.connection;

// Options for connecting to the database
const options = {
  useNewUrlParser: DATABASE.NEW_URL_PARSER,
  useUnifiedTopology: DATABASE.USE_UNIFIED_TOPOLOGY,
  useFindAndModify: DATABASE.USE_FIND_AND_MODIFY,
  useCreateIndex: DATABASE.USE_CREATE_INDEX,
  poolSize: DATABASE.POOL_SIZE, // Returns errors immediately rather than waiting for reconnect
  autoIndex: DATABASE.AUTO_INDEX,
  connectTimeoutMS: DATABASE.CONNECTION_TIMEOUT_MS, // Give up initial connection after X seconds mentioned in CONFIGS
  socketTimeoutMS: DATABASE.SOCKET_TIMEOUT_MS, // Inactive after the connection successful
};

// Handle Db connection is opened event
const handleOpenEvent = () => {
  db.on(DATABASE.OPEN, () => {
    console.log(MESSAGES.DB_CONNECTION_OPEN);
  });
};

// Handle DB connected event
const handleConnectedEvent = () => {
  db.on(DATABASE.CONNECTED, () => {
    console.log(MESSAGES.DB_CONNECTED);
  });
};

// Handle Db disconnected event
const handleDisconnectedEvent = () => {
  db.on(DATABASE.DISCONNECTED, () => {
    console.log(MESSAGES.DB_DISCONNECTED);
  });
};

// Handle Db reconnected event
const handleReconnectedEvent = () => {
  db.on(DATABASE.RECONNECTED, () => {
    console.log(MESSAGES.DB_RECONNECTED);
  });
};

// Handle Db connection error event
const handleErrorEvent = () => {
  db.on(DATABASE.ERROR, (error) => {
    logger.error(MESSAGES.DB_ERROR + error);
  });
};

// Handle DB create a new object event
export const handleCreatedEvent = () => {};

// Handle DB update an object event
export const handleUpdatedEvent = () => {};

// Handle DB delete an object event
export const handleDeletedEvent = () => {};

export const disconnectDB = () => {
  mongoose.connection.close();
};

export default function connectToDB() {
  mongoose.connect(DATABASE.URI, options);

  // Call DB events handlers
  handleOpenEvent();
  handleConnectedEvent();
  handleReconnectedEvent();
  handleDisconnectedEvent();
  handleErrorEvent();

  // If debug true shows the mongoose query
  mongoose.set(DATABASE.DEBUG, DATABASE.MONGO_DEBUG);
}
