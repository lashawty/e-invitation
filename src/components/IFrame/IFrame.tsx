import styled from 'styled-components';

const IFrame = () => {
  
  return (
    <FrameContainer>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/gKTpmhgbJ_s" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
    </FrameContainer>
  )
};

export default IFrame;

const FrameContainer = styled.div`
  width: 100%;
  height: 100%;
`