import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Sparkles, Stars, Float, useVideoTexture} from '@react-three/drei'
import {Modal} from 'antd';
import WeddingForm from '../WeddingForm/WeddingForm';
import IFrame from '../IFrame/IFrame'
import {Canvas} from '@react-three/fiber'

interface IVideoMesh {
  videoSrc: string,
  onClick: () => void,
  x: number,
}

const VideoMesh = ({videoSrc, onClick, x}:IVideoMesh) => {
  const texture = useVideoTexture(videoSrc)
  return (
    <Float floatingRange={[0, 1]} speed={1.1} onClick={onClick} rotationIntensity={5}>
      <mesh position={[x, 0, 0]} scale={.3}>
          <sphereGeometry />
          <meshLambertMaterial map={texture} toneMapped={false} />
      </mesh>
    </Float>
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

  return (
    <TitleContainer>
      <Canvas>
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1 } />
        <ambientLight intensity={ 0.1 } />
        <Sparkles />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <VideoMesh videoSrc="./video/0.MP4" onClick={()=> {showModal('PlayList', <IFrame />)}} x={-1}/>
        <VideoMesh videoSrc="./video/1.MP4" onClick={()=> {showModal('婚禮表單', <WeddingForm />)}} x={0}/>
        <VideoMesh videoSrc="./video/2.MP4" onClick={()=> {showModal('婚禮資訊', <p>圖片</p>)}} x={1}/>
      </Canvas>
      
      <Title>Sean & Chloe's Wedding</Title>
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
  transform: translate(-50%, 0);
  width: 100%;
  text-align: center;
  font-family: 'English';
  font-size: max(5vw, 24px);
`

const TitleContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

