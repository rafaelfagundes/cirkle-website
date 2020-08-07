import styled from "styled-components";

const StyledHome = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #ffff00;
`;

function Home() {
  return (
    <StyledHome>
      <Title>Cirkle</Title>
    </StyledHome>
  );
}

export default Home;
