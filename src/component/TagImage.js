import React from "react";

const TagImage = ({ image, changeBackground }) => (
  <div className="image" onClick={() => changeBackground(image)}></div>
);

export default TagImage;
