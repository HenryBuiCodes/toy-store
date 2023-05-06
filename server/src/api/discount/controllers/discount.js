"use strict";

/**
 * discount controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::discount.discount",
  ({ strapi }) => ({
    async create(ctx) {
      console.log(ctx);
    },
  })
);
