const defaultConfig = require('./config.json')
const config = {
    FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID || defaultConfig.FACEBOOK_APP_ID,
    API: process.env.REACT_APP_API || defaultConfig.API,
    WS: process.env.REACT_APP_WS || defaultConfig.WS
}

export default config