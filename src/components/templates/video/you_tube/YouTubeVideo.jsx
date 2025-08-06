import "./YouTubeVideo.styles.css"

const YouTubeVideo = ({ url, title }) => {
  return (
    <iframe width="100%" height="100" src={url} title={title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  )
}

export default YouTubeVideo