import Expo from "expo";
const { manifest } = Expo.Constants;
const LOCAL_BASE_URL = manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  
// server is running on heroku 
const HEROKU_BASE_URL = `https://protected-waters-18515.herokuapp.com/api/v1`;

export const BASE_URL = HEROKU_BASE_URL || LOCAL_BASE_URL;