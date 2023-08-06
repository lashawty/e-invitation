import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Sparkles} from '@react-three/drei'
import {Modal} from 'antd';
import {FormOutlined, YoutubeOutlined, CalendarOutlined} from '@ant-design/icons';
import WeddingForm from '../WeddingForm/WeddingForm';
import IFrame from '../IFrame/IFrame'
import {Canvas} from '@react-three/fiber'


const WeddingContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<null | ReactNode>(null);
  const showModal = (title: string, content: ReactNode) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TitleContainer>
      <Canvas>
        <Sparkles />
      </Canvas>
      
      <Title>Sean & Chloe's Wedding</Title>
      <SvgContainer>
        <FormOutlined onClick={()=> showModal('婚禮表單', <WeddingForm />)}/>
        <CalendarOutlined onClick={()=> showModal('婚禮資訊', <p>圖片</p>)}/>
        <YoutubeOutlined onClick={()=> showModal('PlayList', <IFrame />)}/>
      </SvgContainer>
      <Modal title={modalTitle} open={isModalOpen} onCancel={closeModal} footer={null}>
        {modalContent}
      </Modal>
    </TitleContainer>
  )
}

export default WeddingContent;


const Title = styled.h1`
  position: absolute;
  top: 100px;
  left: 50%;
  width: 100%;
  font-family: 'English', sans-serif;
  font-size: max(5vw, 24px);
  color: #fff;
  text-align: center;
  transform: translate(-50%, 0);
`

const SvgContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  color: #fff;
`

const TitleContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

