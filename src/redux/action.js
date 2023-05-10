import {
  CATEGORY_LIST,
  PRODUCT_LIST,
  DISLIKE_PRODUCT,
  LIKE_PRODUCT,
} from "./constants";

export const likeProduct = (data) => {
  console.warn("action called", data);
  return {
    type: LIKE_PRODUCT,
    data,
  };
};

export const dislikeProduct = (data) => {
  console.warn("action called", data);
  return {
    type: DISLIKE_PRODUCT,
    data,
  };
};

export const categoryList = () => {
  return {
    type: CATEGORY_LIST,
  };
};

export const productList = (query) => {
  return {
    type: PRODUCT_LIST,
    query,
  };
};

