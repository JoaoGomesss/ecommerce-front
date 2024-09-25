import styled from "styled-components";

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  .slideImages {
    width: 100%;
  }
`;

export const SwiperContent = styled.div`
  display: flex;
  height: 600px;

  @media (max-width: 768px) {
    display: flex;
    height: 100%;
  }
`;
