import mongoose from 'mongoose';
import { MESSAGES } from '../configs/messages.js';

const ObjectId = mongoose.Types.ObjectId;

/**
 * Function to build response based on status code
 * @param {*} error
 * @param {*} success
 * @returns success or error response based on status code
 */
const buildResponse = (error, success) => {
  let responseObj = {};

  if (isNotEmpty(success)) {
    responseObj = successResponseHandler(success);
  } else {
    responseObj = errorResponseHandler(error);
  }

  if (responseObj.message.length > 0) {
    responseObj.message = responseObj.message.toString();
  }

  // translate error-messages of all parameters.
  if (isNotEmpty(error) && isNotEmpty(error.errors)) {
    const errorsArray = error.errors;
    for (let i = 0; i < errorsArray.length; i++) {
      errorsArray[i]['msg'] = errorsArray[i++]['msg'];
    }
    responseObj.message = errorsArray[0]['msg'];
    responseObj.errors = errorsArray;
  }

  return responseObj;
};

const successResponseHandler = success => {
  const responseObj = {};
  if (isNotEmpty(success)) {
    responseObj.success = true;
    responseObj.message = success.message ? success.message : '';
    responseObj.data = success.data ? success.data : undefined;
  }
  return responseObj;
};

const errorResponseHandler = error => {
  const responseObj = {
    success: false,
    message: MESSAGES.UNEXPECTED_ERROR,
  };

  if (isNotEmpty(error)) {
    responseObj.success = false;
    responseObj.message = error.message ? error.message : '';
    responseObj.data = error.data ? error.data : undefined;
  }
  return responseObj;
};

/**
 * Function to get the type of the object
 * @param {*} element
 * @returns type of the object
 */
const getType = element => {
  return Object.prototype.toString.call(element);
};

/**
 * Function to check if the object is empty based on the type
 * @param {*} element
 * @returns true if the object is empty and false if not
 */

const isEmpty = element => {
  if (
    // undefined
    typeof element === 'undefined' ||
    // string
    (typeof element === 'string' && element.trim().length == 0) ||
    // null
    getType(element) === '[object Null]' ||
    getType(element) === null ||
    // Empty object
    (getType(element) === '[object Object]' && !Object.keys(element).length) ||
    // Empty array
    (getType(element) === '[object Array]' && !element.length)
  ) {
    return true;
  }

  return false;
};

/**
 * Function to check if the object is not empty based on the negation of isEmpty
 * @param {*} element
 * @returns true if the object is not empty and false if empty
 */
const isNotEmpty = element => {
  return !isEmpty(element);
};

/**
 * Function to check if element is an Array
 * @param {*} element
 * @returns true if element is an array and false if not
 */
const isArray = element => {
  if (isNotEmpty(element) && getType(element) === '[object Array]') {
    return true;
  }

  return false;
};

/**
 * Function to check is data is upserted.
 * @param {*} data
 * @returns
 */
const isUpdated = data => {
  let upserted = false;
  if (data.ok === 1) {
    upserted = true;
    return upserted;
  }
  return upserted;
};

/**
 * Function to check if element is an Object
 * @param {*} element
 * @returns true if element is an object and false if not
 */

const isObject = element => {
  if (isNotEmpty(element) && getType(element) === '[object Object]') {
    return true;
  }

  return false;
};

/**
 * Function to check is all elements in the array are of 'string' datatype.
 * Returns true if all elements are 'string', otherwise false.
 */
const isArrayOfStrings = array => {
  if (!isArray(array)) {
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (!getType(array[i]) === '[object String]') {
      return false;
    }
  }

  return true;
};

/**
 * Function to check whether emailId is valid
 * @param {*} emailId
 * @returns true if emailId is valid
 */

const isValidEmail = emailId => {
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$/i;
  let isValid = false;
  if (!isEmpty(emailId) && emailRegex.test(emailId)) {
    isValid = true;
  }
  return isValid;
};

/**
 * Function to check whether loginId is true
 * @param {*} loginId
 * @returns true if loginId is valid
 */
const isValidLoginId = loginId => {
  const loginIdRegex = /^[a-z0-9._@]+$/i;
  let isValid = false;
  /**
   * Login Id Rules:
   * 1. Can contain alphabets (case insensitive), numbers, . (dot) _ (underscores) and @ (at) symbols.
   * 2. Minimum length is 1
   */
  if (!isEmpty(loginId) && loginIdRegex.test(loginId)) {
    isValid = true;
  }

  return isValid;
};

/**
 * Function to check if input string is signed/unsigned integer.
 * Example:
 * Input "12345" returns true.
 * Input "+12345" returns true.
 * Input "-12345" returns true.
 * Input "12E45" returns false.
 */
