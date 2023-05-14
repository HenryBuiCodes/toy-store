import axios from "axios";

const Category = {
  index: () => {
    return axios.get(`http://localhost:1337/api/categories`);
  },
};

export default Category;
