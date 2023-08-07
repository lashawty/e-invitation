import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Sparkles, useVideoTexture} from '@react-three/drei'
import {Modal} from 'antd';
import {FormOutlined, YoutubeOutlined, CalendarOutlined} from '@ant-design/icons';
import WeddingForm from '../WeddingForm/WeddingForm';
import IFrame from '../IFrame/IFrame'
import {Canvas, useThree} from '@react-three/fiber'
import useWindowSize from '../../hooks/useWindowSize';

const VideoMesh = () => {
    const windowWidth = useWindowSize()
    const videoUrl = Number(windowWidth) > 992 ? './video/bg-pc.MP4' : './video/bg.mov';
    const texture = useVideoTexture(videoUrl);
    const three = useThree();
    const {width, height} = three.viewport;
    return(
        <mesh>
            <meshBasicMaterial map={texture} toneMapped={false} needsUpdate={true}/>
            <planeGeometry args={[width, height, 1]}></planeGeometry>
        </mesh>
    )
}

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

  // @ts-ignore
    return (
    <TitleContainer>
      <Canvas>
        <Sparkles />
        <VideoMesh/>
      </Canvas>
      

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

const TitleContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

