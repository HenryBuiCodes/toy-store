import axios from "axios";

const subscribeApi = {
  create: (customerEmail) =>
    axios.post("http://localhost:1337/api/subscriptions", { customerEmail }),
};

export default subscribeApi;
