import { Box } from "@mui/material";

const ErrorAlert = ({
  errorMessage,
  border = "border rounded-md",
  padding = "p-3",
  width = "w-full",
  backgroundColor = "bg-red-300",
  textColor = "text-white",
  fontSize = " text-sm",
  flex = "flex justify-center items-center",
  className = ` ${flex} ${padding} ${width} ${backgroundColor} ${textColor} ${fontSize} ${border}`,
  wrapClassName = "flex justify-center items-center",
}) => (
  <Box className={wrapClassName}>
    <Box className={className}>
      <p>{errorMessage}</p>
    </Box>
  </Box>
);

export default ErrorAlert;
