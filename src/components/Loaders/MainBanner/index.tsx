import React from "react";
import ContentLoader from "react-content-loader";
import { Colors } from "../../../theme/theme";

const MainBannerLoader = (): JSX.Element => {
  const width = window.innerWidth >= 960 ? 960 : window.innerWidth;
  const height = window.innerHeight * 0.4;

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={Colors.LIGHT_GRAY}
      foregroundColor={Colors.AMARANTH_PINK}
    >
      <rect x="0" y="0" rx="2" ry="2" width={width} height={height} />
    </ContentLoader>
  );
};

export default MainBannerLoader;
