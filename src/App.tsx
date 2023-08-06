import Video from "./components/Video/Video"
import WeddingContent from "./components/WeddingContent/WeddingContent"
import {Suspense} from 'react';
import Loading from "./components/Loading/Loading";

export default function App() {

  return (
    <Suspense fallback={<Loading />}>
      <WeddingContent />
      <Video />
    </Suspense>
  )
}
