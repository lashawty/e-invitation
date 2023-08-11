import styled from 'styled-components';
const Success = () => {
    return (
        <>
            <Title>表單已送出 ✓</Title>
            <Text>有任何問題，請直接聯繫我們  💁🏻‍♂️</Text>
        </>
    )
}

export default Success;


const Title = styled.p`
  margin: 20px 0 0 0;
  font-size: 20px;
  font-weight: bold;
`

const Text = styled.p`
  margin: 10px 0 0 0;
`