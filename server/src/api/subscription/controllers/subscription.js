"use strict";
const moment = require("moment/moment");
/**
 * subscription controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subscription.subscription",
  ({ strapi }) => ({
    async create(ctx) {
      const { customerEmail } = ctx.request.body;

      const newCustomerDiscount = await strapi
        .service("api::discount.discount")
        .findOne(1);

      const currentDate = moment(new Date());
      const discountDate = moment(newCustomerDiscount.createdAt);

      const discountEmailTemplate = `<!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

      <head>
        <title>
        </title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a {
            padding: 0;
          }

          body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }

          table,
          td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }

          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          p {
            display: block;
            margin: 13px 0;
          }
        </style>
        <!--[if mso]>
              <noscript>
              <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
              </xml>
              </noscript>
              <![endif]-->
        <!--[if lte mso 11]>
              <style type="text/css">
                .mj-outlook-group-fix { width:100% !important; }
              </style>
              <![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Poppins);
        </style>
        <!--<![endif]-->
        <style type="text/css">
          @media only screen and (min-width:480px) {
            .mj-column-per-100 {
              width: 100% !important;
              max-width: 100%;
            }
          }
        </style>
        <style media="screen and (min-width:480px)">
          .moz-text-html .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        </style>
        <style type="text/css">
          @media only screen and (max-width:480px) {
            table.mj-full-width-mobile {
              width: 100% !important;
            }

            td.mj-full-width-mobile {
              width: auto !important;
            }
          }
        </style>
        <style type="text/css">
          .box-shadow {
            border-radius: 24px;
            -webkit-box-shadow: 0px 3px 6px red;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0,
                0.06);
            border: 1px solid #F3F4F6;
            box-sizing: border-box;
          }

          .hyperlink {
            font-family: Poppins, Arial, sans-serif;
            font-style: normal;
            font-weight:
              normal;
            font-size: 16px;
            line-height: 26px;
            color: #873CFF;
          }

          .link-nostyle {
            color: inherit;
            text-decoration: none
          }
        </style>
      </head>

      <body style="word-spacing:normal;background-color:#FFFFFF;">
        <div style="background-color:#FFFFFF;">
          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="box-shadow-outlook" style="vertical-align:top;width:600px;" ><![endif]-->
                    <div class="mj-column-per-100 mj-outlook-group-fix box-shadow" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                            <td style="background-color:#FFFFFF;border-radius:24px;vertical-align:top;padding:20px;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Poppins, Arial, sans-serif;font-size:24px;font-style:normal;font-weight:400;line-height:28px;text-align:center;color:#000000;">Welcome to ToyStore!</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <p style="border-top:solid 1px #D9DEE8;font-size:1px;margin:0px auto;width:100%;">
                                      </p>
                                      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #D9DEE8;font-size:1px;margin:0px auto;width:510px;" role="presentation" width="510px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Poppins, Arial, sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:26px;text-align:left;color:#262626;">Hi valued customer,</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Poppins, Arial, sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:26px;text-align:left;color:#262626;">You've made a mighty choice! We are happy for your subscription.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div style="font-family:Poppins, Arial, sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:26px;text-align:left;color:#262626;">We send you a welcome 10% discount code</div>
                                  </td>
                                </tr>
                                  <tr>
                                    <td style="font-size:0px;word-break:break-word;">
                                      <div style="height:10px;line-height:10px;">&#8202;</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:100%;line-height:100%;">
                                        <tr>
                                          <td align="center" bgcolor="#873CFF" role="presentation" style="border:none;border-radius:10px;cursor:auto;font-style:normal;mso-padding-alt:10px 40px;background:#873CFF;" valign="middle">
                                            <p style="display:inline-block;background:#873CFF;color:#FFFFFF;font-family:Poppins, Arial, sans-serif;font-size:16px;font-style:normal;font-weight:600;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 40px;mso-padding-alt:0px;border-radius:10px;"> ${newCustomerDiscount.DiscountCode} </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="font-size:0px;word-break:break-word;">
                                      <div style="height:10px;line-height:10px;">&#8202;</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Poppins, Arial, sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:26px;text-align:left;color:#262626;">Please don't hestate to reach out with any feedback so we can constantly improve your experience.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:Poppins, Arial, sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:26px;text-align:left;color:#262626;">Thanks for joining our familly!</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="font-size:0px;word-break:break-word;">
                                      <div style="height:10px;line-height:10px;">&#8202;</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                        <tbody>
                          <tr>
                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                              <div style="font-family:Arial, sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:1;text-align:center;color:#6B7280;"><a class="link-nostyle" allign="centre" target="_blank" href="" style="text-decoration: none">henrybui.dev@gmail.com</a></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td></tr></table><![endif]-->
        </div>
      </body>

      </html>


      `;
      await strapi.service("api::subscription.subscription").create({
        data: {
          CustomerEmail: customerEmail,
          CustomerData: { discountId: [1] },
        },
      });
      //sent email
      await strapi
        .plugin("email")
        .service("email")
        .send({
          to: customerEmail,
          from: {
            name: process.env.SMTP_FROM_NAME,
            address: process.env.SMTP_USERNAME,
          },
          subject: "We send you your Welcome discount code",
          html: discountEmailTemplate,
        });
      return "Done create customer email";
    },
  })
);
