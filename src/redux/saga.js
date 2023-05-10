import { takeEvery, put } from "redux-saga/effects";
import { CATEGORY_LIST, PRODUCT_LIST, SET_CATEGORY_LIST } from "./constants";

function* getCategoryList() {
  let data = yield fetch("https://dummyjson.com/products/categories");
  data = yield data.json();
  console.log(data,"data in saga")
  yield put({ type: SET_CATEGORY_LIST, data });
}

function* getProductList(categoryData) {
  let data = yield fetch(
    `https://dummyjson.com/products/category/${categoryData.query}`
  );
  data = yield data.json();

  console.log(data, "getProductList in saga");

  yield put({ type: SET_CATEGORY_LIST, data });
}

function* productSaga() {
  yield takeEvery(CATEGORY_LIST, getCategoryList);
  yield takeEvery(PRODUCT_LIST, getProductList);
}

export default productSaga;
