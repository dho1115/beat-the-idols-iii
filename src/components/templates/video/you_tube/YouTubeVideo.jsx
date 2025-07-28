import React from 'react'

import "./YouTubeVideo.styles.css"

const YouTubeVideo = ({ url }) => {
   
  return (
    <iframe width="100%" height="100" src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  )
}

export default YouTubeVideo