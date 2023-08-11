import styled from 'styled-components';
import {useState, ReactNode, useRef, useEffect} from 'react';
import {Sparkles} from '@react-three/drei'
import {Modal} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import WeddingForm from '../WeddingForm/WeddingForm';
import {Canvas, useThree} from '@react-three/fiber'
import useWindowSize from '../../hooks/useWindowSize';
import {VideoTexture} from 'three';
import {vertexShader, fragmentShader} from './shader.ts';

//types
type TVideo = HTMLVideoElement | null
interface IVideoComponentProps {
    video: TVideo,
}
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

const VideoMesh = ({video}: IVideoComponentProps) => {
    if(video === null) return null;

    // 載入影片紋理
    const videoTexture = new VideoTexture(video);

    // 將影片紋理透過uniforms傳給shaders
    const uniforms = {
        uTexture: { value: videoTexture }
    }

    //設定形狀大小與Canvas外觀相等，請看下方詳解
    const {width, height} = useThree((state) => state.viewport)
    return (
        <mesh>
            <planeGeometry args={[width, height, 1]}/>
            <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader}/>
        </mesh>
    )
}


const WeddingContent = () => {
    const windowWidth = useWindowSize()
    const videoRef = useRef<TVideo>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [modalState, setModalState] = useState(initialModalState);
    useEffect(()=>{
        if(videoRef) {
            videoRef?.current?.addEventListener('loadedmetadata', () => {
                setIsVideoReady(true);
                videoRef?.current?.play();
            })
        }
    }, [videoRef])
    const showModal = (title: string, content: ReactNode) => {
        setModalState({
            isOpen: true,
            title,
            content,
        })
    };
    const videoUrl = Number(windowWidth) > 992 ? './video/bg-pc.MP4' : './video/bg-mobile.mov';
    const closeModal = () => {
        setModalState({
            ...modalState,
            isOpen: false,
        })
    };

    return (
    <TitleContainer>
        <Video src={videoUrl} ref={videoRef} autoPlay={true} muted={true} loop={true}></Video>

        <Canvas>
            <Sparkles />
            {isVideoReady && <VideoMesh video={videoRef.current}/>}
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


const Video = styled.video`
  position: absolute;
  width: 0;
  opacity: 0;
`


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

