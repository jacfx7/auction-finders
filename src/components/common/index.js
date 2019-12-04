import React from "react";

const ItemCount = ({ data }) => {
  var itemArr = [];
  for (var key in data) {
    itemArr.push(data[key]);
  }

  return <div>{itemArr.length}</div>;
};

export { ItemCount };
