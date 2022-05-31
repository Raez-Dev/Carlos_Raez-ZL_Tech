import styled from "styled-components";

export const Container = styled.div`
  display: "flex";
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
`;

export const ButtonIcon = styled.div`
  margin-right: 20px;
`;

export const ButtonOptions = styled.button`
  background-color: white;
  height: 50px;
  font-size: 16px;
  width: 240px;
  margin-right: 10px;
`;

export const VideoContainer = styled.div`
  display: flex;
  position: relative;
  height: 50vh;
  width: 100vw;
  background-color: gray;
`;

export const VideoCounter = styled.p`
  background: white;
  opacity: 0.5px;
  height: 40px;
  width: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`;

export const Video = styled.video`
  height: 50vh;
  width: 100vw;
  filter: ${(props) =>
    props.grayScaleAble
      ? "grayscale(100%)"
      : props.blurAble
      ? "blur(5px)"
      : ""};
`;
