import { DISLIKE_PRODUCT, LIKE_PRODUCT, SET_CATEGORY_LIST } from "./constants";

export const categoryData = (data = [], action) => {
  switch (action.type) {
    case LIKE_PRODUCT:
      console.log(data, "data in like product");

      console.warn("reducer LIKE_PRODUCT", action);

      return { ...data,products: [...action.data] };

    case DISLIKE_PRODUCT:
      console.warn("reducer DISLIKE_PRODUCT", action);

      return { ...data,products: [...action.data] };

    case SET_CATEGORY_LIST:
      return action.data;

    default:
      return data;
  }
};