const isValidInteger = numberString => {
  // if not empty and number-string contains only digits
  const digitsRegex = /^[+-]?[0-9]+$/;
  if (!isEmpty(numberString) && digitsRegex.test(numberString)) {
    return true;
  }

  return false;
};

/**
 * Function to check if input string is signed/unsigned float.
 * Example:
 * Input "12345" returns true.
 * Input "+12345" returns true.
 * Input "-12345" returns true.
 * Input "12345.123" returns true.
 * Input "+12345.123" returns true.
 * Input "-12345.123" returns true.
 * Input "12E45" returns false.
 */
const isValidFloat = numberString => {
  // if not empty and number-string contains only digits
  const floatRegex = /^[-+]?[0-9]*(\.[0-9]+)?$/;
  if (!isEmpty(numberString) && floatRegex.test(numberString)) {
    return true;
  }

  return false;
};

/**
 * Function to check if input string is unsigned integer(Whole Number).
 * Example:
 * Input "12345" returns true.
 * Input "+12345" returns false.
 * Input "-12345" returns false.
 * Input "12E45" returns false.
 */
const isValidWholeNumber = numberString => {
  // if not empty and number-string contains only digits
  const digitsRegex = /^[0-9]+$/;
  if (!isEmpty(numberString) && digitsRegex.test(numberString)) {
    return true;
  }

  return false;
};

/**
 *
 * @param {*} data
 * @returns array of Inserted Ids
 */
const getInsertedIds = data => {
  let insertedIds = [];
  if (data) {
    const dataString = JSON.stringify(data);
    const dataJSON = JSON.parse(dataString);
    insertedIds = dataJSON.insertedIds;
  }
  return insertedIds;
};

/**
 * Function to check if name is valid or not
 * @param {*} string
 * @returns true if name is valid else false
 */
const isValidName = string => {
  const alphaRegex = /^[a-zA-Z ]*$/; ///^[a-z-]+[a-z\- ]*$/i;
  let isValid = false;
  if (!isEmpty(string) && alphaRegex.test(string)) {
    isValid = true;
  }
  return isValid;
};

/**
 * Function to check if ObjectId is valid or not
 * @param {*} objectId
 * @returns true if ObjectId is valid else false
 */
const isValidObjectId = objectId => {
  return isNotEmpty(objectId) && ObjectId.isValid(objectId.toString());
};

/**
 * Function to return integer if its valid else return 0
 * @param {*} inputNumber
 * @param {*} defaultNumber
 * @returns integer if its valid else return 0
 */
const getValidInteger = (inputNumber, defaultNumber) => {
  let outputNumber = undefined;

  if (!isValidInteger(defaultNumber)) {
    defaultNumber = 0;
  }

  if (isValidInteger(inputNumber)) {
    outputNumber = parseInt(inputNumber);
  } else {
    outputNumber = parseInt(defaultNumber);
  }

  return outputNumber;
};

/**
 * Function to return float if its valid else return 0
 * @param {*} inputNumber
 * @param {*} defaultNumber
 * @returns float if its valid else return 0
 */
const getValidFloat = (inputNumber, defaultNumber) => {
  let outputNumber = undefined;

  if (!isValidFloat(defaultNumber)) {
    defaultNumber = 0;
  }

  if (isValidFloat(inputNumber)) {
    outputNumber = parseFloat(inputNumber);
  } else {
    outputNumber = parseFloat(defaultNumber);
  }

  return outputNumber;
};

/**
 * Function to return input if its valid Boolean else return false
 * @param {*} input
 * @param {*} defaultBoolean
 * @returns true if input is valid else false
 */
const getValidBoolean = (input, defaultBoolean) => {
  if (getType(input) == '[object Boolean]') {
    return input;
  } else if (!isEmpty(input) && input.toString().toLowerCase() == 'true') {
    return true;
  } else if (!isEmpty(input) && input.toString().toLowerCase() == 'false') {
    return false;
  } else if (!isEmpty(defaultBoolean)) {
    return defaultBoolean;
  } else {
    return false;
  }
};

/**
 * Convert an array of valid MongoDB-ObjectId-string to MongoDB ObjectId
 */
const getValidObjectIds = objectIds => {
  const validObjectIds = [];
  for (let i = 0; objectIds && i < objectIds.length; i++) {
    validObjectIds.push(getValidObjectId(objectIds[i]));
  }

  return validObjectIds;
};

/**
 * Convert valid MongoDB-ObjectId-string to MongoDB ObjectId
 */
