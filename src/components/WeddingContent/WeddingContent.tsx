import styled from 'styled-components';
import {useState, ReactNode, useRef} from 'react';
import {Sparkles} from '@react-three/drei'
import {Modal} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import WeddingForm from '../WeddingForm/WeddingForm';
import {Canvas} from '@react-three/fiber'
import useWindowSize from '../../hooks/useWindowSize';
import Success from '../WeddingForm/Success.tsx';

//types
interface IModalState {
    isOpen: boolean;
    title: string;
    content: ReactNode | null;
    isFormSubmit: boolean;
}



interface IProps {
    handleVideo: () => void
}
const WeddingContent = ({handleVideo}:IProps) => {
    const windowWidth = useWindowSize();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const bgUrl = Number(windowWidth) > 992 ? './image/bg-pc.gif' : './image/bg-mobile.gif';
    const videoUrl = Number(windowWidth) > 992 ? './video/bg-pc.MP4' : './video/bg-mobile.mov';
    const initialModalState: IModalState = {
        isOpen: false,
        title: '',
        content: null,
        isFormSubmit: !!localStorage.getItem('isFormFilled'),
    };
    const [modalState, setModalState] = useState(initialModalState);
    const [isVideoError, setIsVideoError] = useState(false);
    const showModal = (title: string, content: ReactNode) => {
        setModalState({
            ...modalState,
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


    const handleSuccess = () => {
        setModalState({
            ...modalState,
            isOpen: true,
            isFormSubmit: true,
            content: <Success/>,
        })
        localStorage.setItem("isFormFilled", "true");
    }

    const handleVideoError = () => {
        handleVideo()
        const video = videoRef.current;
        let startPlayPromise = video?.play();

        if (startPlayPromise !== undefined) {
            startPlayPromise
                .then(() => {
                    console.log('video is playing!')
                })
                .catch((error) => {
                    if (error.name === "NotAllowedError") {
                        setIsVideoError(true)
                    }
                });
        }
    }
    return (
    <Container isVideoError={isVideoError}>
        <Video
            ref={videoRef}
            src={videoUrl}
            autoPlay={true}
            playsInline={true}
            poster={bgUrl}
            muted={true}
            loop={true}
            controls={false}
            onPlay={handleVideoError}
            isVideoError={isVideoError}
        />
        <Canvas>
            <Sparkles />
        </Canvas>

        <SvgContainer>
            <FormOutlined onClick={()=> showModal('婚禮表單', <WeddingForm onSuccess={handleSuccess}/>)}/>
        </SvgContainer>

        <Modal title={modalState.title} open={modalState.isOpen} onCancel={closeModal} footer={null}>
            {modalState.isFormSubmit ? <Success /> : modalState.content}
        </Modal>
    </Container>
  )
}

export default WeddingContent;



const Video = styled.video<{
    isVideoError: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: ${props => props.isVideoError ? 'hidden' : 'visible'};
  .media-controls-play-button{
    display: none;
  }
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

const Container = styled.div<{
    isVideoError: boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.isVideoError ? './image/loading.jpg' : ''});
  background-size: cover;
`

