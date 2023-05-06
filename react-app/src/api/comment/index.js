import axios from "axios";

const CommentApi = {
  index: (productId) => {
    let productFilter = productId
      ? `?filters[productId][$eq]=${productId}`
      : "";
    console.log("🚀 productId:", productId);
    return axios.get(`http://localhost:1337/api/comments${productFilter}`);
  },

  create: ({ comment = "", productId }) => {
    return axios.post(`http://localhost:1337/api/comments`, {
      data: {
        productComment: comment,
        productId,
        userId: 2,
      },
    });
  },
};

export default CommentApi;