const getValidObjectId = objectId => {
  if (!isEmpty(objectId) && ObjectId.isValid(objectId.toString())) {
    return new ObjectId(objectId.toString());
  } else {
    throw MESSAGES.MONGO_DB_INVALID_ID;
  }
};

/**
 * Function to return session Id from difference of id and ctime
 * @param {*} id
 * @param {*} ctime
 * @returns Session Id if valid else return error
 */
const getSessionId = (id, ctime) => {
  if (!isEmpty(id) && ObjectId.isValid(id.toString())) {
    return id.toString() + ctime.toString();
  } else {
    throw MESSAGES.INVALID_SESSION_ID;
  }
};

const isMongooseError = err => err instanceof mongoose.Error;

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

/**
 * Function to get the current date in YYYY-MM-DD HH-MM format
 * @returns
 */
const getDateString = () => {
  const date = new Date();

  return (
    date.getFullYear() +
    '_' +
    (date.getMonth() + 1) +
    '_' +
    date.getDate() +
    '-' +
    date.getHours() +
    '_' +
    date.getMinutes()
  );
};

/**
 * Function compare date
 * If date1 > date2 return true or false
 * @returns boolean
 */
const compareDate = (date1, date2) => {
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);
  return dateObj1 > dateObj2 ? true : false;
};

/**
 * Function to check if number is negative or not
 * @param {*} value
 * @returns true if number is negative else false
 */
const checkNegativeNumber = value => {
  const negativeValue = value;
  return negativeValue > 0 || negativeValue == 0 ? true : false;
};

const getErrResData = err => {
  let success, error;
  if (isObject(err)) {
    success = {};
    success.message = err.error;
    success.data = { inLimit: err.inLimit };
  } else {
    error = {};
    error.message = err;
  }
  return { success, error };
};

/**
 * Function to compare two float numbers for greater
 * @param {*} data1
 * @param {*} data2
 * @returns true if data1 is greater than data2 else false
 */
const compareValue = (data1, data2) => {
  return parseFloat(data1) > parseFloat(data2) ? true : false;
};

/**
 * Function to check whether given value is within the tenure range
 * @param {*} value
 * @returns true if value is within the tenure range else false
 */
const checkTenureValidity = value => {
  return parseInt(value) === 60 ||
    parseInt(value) === 90 ||
    parseInt(value) === 120
    ? true
    : false;
};

/**
 * Function to check whether given value is duplicate or not within range
 * @param {*} value
 * @param {*} data
 * @returns true if value is duplicate else false
 */
const checkDuplicateValueInRange = (value, data) => {
  let c = 0;
  for (let i = 0; i < data.length; i++) {
    if (parseInt(value) == parseInt(data[i].apy_month)) {
      c = c + 1;
    }
  }
  return c < 2 ? true : false;
};

/**
 * Function to check whether given value is true or false
 * @param {*} value
 * @returns true if value is true else false
 */
const checkTrue = value => {
  if (value === true) {
    return true;
  } else {
    return false;
  }
};

/**
 * Function to compare two numbers for greater than or less than
 * @param {*} data1
 * @param {*} data2
 * @returns true is data 1 is greater than data 2 else false
 */
const compareTenure = (data1, data2) => {
  return parseInt(data1) >= parseInt(data2) ? false : true;
};

/**
 * Function to return the string with first letter in capital
 * @param {*} str
 * @returns string with first letter in capital
 */
const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Check if the word is a valid string
 * @param {string} word
 * @returns {boolean}
 */
const isValidString = word => {
  let isValid = false;
  if (isNotEmpty(word) && typeof word === 'string') {
    isValid = true;
  }

  return isValid;
};

/**
 * Function to check whether array is empty or not
 * @param {*} element
 * @returns boolean
 */
const isEmptyArray = element => {
  if (getType(element) === '[object Array]') {
    return true;
  }

  return false;
};
export const helpers = {
  buildResponse,
  successResponseHandler,
  errorResponseHandler,
  getType,
  isEmpty,
  isNotEmpty,
  isArray,
  isObject,
  isArrayOfStrings,
  isValidEmail,
  isValidLoginId,
  isValidInteger,
  isValidString,
  isValidFloat,
  isValidWholeNumber,
  getInsertedIds,
  isValidName,
  isValidObjectId,
  getValidInteger,
  getValidFloat,
  getValidBoolean,
  getValidObjectIds,
  getValidObjectId,
  getSessionId,
  isMongooseError,
  sleep,
  getDateString,
  compareDate,
  checkNegativeNumber,
  getErrResData,
  compareValue,
  checkTenureValidity,
  checkDuplicateValueInRange,
  checkTrue,
  compareTenure,
  capitalize,
  isUpdated,
  isEmptyArray,
};
