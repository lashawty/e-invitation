import styled from 'styled-components';


const title = `Sean & Chloe's Wedding`;
const letters = title.split('')
interface IProps {
    isVideoReady: boolean
}
const Letters = ({
     isVideoReady
 }: IProps) => letters.map((row, index) => <Letter key={index} Index={index} isVideoReady={isVideoReady}>{row}</Letter>)

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
  color: ${props => props.isVideoReady ? '#fff' : 'transparent'};
  transition: color .2s ease-out;
  transition-delay: ${props => props.Index * .1}s;
`

const H1 = styled.h1<{
    isVideoReady: boolean
}>`
  width: 100%;
  font-family: 'English', sans-serif;
  font-size: max(5vw, 24px);
  color: #fff;
  text-align: center;
  transition: transform 2s ease-in-out;
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
  background: ${props => props.isVideoReady ? 'transparent' : '#000'};
  transition: background 1s;
`