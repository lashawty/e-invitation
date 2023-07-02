import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';

const Video = () => {
  const windowWidth = useWindowSize();
  const videoSrc :string = Number(windowWidth) > 992 ? './video/bg-pc.MP4' : './video/bg.MOV'
  
  return (
    <VideoContainer>
      <VideoTag src={videoSrc} muted autoPlay loop={true} />
    </VideoContainer>
  )
};

export default Video;

const VideoTag = styled.video`
  width: 100%;
`

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &:after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
  }
`;
