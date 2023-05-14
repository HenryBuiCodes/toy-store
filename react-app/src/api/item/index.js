import axios from "axios";

const ItemApi = {
  index: ({
    page = 1,
    pageSize = 8,
    status = "all",
    search = "",
    sort = "desc",
    category_id = -1,
  }) => {
    let categoryFilter =
      status === "all" ? "" : `&filters[category][$eq]=${status}`;
    let searchFilter =
      search === "" ? "" : `&filters[name][$contains]=${search}`;
    let categoryFilterById =
      category_id !== -1
        ? `&filters[category_table][id]=${category_id}`
        : "";
    let sortFilter = `&sort[0]=price:${sort}`;

    return axios.get(
      `http://localhost:1337/api/items?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}${categoryFilter}${searchFilter}${sortFilter}${categoryFilterById}`
    );
  },
};

export default ItemApi;
