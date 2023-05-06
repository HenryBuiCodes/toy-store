"use strict";

/**
 * comment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::comment.comment", ({ strapi }) => ({
  async find(ctx) {
    const match = ctx.request.url.match(/productId\]\[\$\eq]=(\d+)/);

    const productId = match[1];

    const { results, pagination } = await strapi
      .service("api::comment.comment")
      .find({ filters: { productId: productId } });
    const data = await Promise.all(
      results.map(async (result) => {
        const userInformation = await strapi.db
          .query("plugin::users-permissions.user")
          .findOne({
            where: { id: result.userId },
          });

        return {
          id: result.id,
          productComment: result.productComment,
          productId: result.productId,
          user: {
            userId: userInformation.id,
            email: userInformation.email,
            username: userInformation.username,
          },
        };
      })
    );

    return data;
  },
}));
