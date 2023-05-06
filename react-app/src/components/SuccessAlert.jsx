import { Box } from "@mui/material";

const SuccessAlert = ({
  successMessage,
  border = "rounded-md",
  padding = "py-3",
  width = "w-full",
  backgroundColor = "bg-green-300",
  textColor = "text-white",
  fontSize = " text-sm",
  flex = "flex justify-center items-center",
  className = `${flex} ${padding} ${width} ${backgroundColor} ${textColor} ${fontSize} ${border}`,
  wrapClassName = "flex justify-center items-center",
}) => {
  return (
    <Box className={wrapClassName}>
      <Box className={className}>{successMessage}</Box>
    </Box>
  );
};

export default SuccessAlert;
