import styled from 'styled-components';


const title = `Sean & Chloe's Wedding`;
const letters = title.split('')

const Letters = () => letters.map((row, index) => <Letter key={index} Index={index}>{row}</Letter>)

const Title = () => {
    return(
        <H1>
            <Letters />
        </H1>
    )
}

export default Title

const Letter = styled.span<{
    Index: number;
}>`
  transition-delay: ${props => props.Index * .4}s ;
`

const H1 = styled.h1`
  position: fixed;
  top: 100px;
  left: 50%;
  z-index: 99;
  width: 100%;
  font-family: 'English', sans-serif;
  font-size: max(5vw, 24px);
  color: #fff;
  text-align: center;
  transition: transform 2s ease-in-out;
  transform: translate(-50%, 0);
`