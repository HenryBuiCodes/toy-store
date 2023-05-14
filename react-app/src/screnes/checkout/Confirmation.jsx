import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Box
        className="mt-16 flex justify-center items-center "
        style={{ height: "calc(100vh - 64px - 372.72px)" }}
      >
        <Box className="text-3xl ">
          <h1 className="flex justify-center items-center mb-5 gap-10 text-green-400">
            <CheckCircleOutlineOutlined fontSize="large" color="#2e7d32" />
            SUCCESS
          </h1>
          <p className="text-center text-2xl">
            You have successfully made an Order —{" "}
            <strong>Congrats on Making your Purchase</strong>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Confirmation;
