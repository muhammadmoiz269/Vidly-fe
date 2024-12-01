import React, { useEffect, useState } from "react";
import { filterProd, getAllProducts, searcProducts } from "../../../../api";
import CardBox from "../../../common/CardBox";
import { Col, Empty, Row } from "antd";
import SearchBar from "../../../common/SearchBar";
import Chips from "../../../common/Chips";
import RatingFilter from "../../../common/RatingFilter";

const tagsData = ["Sports", "Education", "Clothing", "Technology", "Decor"];
const filterList = [
  {
    name: "Any",
    value: 0,
  },
  {
    name: "1+",
    value: 1,
  },
  {
    name: "2+",
    value: 2,
  },
  {
    name: "3+",
    value: 3,
  },
  {
    name: "4+",
    value: 4,
  },
];

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleRatingFilter = async (e) => {
    console.log("radio checked", e.target.value);
    setRatingFilter(e.target.value);

    const resp = await filterProd(e.target.value);
    console.log("resp", resp);
    setProducts(resp.data);
  };

  const handleChange = async (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);

    console.log("tag", tag);
    console.log("nextSelectedTags", nextSelectedTags);

    if (nextSelectedTags?.length > 0) {
      const payload = {
        name: "",
        category: nextSelectedTags,
        range: 0,
        limit: 10,
        page: 1,
      };
      const resp = await searcProducts(payload);
      console.log("search prod", resp);
      setProducts(resp.data);
    } else {
      setProducts(temp);
    }
  };

  const getProducts = async () => {
    const response = await getAllProducts();
    console.log("response", response);
    setProducts(response.data);
    setTemp(response.data);
  };

  const onSearch = async (value, _e, info) => {
    console.log(info?.source, value);

    if (value) {
      const payload = {
        name: value,
        category: "",
        range: 0,
        limit: 10,
        page: 1,
      };
      const resp = await searcProducts(payload);
      console.log("search prod", resp);
      setProducts(resp.data);
    } else {
      setProducts(temp);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log("IN PROD", products);
  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <SearchBar
          onSearch={onSearch}
          placeholder="Search products.."
          style={{ width: "300px", marginBottom: "20px" }}
        />

        <div>
          <RatingFilter
            handleRatingFilter={handleRatingFilter}
            ratingFilter={ratingFilter}
            filterList={filterList}
          />
          <Chips
            tagsData={tagsData}
            handleChange={handleChange}
            selectedTags={selectedTags}
          />
        </div>
      </div>
      <Row gutter={[8, 8]} style={{ marginTop: "20px" }}>
        {products?.length > 0 ? (
          products?.map((item) => (
            <Col lg={8} md={12} sm={24}>
              <CardBox item={item} />
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>
    </div>
  );
};

export default ProductListing;
