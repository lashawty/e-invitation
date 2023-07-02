import styled from 'styled-components';

const IFrame = () => {
  
  return (
    <FrameContainer>
      <iframe style={{'borderRadius' : '12px'}} src="https://open.spotify.com/embed/playlist/54uOtZDnvHdrrtkrGKW8eT?utm_source=generator" width="100%" height="352"  allowFullScreen={false} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
    </FrameContainer>
  )
};

export default IFrame;

const FrameContainer = styled.div`
  width: 100%;
  height: 100%;
`