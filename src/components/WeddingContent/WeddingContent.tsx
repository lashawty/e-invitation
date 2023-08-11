import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Sparkles} from '@react-three/drei'
import {Modal} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import WeddingForm from '../WeddingForm/WeddingForm';
import {Canvas} from '@react-three/fiber'
import useWindowSize from '../../hooks/useWindowSize';

//types
interface IModalState {
    isOpen: boolean;
    title: string;
    content: ReactNode | null;
}

const initialModalState: IModalState = {
    isOpen: false,
    title: '',
    content: null
};


const WeddingContent = () => {
    const windowWidth = useWindowSize();
    const bgUrl = Number(windowWidth) > 992 ? './image/bg-pc.gif' : './image/bg-mobile.gif';
    const [modalState, setModalState] = useState(initialModalState);


    const showModal = (title: string, content: ReactNode) => {
        setModalState({
            isOpen: true,
            title,
            content,
        })
    };


    const closeModal = () => {
        setModalState({
            ...modalState,
            isOpen: false,
        })
    };

    return (
    <TitleContainer bgUrl={bgUrl}>

        <Canvas>
            <Sparkles />
        </Canvas>

        <SvgContainer>
            <FormOutlined onClick={()=> showModal('婚禮表單', <WeddingForm />)}/>
        </SvgContainer>

        <Modal title={modalState.title} open={modalState.isOpen} onCancel={closeModal} footer={null}>
            {modalState.content}
        </Modal>
    </TitleContainer>
  )
}

export default WeddingContent;





const SvgContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  color: #fff;
`

const TitleContainer = styled.div<{
    bgUrl: string,
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
`

