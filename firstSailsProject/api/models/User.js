/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { Roles } = sails.config.constant;

module.exports = {

  attributes: {
    name:
    {
      type: "string",
      required: true
    },
    email:
    {
      type: "string",
      required: true,
    },
    password:
    {
      type: "string",
      required: true
    },
    roles:
    {
      type: "string",
      isIn: [Roles.Admin, Roles.User],
      defaultsTo: Roles.User
    }
  },

};

