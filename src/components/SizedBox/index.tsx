import PropTypes from "prop-types";
import React from "react";

function SizedBox({
  width = 0,
  height = 0,
}: {
  width?: number;
  height?: number;
}): JSX.Element {
  return <div style={{ width, height, userSelect: "none" }}></div>;
}

SizedBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default SizedBox;
