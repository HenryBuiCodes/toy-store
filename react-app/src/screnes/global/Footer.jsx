import { useTheme } from "@emotion/react";
import { Box, Typography, Modal } from "@mui/material";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  const navigate = useNavigate();
  const [conditionTerms, setConditionTerms] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  return (
    <>
      <Box padding="40px 0" backgroundColor={neutral.light}>
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap="30px"
          columnGap="clamp(20px, 30px, 40px)"
        >
          <Box width="clamp(20%, 30%, 40%)">
            <Typography
              variant="h4"
              fontWeight="bold"
              mb="30px"
              color={shades.secondary[500]}
            >
              Toy World
            </Typography>
            <div className="text-sm text-gray-900">
              Welcome to our toy store, where imagination and play come
              together! We're excited to offer you a wide selection of toys,
              games, and playthings that will delight children of all ages. From
              classic wooden toys and puzzles to the latest tech gadgets and
              electronic games, we've got something for every child and every
              budget.
            </div>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight="bold" mb="30px">
              About Us
            </Typography>

            <Box
              className=" cursor-pointer"
              onClick={() => setConditionTerms(true)}
            >
              <Typography mb="30px">Terms & Conditions</Typography>
            </Box>
            <Box
              className=" cursor-pointer"
              onClick={() => setPrivacyPolicy(true)}
            >
              <Typography mb="30px">Privacy & Policy</Typography>
            </Box>
          </Box>

          <Box width="clamp(20%, 25%, 30%)">
            <Typography variant="h4" fontWeight="bold" mb="30px">
              Contact Us
            </Typography>
            <Typography mb="30px">
              Address: 50 north Whatever Blvd, Washington, DC 10501
            </Typography>
            <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
              Hotline: 0868186013
            </Typography>

            <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
              Email: toystar@gmail.com
            </Typography>
          </Box>
        </Box>
      </Box>
      <Modal
        open={privacyPolicy}
        onClose={() => setPrivacyPolicy(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className=" absolute top-1/2 left-1/2 bg-white border-2 rounded-md p-5"
          style={{
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <p className="text-lg text-gray-900 uppercase">Privacy & Policy</p>
          <Box className=" border-2 rounded-md p-2 mt-5">
            <p className="text-lg text-gray-900">Information we collect:</p>
            <p className="text-sm text-gray-500  p-2">
              We may collect personal information such as your name, email
              address, shipping address, billing address, phone number, and
              payment information when you make a purchase on our website.
            </p>
            <p className="text-lg text-gray-900">How we use the information:</p>
            <p className="text-sm text-gray-500  p-2">
              We use the information to fulfill orders, process payments, and
              communicate with you about your order. We may also use your
              information to send you promotional emails and newsletters, but
              you can opt-out at any time.
            </p>
            <p className="text-lg text-gray-900">Security:</p>

            <p className="text-sm text-gray-500  p-2">
              We take the security of your personal information seriously. We
              use industry-standard security measures to protect your data,
              including SSL encryption for online transactions.
            </p>
            <p className="text-lg text-gray-900">Third-party services:</p>

            <p className="text-sm text-gray-500  p-2">
              We may use third-party services such as shipping carriers and
              payment processors to fulfill orders. These services may have
              access to your personal information, but we only share what is
              necessary to complete the transaction.
            </p>
            <p className="text-lg text-gray-900">Changes to the policy:</p>

            <p className="text-sm text-gray-500  p-2">
              We may update our privacy policy from time to time. Any changes
              will be posted on our website.
            </p>
          </Box>
          <Box className="flex gap-2 justify-end items-center mt-5">
            <button
              className="p-2 text-sm border-2 rounded-md border-red-100 text-red-400"
              onClick={() => setPrivacyPolicy(false)}
            >
              Close
            </button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={conditionTerms}
        onClose={() => setConditionTerms(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className=" absolute top-1/2 left-1/2 bg-white border-2 rounded-md p-5"
          style={{
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <p className="text-lg text-gray-900 uppercase">Term & Condition</p>
          <Box className=" border-2 rounded-md p-2 mt-5">
            <p className="text-sm text-gray-900  p-2">
              1. Products and Pricing: We strive to offer accurate product
              descriptions and pricing, but errors may occur. In the event of a
              pricing error, we reserve the right to cancel any orders placed
              for that item at the incorrect price.
            </p>
            <p className="text-sm text-gray-900  p-2">
              2. Shipping and Delivery: We make every effort to ensure that your
              order is shipped promptly and arrives in good condition. However,
              we cannot be held responsible for shipping delays or damage that
              occurs during shipping.
            </p>
            <p className="text-sm text-gray-900  p-2">
              3. Returns and Refunds: If you are not satisfied with your
              purchase, you may return it within 30 days for a refund or
              exchange. The item must be in new condition and in its original
              packaging.
            </p>
            <p className="text-sm text-gray-900  p-2">
              4. Privacy and Security: We take your privacy and security
              seriously. We use industry-standard security measures to protect
              your personal information and we do not share your information
              with third parties.
            </p>
            <p className="text-sm text-gray-900  p-2">
              5. Intellectual Property: All content on our website, including
              images, text, and logos, is the property of Toy World and is
              protected by copyright and trademark laws.
            </p>
          </Box>
          <Box className="flex gap-2 justify-end items-center mt-5">
            <button
              className="p-2 text-sm border-2 rounded-md border-red-100 text-red-400"
              onClick={() => setConditionTerms(false)}
            >
              Close
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Footer;
