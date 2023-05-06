import axios from "axios";

const orderApi = {
  create: (body) => axios.post("http://localhost:1337/api/orders", body),
};

export default orderApi;
