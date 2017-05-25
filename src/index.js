import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAT0RwNIG1-O4eVP4x4Ixz6jUpkOKf6_Ho';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    YTSearch({key: API_KEY, term: 'surf'}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[1]
      });
    });
  }

  render(){
    return (
      <div>
        <SearchBar />
        <VideoDetail video = {this.state.selectedVideo} />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos = {this.state.videos} />
      </div>
    );
  }
}

var targetElement = document.querySelector('.container');
ReactDOM.render(<App />, targetElement);
