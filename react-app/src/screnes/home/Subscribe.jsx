import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import subscribeApi from "../../api/subscribe";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const createSubscription = async () => {
    await subscribeApi
      .create(email)
      .then(() => {
        setEmail("");
        setSuccess(true);
      })
      .catch(() => setError(true));
  };

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      {success && (
        <SuccessAlert
          wrapClassName="flex justify-center items-center mt-4"
          successMessage="Success subscribe to toystore. Thanks for your interest in our product"
          width=" w-4/5"
        />
      )}
      {error && (
        <ErrorAlert
          wrapClassName="flex justify-center items-center mt-4"
          errorMessage="Something went wrong please try again or contact us for support"
          width=" w-4/5"
        />
      )}

      <Box
        className=" my-4 mx-auto grid grid-cols-12 w-4/5 border rounded-md"
        backgroundColor="#F2F2F2"
      >
        <InputBase
          className=" flex-1 h-full col-span-9 ml-2"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider className=" col-span-1 mx-1" orientation="vertical" />
        <button
          className=" cursor-pointer hover:bg-black hover:text-white  col-span-2 py-4 border-0 rounded-r-md"
          style={{ paddingY: "20px", paddingX: "12px" }}
          onClick={() => createSubscription()}
        >
          Subscribe
        </button>
      </Box>
    </Box>
  );
};

export default Subscribe;
