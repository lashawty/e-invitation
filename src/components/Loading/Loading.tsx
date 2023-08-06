import styled from 'styled-components';

const Loading = () => {
  return (
    <ImgBox>
      <Image src="./image/loading.jpeg" alt="loading" />
    </ImgBox>
  )
};

export default Loading;

const ImgBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  &::before{
    content: '';
    display: block;
    padding-bottom: calc(100vw / 100vh)
  }
`

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  width: 100%;
  height: 100%;
`