import styled from 'styled-components';
interface IProps {
    isVideoReady: boolean
}

const title = `Sean & Chloe's Wedding`;
const letters = title.split('')

const Letters = ({
     isVideoReady
 }: IProps) => {
    return(
        letters.map((row, index) => <Letter key={index} Index={index} isVideoReady={isVideoReady}>{row}</Letter>)
    )
}

const Title = ({
    isVideoReady
}: IProps) => {
    return(
        <Container isVideoReady={isVideoReady}>
            <H1 isVideoReady={isVideoReady}>
                <Letters isVideoReady={isVideoReady}/>
            </H1>
        </Container>
    )
}

export default Title

const Letter = styled.span<{
    Index: number;
    isVideoReady: boolean;
}>`
  font-family: 'English', sans-serif;
  font-size: max(5vw, 24px);
  color: #fff;
  opacity: ${props => props.isVideoReady ? '1' : '0'};;
  transition: opacity .2s ease-out;
  transition-delay: ${props => props.Index * .1}s;
`

const H1 = styled.h1<{
    isVideoReady: boolean
}>`
  width: 100%;
  text-align: center;
  transition: transform 2s ease-in-out 2s;
  transform: translateY(${props => props.isVideoReady ? '-200px' : '0' });
`

const Container = styled.div<{
    isVideoReady: boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  pointer-events: ${props => props.isVideoReady ? 'none' : 'auto'};
  background: ${props => props.isVideoReady ? 'transparent' : '#b1c086'};
  transition: background 2s 4s;
`