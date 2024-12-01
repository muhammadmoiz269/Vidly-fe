import React from "react";
import RadioBox from "../RadioBox";

const RatingFilter = ({ handleRatingFilter, ratingFilter, filterList }) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <span style={{ marginRight: "20px", color: "green" }}>RatingFilter:</span>
      <RadioBox
        onChange={handleRatingFilter}
        value={ratingFilter}
        radioList={filterList}
      />
    </div>
  );
};

export default RatingFilter;
