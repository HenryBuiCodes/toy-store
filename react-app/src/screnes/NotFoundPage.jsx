import { Box } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      className="mt-16 flex justify-center items-center "
      style={{ height: "calc(100vh - 64px - 322.72px)" }}
    >
      <Box className="text-3xl ">
        <h1 className="flex justify-center items-center mb-5">
          <span className=" text-6xl text-red-400">404</span> NOT FOUND
        </h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
