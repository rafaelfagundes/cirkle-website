import React from "react";
import Paragraph from "../src/components/Paragraph";
import SizedBox from "../src/components/SizedBox";
import StaticPage from "../src/components/StaticPage";
import Title from "../src/components/Title";

function Devolucao(): JSX.Element {
  return (
    <StaticPage title="devolução" image="images/return.jpg">
      <SizedBox height={40}></SizedBox>
      <Title>Duis vitae convallis sem</Title>
      <SizedBox height={20}></SizedBox>
      <Paragraph>
        Etiam neque turpis, feugiat sit amet lectus vehicula, suscipit sagittis
        eros. Sed aliquam id magna sed aliquet. Quisque nisl ligula, blandit vel
        tempus eget, hendrerit ac nulla. Quisque pharetra aliquet sem id varius.
        Donec non magna augue. Vestibulum lacus sem, pretium vehicula orci a,
        facilisis hendrerit augue. Proin vel ipsum ornare, hendrerit tellus in,
        eleifend nunc. Morbi non tellus sapien.
      </Paragraph>
      <Paragraph>
        In at magna nec eros semper porta. Aliquam euismod mollis odio et
        faucibus. Donec et feugiat sem. Vestibulum id eros dolor. Vivamus
        scelerisque gravida sagittis. Nam et efficitur erat, sed elementum
        risus. Duis mattis convallis maximus. Ut in hendrerit libero. Integer id
        vehicula lorem, nec mattis sem. In efficitur consectetur finibus. In
        quis nunc eget augue sollicitudin venenatis ultrices vitae lacus.
        Phasellus hendrerit lectus arcu, a bibendum sem pulvinar convallis. Sed
        semper fermentum urna in euismod. Sed dictum ex sed magna dictum
        pharetra. Integer nec augue justo. Curabitur vitae lorem auctor,
        ultrices nibh vel, efficitur elit.
      </Paragraph>
      <Paragraph>
        Suspendisse potenti. Fusce lacinia, neque ac blandit lobortis, arcu
        sapien blandit nisl, et suscipit turpis velit ultrices mauris. Praesent
        facilisis at turpis at dapibus. Nulla eget vestibulum purus. Duis vitae
        convallis sem. Suspendisse tincidunt ex vel sem faucibus, vitae
        pellentesque mauris congue. Proin facilisis enim vitae vehicula
        molestie. Sed diam mauris, tempor vel laoreet vitae, posuere non lectus.
        Mauris finibus mauris venenatis arcu vulputate, eget placerat nunc
        dapibus.
      </Paragraph>
      <Paragraph>
        Integer eu velit mattis, gravida tellus ut, ultrices nulla. Mauris
        egestas felis id odio elementum, at venenatis leo consectetur. Quisque
        dolor orci, vehicula at euismod et, laoreet non risus. Curabitur
        pellentesque non erat eu bibendum. Quisque ligula ex, gravida sed mollis
        at, mollis sed quam. Nam laoreet nibh nunc, aliquam euismod ante finibus
        ut. Duis lacus dolor, porta at blandit ut, finibus eget ligula.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Cras tempus mattis porta. Maecenas lacinia ante ut mi
        pharetra, quis ultrices est interdum. Ut purus eros, interdum id elit
        et, rutrum fermentum libero. Praesent et neque lectus. Pellentesque sit
        amet neque ipsum.
      </Paragraph>
      <Paragraph>
        Vivamus et velit pretium, tristique magna non, aliquet massa. Sed
        euismod urna porttitor efficitur vestibulum. Integer ullamcorper ante
        sit amet hendrerit semper. Sed a libero rutrum, dapibus metus at,
        sodales magna. Mauris pretium maximus porta. Sed at lorem nec sem
        finibus elementum. Cras bibendum mauris lorem, in blandit eros tempor
        et. Vivamus a arcu nec orci hendrerit consectetur ac at neque. Ut
        elementum tincidunt mi nec ornare. Pellentesque sagittis risus sit amet
        dictum consequat.
      </Paragraph>
      <SizedBox height={20}></SizedBox>
    </StaticPage>
  );
}

export default Devolucao;
