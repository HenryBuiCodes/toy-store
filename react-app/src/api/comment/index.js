import axios from "axios";

const CommentApi = {
  index: (productId) => {
    let productFilter = productId
      ? `?filters[productId][$eq]=${productId}`
      : "";
    return axios.get(`http://localhost:1337/api/comments${productFilter}`);
  },

  create: (comment = "", productId, userID) => {
    return axios.post(`http://localhost:1337/api/comments`, {
      data: {
        productComment: comment,
        productId,
        userId: userID,
      },
    });
  },
};

export default CommentApi;
