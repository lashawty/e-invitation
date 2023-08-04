import Video from "./components/Video/Video"
import WeddingContent from "./components/WeddingContent/WeddingContent"
import {Suspense} from 'react';
export default function App() {

  return (
    <Suspense>
      <WeddingContent />
      <Video />
    </Suspense>
  )
}
