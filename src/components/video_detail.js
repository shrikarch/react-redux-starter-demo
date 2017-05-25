import React from 'react';

const VideoDetail = ({video}) => {

  if(!video){
    return <div className="h5">Loading...</div>
  }

  const videoID = video.id.videoId;
  const videoURL = `https://www.youtube.com/embed/${videoID}`;

  return (
    <div className="video-detail">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe src={videoURL} frameborder="0" className="embed-responsive-item"></iframe>
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;
