import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryList,
  dislikeProduct,
  likeProduct,
  productList,
} from "../redux/action";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { Carousel } from "antd";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const ProductList = () => {
  const dispatch = useDispatch();
  let dataFromApi = useSelector((state) => state.categoryData);
  const { Panel } = Collapse;
  const [categoryData, setCategoryData] = useState();
  const [productData, setproductData] = useState();
  const [selectedProduct, setSelectedProduct] = useState("smartphones");

  useEffect(() => {
    dispatch(categoryList());
  }, []);

  useEffect(() => {
    dispatch(productList(selectedProduct));
  }, []);

  useEffect(() => {
    if (dataFromApi) {
      if (dataFromApi?.products) {
        setproductData(dataFromApi.products);
      } else {
        setCategoryData(dataFromApi);
      }
    }
  }, [dataFromApi]);

  const likeProductCount = (product, index, productIndex) => {
    const newImages = product.images;
    newImages[index] = {
      likeCount:
        newImages[index]?.likeCount != undefined ||
        newImages[index]?.likeCount != null
          ? newImages[index]?.likeCount + 1
          : 1,
      url: newImages[index]?.url || newImages[index],
      disLikeCount: newImages[index]?.disLikeCount || 0,
    };
    const newProduct = {
      images: [...newImages],
      ...product,
    };
    const newProductData = productData;

    newProductData[productIndex] = newProduct;
    dispatch(likeProduct(newProductData));
  };

  const disLikeProductCount = (product, index, productIndex) => {
    const newImages = product.images;
    newImages[index] = {
      disLikeCount:
        newImages[index]?.disLikeCount != undefined ||
        newImages[index]?.disLikeCount != null
          ? newImages[index]?.disLikeCount + 1
          : 1,
      url: newImages[index]?.url || newImages[index],
      likeCount: newImages[index]?.likeCount || 0,
    };
    const newProduct = {
      images: [...newImages],
      ...product,
    };
    const newProductData = productData;

    newProductData[productIndex] = newProduct;
    dispatch(dislikeProduct(newProductData));
  };
  console.log(productData?.length, "productData");
  return (
    <div className="bg-gray-200 py-4 mx-2">
      <Select
        value={selectedProduct}
        showSearch
        placeholder="Select a category"
        onChange={(e) => {
          setSelectedProduct(e);
          dispatch(productList(e));
        }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={categoryData?.map((value) => {
          return {
            value: value,
            label: value,
          };
        })}
        className="w-1/4"
      />
      <span>{productData?.length} data found for this category</span>
      {productData?.map((product, productIndex) => (
        <div className="py-4" key={product.id}>
          <div className="">
            <Collapse defaultActiveKey={["1"]}>
              <Panel header={product.title} key="1">
                <Carousel>
                  {product.images.map((item)=>{
                    // <img src={item} alt="" style={contentStyle}/>
                    <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  })}
                  {/* <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>4</h3>
                  </div> */}
                </Carousel>
                {product.images.map((image, index) => (
                  <div className="bg-white grid grid-col-4 gap4">
                    <div className="p-4">
                      <span className="mr-4">{product.brand}</span>
                      <span>{product?.length}</span>
                      <ArrowUpOutlined
                        className="text-green-500"
                        key={product.id}
                        onClick={(e) => {
                          likeProductCount(product, index, productIndex);
                        }}
                      />
                      {image?.likeCount || 0}
                      <ArrowDownOutlined
                        className="text-red-500 ml-2"
                        onClick={() =>
                          disLikeProductCount(product, index, productIndex)
                        }
                      />
                      {image?.disLikeCount || 0}
                    </div>
                    <img
                      src={image?.url || image}
                      alt=""
                      className="object-cover h-72 w-80"
                    />
                    <div className="text-xs text-gray-800 p-4">
                      {product.description}
                    </div>
                    <div className="flex flex-col p-4 bg-lime-400">
                      <span>Price: {product.price} SEK</span>
                      <span className="">{product.brand}</span>
                    </div>
                  </div>
                ))}
              </Panel>
            </Collapse>
            {/* {product.images.map((image, index) => (
              <div className="bg-white ">
                <div className="p-4">
                  <span className="mr-4">{product.brand}</span>
                  <span>{product?.length}</span>
                  <ArrowUpOutlined
                    className="text-green-500"
                    key={product.id}
                    onClick={(e) => {
                      likeProductCount(product, index, productIndex);
                    }}
                  />
                  {image?.likeCount || 0}
                  <ArrowDownOutlined
                    className="text-red-500 ml-2"
                    onClick={() =>
                      disLikeProductCount(product, index, productIndex)
                    }
                  />
                  {image?.disLikeCount || 0}
                </div>
                <img
                  src={image?.url || image}
                  alt=""
                  className="object-cover h-72 w-80"
                />
                <div className="text-xs text-gray-800 p-4">
                  {product.description}
                </div>
                <div className="flex flex-col p-4 bg-lime-400">
                  <span>Price: {product.price} SEK</span>
                  <span className="">{product.brand}</span>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
