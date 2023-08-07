import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';
import {useRef, useEffect, useState} from 'react';



const Video = () => {
  const windowWidth = useWindowSize();
  const videoSrc = Number(windowWidth) > 992 ? './video/bg-pc.MP4' : './video/bg.MOV';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    if(isVideoReady) return;
    videoRef?.current?.addEventListener('loadeddata', () => {
      setIsVideoReady(true)
    });
  }, [])

  return (
      <>
        {/*@ts-ignore*/}
        <VideoBox>
          <VideoTag ref={videoRef} src={videoSrc} muted autoPlay playsInline={true} loop={true} preload="auto" />
        </VideoBox>
      </>
  )
};

export default Video;



const VideoTag = styled.video`
  width: 100%;
`

const VideoBox = styled.div`
  position: relative;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: rgba(0, 0, 0, .5);
  }
`