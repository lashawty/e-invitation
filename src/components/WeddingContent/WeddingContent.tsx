import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Sparkles, Float, useVideoTexture} from '@react-three/drei'
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
    // @ts-ignore
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
        {/*@ts-ignore*/}
        <Sparkles />
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
  width: 100%;
  font-family: 'English', sans-serif;
  font-size: max(5vw, 24px);
  color: #fff;
  text-align: center;
  transform: translate(-50%, 0);
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

