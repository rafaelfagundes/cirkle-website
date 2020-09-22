import React, { useEffect } from "react";

function Sell(): JSX.Element {
  // Scroll to top when page is loaded
  // Scroll to top when page is loaded
  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
  }, []);

  return <p>Sell</p>;
}

export default Sell;
