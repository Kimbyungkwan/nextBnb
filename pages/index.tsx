import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
  color: gray;
`;

const index: React.FC = () => {
  return (
    <Container>
      <div>hello, world!</div>
    </Container>
  );
};

export default index;
