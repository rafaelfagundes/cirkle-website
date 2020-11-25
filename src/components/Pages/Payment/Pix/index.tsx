import React from "react";
import Colors from "../../../../enums/Colors";
import SizedBox from "../../../Atoms/SizedBox";
import Subtitle from "../../../Atoms/Subtitle";

function Pix(): JSX.Element {
  return (
    <div>
      <Subtitle color={Colors.SECONDARY}>PAGAR VIA PIX</Subtitle>
      <SizedBox height={20}></SizedBox>
    </div>
  );
}

export default Pix;
