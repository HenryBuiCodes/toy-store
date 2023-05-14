"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const {
      products,
      userName,
      email,
      discountCode,
      billingAddress,
      shippingAddress,
      customerEmail,
      customerPhoneNumber,
      paymentMethod,
    } = ctx.request.body;

    const discountData = await strapi.db
      .query("api::discount.discount")
      .findOne({
        select: [
          "discount_code",
          "discount_percentage",
          "valid_time",
          "created_at",
        ],
        where: { discount_code: discountCode },
      });
    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          let discountPrice;
          if (discountData) {
            const currentTime = new Date();
            const createdAt = new Date(discountData.created_at);
            const differenceInDays = Math.floor(
              (currentTime - createdAt) / (1000 * 60 * 60 * 24)
            ); // calculate difference in days

            if (differenceInDays <= discountData.ValidTime) {
              // Discount code is still valid
              discountPrice =
                (item.price * discountData.DiscountPercentage) / 100;
            } else {
              // Discount code has expired
              discountPrice = 0;
            }
          } else {
            discountPrice = 0;
          }

          const productPrice = (item.price - Math.ceil(discountPrice)) * 100;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: productPrice,
            },
            quantity: product.count,
          };
        })
      );

      let session;
      let order;
      if (paymentMethod === "payment_card") {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: email,
          mode: "payment",
          success_url: "http://localhost:3000/checkout/success",
          cancel_url: "http://localhost:3000",
          line_items: lineItems,
        });

        const orderProduct = {
          product_information: products,
        };

        // create the item
        order = await strapi.service("api::order.order").create({
          data: {
            userName,
            products: orderProduct,
            stripeSessionId: session.id,
            PaymentMethod:
              paymentMethod === "payment_pending"
                ? "Pay on delivery"
                : "Pay with card",
          },
        });
      }
      if (paymentMethod === "payment_pending") {
        const orderProduct = {
          product_information: products,
        };

        // create the item
        order = await strapi.service("api::order.order").create({
          data: {
            userName,
            products: orderProduct,
            PaymentMethod:
              paymentMethod === "payment_pending"
                ? "Pay on delivery"
                : "Pay with card",
          },
        });
      }
      // create a stripe session
      const orderInformationsItemsID = products.map((product) => {
        return product.id;
      });
      const orderInformationsBillingAddress = [
        billingAddress.street1,
        billingAddress.street2,
        billingAddress.city,
        billingAddress.state,
        billingAddress.zipCode,
        billingAddress.country,
      ].join(" ");
      const orderInformationsShippingAddress = [
        shippingAddress.street1,
        shippingAddress.street2,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.zipCode,
        shippingAddress.country,
      ].join(" ");

      let discountPercentage;
      if (discountData) {
        const currentTime = new Date();
        const createdAt = new Date(discountData.created_at);
        const differenceInDays = Math.floor(
          (currentTime - createdAt) / (1000 * 60 * 60 * 24)
        ); // calculate difference in days

        discountPercentage =
          differenceInDays <= discountData.ValidTime
            ? discountData.DiscountPercentage
            : 0;
      }

      const totalPrice =
        (lineItems
          .map((lineItem) => {
            return (lineItem.price_data.unit_amount / 100) * lineItem.quantity;
          })
          .reduce((acc, cur) => acc + cur, 0) *
          (100 - (discountPercentage | 0))) /
        100;

      await strapi.service("api::order-information.order-information").create({
        data: {
          order: order.id,
          ShippingAddress: orderInformationsShippingAddress,
          BillingAddress: orderInformationsBillingAddress,
          items: orderInformationsItemsID,
          TotalPrice: Number(Math.ceil(totalPrice)),
          CustomerEmail: customerEmail,
          CustomerPhoneNumber: customerPhoneNumber,
        },
      });

      const returnValue =
        paymentMethod === "payment_card" ? { id: session.id } : "done";
      // return the session id
      return returnValue;
    } catch (error) {
      ctx.response.status = 500;
      console.log(error);
      return error;
    }
  },
}));
