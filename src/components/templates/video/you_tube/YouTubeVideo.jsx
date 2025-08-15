import { Suspense } from "react";
import getVideoId from "get-video-id";
import "./YouTubeVideo.styles.css"

const YouTubeVideo = ({ url, title }) => {
  const { id: _youtubeID } = getVideoId(url)
  
  return (
    <Suspense fallback={<h5 className="text-danger"><i>Loading... please wait!!!</i></h5>}>
      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${_youtubeID}?si=0MNCojt0FOjgI5bA`} title={title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{borderTopLeftRadius: '15px', borderTopRightRadius: '15px'}}></iframe>
    </Suspense>
    
  )
}

export default YouTubeVideo