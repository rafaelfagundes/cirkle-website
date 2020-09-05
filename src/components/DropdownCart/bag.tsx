import { useMediaQuery, useTheme } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import React, { LegacyRef, useEffect, useState } from "react";
import Icon from "../Icon";
import { IconCounter, IconHolder } from "./styles";

type BagProps = {
  counter: number;
  setIsOpen: (value: boolean) => void;
};

// eslint-disable-next-line react/display-name
const Bag = React.forwardRef(
  (props: BagProps, ref: LegacyRef<HTMLDivElement>) => {
    const controls = useAnimation();
    const theme = useTheme();
    const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));
    const [prevCounter, setprevCounter] = useState(0);

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
            onClick={() => props.setIsOpen(true)}
            // onMouseOver={isSmartphone ? null : () => props.setIsOpen(true)}
          >
            <Icon type={props.counter > 0 ? "bag-full" : "bag"}></Icon>
            {props.counter > 0 && <IconCounter>{props.counter}</IconCounter>}
          </IconHolder>
        </motion.div>
      </div>
    );
  }
);

// function Bag({
//   counter,
//   setIsOpen,
//   ref,
// }: {
//   counter: number;
//   setIsOpen: (value: boolean) => void;yar
// }): JSX.Element {
//   const theme = useTheme();
//   const isSmartphone = useMediaQuery(theme.breakpoints.down("xs"));
//   const props = useSpring({});

//   return (
//     <animated.div style={props} ref={ref}>
//       <IconHolder
//         onClick={() => setIsOpen(true)}
//         onMouseOver={isSmartphone ? null : () => setIsOpen(true)}
//       >
//         <Icon type={counter > 0 ? "bag-full" : "bag"}></Icon>
//         {counter > 0 && <IconCounter>{counter}</IconCounter>}
//       </IconHolder>
//     </animated.div>
//   );
// }

export default Bag;
