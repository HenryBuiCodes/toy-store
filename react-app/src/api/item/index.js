import axios from "axios";

const ItemApi = {
  index: ({
    page = 1,
    pageSize = 8,
    status = "all",
    search = "",
    sort = "desc",
  }) => {
    let categoryFilter =
      status === "all" ? "" : `&filters[category][$eq]=${status}`;
    let searchFilter =
      search === "" ? "" : `&filters[name][$contains]=${search}`;
    let sortFilter = `&sort[0]=price:${sort}`;

    return axios.get(
      `http://localhost:1337/api/items?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}${categoryFilter}${searchFilter}${sortFilter}`
    );
  },
};

export default ItemApi;
