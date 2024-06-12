const axios = require("axios");
const serviceUrl = "";
module.exports = class subscriberServiceClass {
  async searchAll() {
    try {
      return axios({
        method: "get",
        url: `${serviceUrl}`,
      }).then(
        (result) => {
          return {
            httpResponseCode: 200,
            apiMessage: "ok",
            payload: result.data,
          };
        },
        (error) => {
          return { httpResponseCode: 500, message: error.message };
        }
      );
    } catch (err) {
      return { httpResponseCode: 500, message: err.message };
    }
  }
};
