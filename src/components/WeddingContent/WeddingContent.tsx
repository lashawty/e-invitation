import styled from 'styled-components';
import {useState, ReactNode} from 'react';
import {Sparkles, Stars, SpotLight, Float, useVideoTexture} from '@react-three/drei'
import {Modal} from 'antd';
import WeddingForm from '../WeddingForm/WeddingForm';
import IFrame from '../IFrame/IFrame'
import {Canvas} from '@react-three/fiber'

const VideoMesh = () => {
  const texture = useVideoTexture("./video/bg-pc.MP4")
  return (
    <mesh position-y={ -1 } rotation={[- Math.PI * .5 , 0 , 0]} scale={ 2 }>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
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

  return (
    <TitleContainer>
      <Canvas>
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />
        <Float floatingRange={[0, .5]} floatIntensity={0}>
          <mesh position={[0, 0, 0]} scale={.3} onClick={()=> {showModal('婚禮資訊', <p>圖片</p>)}} onPointerEnter={()=> {console.log('???')}}>
              <sphereGeometry />
              <meshLambertMaterial color="#d4cea1" />
          </mesh>
        </Float>
        <Float floatingRange={[0, .5]} speed={0.9}>
          <mesh position={[1, 0, 0]} scale={.3} onClick={()=> {showModal('婚禮表單', <WeddingForm />)}}>
              <sphereGeometry />
              <meshLambertMaterial color="#b7cbbf" />
          </mesh>
        </Float>
        <Float floatingRange={[0, 0.5]} speed={1.1}>
          <mesh position={[-1, 0, 0]} scale={.3} onClick={()=> {showModal('Playlist', <IFrame/>)}}>
              <sphereGeometry />
              <meshLambertMaterial color="#536040" />
          </mesh>
        </Float>
        <VideoMesh />
        <Sparkles></Sparkles>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      
      <Title>Sean & Chloe's Wedding</Title>
      {/* <ButtonContainer>
        <CustomButton icon={<CalendarOutlined />} ghost={true} onClick={()=> {showModal('婚禮資訊', <p>圖片</p>)}} />
        <CustomButton icon={<FormOutlined />} ghost={true} onClick={()=> {showModal('婚禮表單', <WeddingForm />)}} />
        <CustomButton icon={<YoutubeOutlined />} ghost={true} onClick={()=> {showModal('Playlist', <IFrame/>)}} />
      </ButtonContainer> */}
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

