import Expo from "expo";
const { manifest } = Expo.Constants;

// local url
const LOCAL_BASE_URL = `http://${manifest.debuggerHost
  .split(`:`)
  .shift()
  .concat(`:3000`)}/api/v1`;

// heroku url
const HEROKU_BASE_URL = `https://protected-waters-18515.herokuapp.com/api/v1`;

export const BASE_URL = LOCAL_BASE_URL || HEROKU_BASE_URL;

// export const BASE_URL = HEROKU_BASE_URL;

// || LOCAL_BASE_URL
