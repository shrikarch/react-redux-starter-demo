import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
  const imageURL = video.snippet.thumbnails.medium.url;

  return (
    <li onClick={()=>onVideoSelect(video)} className="list-group-item">
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={video.snippet.thumbnails.default.url} />
          </a>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{video.snippet.title}</h5>
        </div>
      </div>
    </li>
  );
}

export default VideoListItem;
