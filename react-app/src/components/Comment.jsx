import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import SmsOutlinedButton from "@mui/icons-material/SmsOutlined";
import CommentApi from "../api/comment";
import { useNavigate } from "react-router-dom";

const Comment = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [customerId, setCustomerId] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [productComments, setProductComments] = useState();

  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = () => {
    if (comment.length > 0 && customerId) {
      CommentApi.create(comment, productId);
      setComment("");
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    console.log("productId", productId);
    CommentApi.index(productId).then((response) => {
      setProductComments(response.data);
    });
  }, []);
  console.log("productComments", productComments);

  return (
    <>
      <Box className="w-full">
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Write your thoughts here..."
          onChange={(event) => handleComment(event)}
        ></textarea>
      </Box>
      <Box className=" flex justify-end items-end w-full">
        <button
          onClick={() => handleSubmit()}
          className=" border-2 rounded-md hover:text-gray-900 px-10 py-2 bg-gray-900 text-white hover:bg-white flex gap-3 uppercase justify-end items-center"
        >
          <SmsOutlinedButton />
          Submit
        </button>
      </Box>
      <Box className="mt-5 border-t-2 border-gray-900 grid gap-5 w-full">
        <p className="text-sm text-gray-900 uppercase p-2">Customer Review</p>
        <Box className="border rounded-md w-full p-2 grid gap-2">
          {productComments?.map((item) => (
            <Box className="border rounded-md w-full ">
              <p className="text-sm text-gray-900  p-2">{item.user.username}</p>
              <pre className="text-sm text-gray-900  p-2">
                {item.productComment}
              </pre>
            </Box>
          ))}
        </Box>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          className=" absolute top-1/2 left-1/2 bg-white border-2 rounded-md p-5"
          style={{
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
          }}
        >
          <p className="text-sm text-gray-900 uppercase">Comment Rules</p>
          <Box className=" border-2 rounded-md p-2 mt-5">
            <p className="text-sm text-gray-900  p-2">
              1. You must comment to submit comment
            </p>
            <p className="text-sm text-gray-900  p-2">
              2. You have to login to submit comment
            </p>
          </Box>
          <Box className="flex gap-2 justify-end items-center mt-5">
            <button
              className="p-2 text-sm border-2 rounded-md border-red-100 text-red-400"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button
              className="p-2 text-sm border-2 rounded-md border-blue-100 text-blue-400"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default Comment;
