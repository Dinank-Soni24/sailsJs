const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Verify token',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true,
    },
    secret: {
      type: 'string',
      required: true,
    },


    exits: {

      success: {
        description: 'All done.',
      },

    },


    fn: async function ({ token, secret }) {
      // TODO
      try {
        const decode = await jwt.verify(token, secret);
        return decode;
      } catch (error) {
        throw {
          error: "token is not verify"
        }

      }
    }


  }
};
