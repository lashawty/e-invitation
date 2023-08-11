import WeddingContent from "./components/WeddingContent/WeddingContent"
import Title from './components/Title/Title.tsx';
import {useState} from 'react';
const App = () => {
    const [isVideoReady, setIsVideoReady] = useState(false);
    const handleVideo = () => setIsVideoReady(true);
  return (
      <>
          <Title isVideoReady={isVideoReady}/>
          <WeddingContent handleVideo={handleVideo}/>
      </>
  )
}

export default App;