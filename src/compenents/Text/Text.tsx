import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Modal, Button} from 'antd';
import {FormOutlined, CalendarOutlined, YoutubeOutlined} from '@ant-design/icons'
import WeddingForm from '../WeddingForm/WeddingForm';
import IFrame from '../IFrame/IFrame'

const Text = () => {
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
  const handlePlayVideo = () => {
    const videoTag = document.querySelector('video');
    videoTag?.play()
    console.log(videoTag);
    
  };
  return (
    <TitleContainer onClick={handlePlayVideo}>
      <Title>Sean & Chloe's Wedding</Title>
      <ButtonContainer>
        <CustomButton icon={<CalendarOutlined />} ghost={true} onClick={()=> {showModal('婚禮資訊', <p>圖片</p>)}} />
        <CustomButton icon={<FormOutlined />} ghost={true} onClick={()=> {showModal('婚禮表單', <WeddingForm />)}} />
        <CustomButton icon={<YoutubeOutlined />} ghost={true} onClick={()=> {showModal('Playlist', <IFrame/>)}} />
      </ButtonContainer>
      <Modal title={modalTitle} open={isModalOpen} onCancel={closeModal} footer={null}>
        {modalContent}
      </Modal>
    </TitleContainer>
  )
}

export default Text;

const CustomButton = styled(Button)`
  color: #000 !important;
  border-color: #000 !important;
`

const ButtonContainer = styled.div`
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const Title = styled.h1`
  text-align: center;
  font-family: 'English';
  font-size: max(5vw, 24px);
`

const TitleContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

