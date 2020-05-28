import React from "react";

function SearchFilter(props) {
  return <option value={props.id}>{props.que}</option>;
}

export default SearchFilter;
