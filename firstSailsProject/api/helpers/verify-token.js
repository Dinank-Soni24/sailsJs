const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Verify token',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true
    },
    secret: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    invalid: {
      description: 'The provided token is invalid or malformed.',
      error: ''
    },

    expired: {
      description: 'Token is not verify'
    }

  },


  fn: async function (inputs, exits) {

    try {
      const { token, secret } = inputs;
      const decode = await jwt.verify(token, secret);
      console.log(decode);
      return exits.success(decode);

    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // console.log(error);
        // console.log(exits.expired({error: error, message: "hellofkif"}));
        return exits.expired({error: error, message: "hellofkif"});
      } else {
        return exits.invalid(error);
      }
    }
  }
};



