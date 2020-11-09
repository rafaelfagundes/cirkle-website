import { useMediaQuery } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import React, { LegacyRef, useEffect, useState } from "react";
import theme from "../../theme/theme";
import Badge, { BadgePosition } from "../Badge";
import Icon from "../Icon";
import { IconHolder } from "./styles";

type BagProps = {
  counter: number;
  setIsOpen: (value: boolean) => void;
};

// eslint-disable-next-line react/display-name
const Bag = React.forwardRef(
  (props: BagProps, ref: LegacyRef<HTMLDivElement>) => {
    const controls = useAnimation();
    const [prevCounter, setprevCounter] = useState(0);
    const isSmartPhone = useMediaQuery(theme.breakpoints.down("sm"));

    const bagAnimation = async () => {
      const speed = 0.3; // lower is faster

      await controls.start({
        scale: 2,
        transition: { duration: speed },
      });
      controls.start({
        scale: 1,
        transition: { duration: speed },
      });
    };

    useEffect(() => {
      setprevCounter(props.counter);
      if (props.counter > prevCounter) {
        bagAnimation();
      }
    }, [props.counter]);

    return (
      <div ref={ref} style={{ cursor: "pointer" }}>
        <motion.div animate={controls}>
          <IconHolder
            onClick={isSmartPhone ? () => props.setIsOpen(true) : null}
            onMouseOver={isSmartPhone ? null : () => props.setIsOpen(true)}
          >
            <Icon type="shopping-bag" onClick={() => null}></Icon>
            {/* {props.counter > 0 && <IconCounter>{props.counter}</IconCounter>} */}
            {props.counter > 0 && (
              <Badge position={BadgePosition.TOP_RIGHT}>
                {props.counter.toString()}
              </Badge>
            )}
          </IconHolder>
        </motion.div>
      </div>
    );
  }
);

export default Bag;
