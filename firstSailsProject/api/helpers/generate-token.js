const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Generate token',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    expiresIn: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    error: {
      description: 'Token is not generate'
    }

  },


  fn: async function (inputs, exists) {
    try {
      const secret = "hello"
      const { email, password ,expiresIn} = inputs;
      const token = jwt.sign({ email, password },secret, { expiresIn })
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }


};
