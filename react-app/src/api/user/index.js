import axios from "axios";

const UserApi = {
  create: (customerEmail) =>
    axios.post("http://localhost:1337/api/subscriptions", { customerEmail }),
};

export default UserApi;
