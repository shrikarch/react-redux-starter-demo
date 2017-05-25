### You can find all of the code for this course [here](https://github.com/StephenGrider/ReduxCasts).

React is a js library that is used to produce HTML code that is shown in the browser.

The first code that we add is in index.js right under the src folder.
```js
const App = function(){
  return <div> Hey </div>;
}
```

The `const` here (is an ES6 syntax) and tells the compiler that this is a final value of that variable.
But just creating a component is not enough. We need to add it to the DOM.

This `return <div> Hey </div>;`, when converted to JS, makes a call to createElement function of React library, which takes three args.
`React.createElement("tagName", "null", "insideTagContent")`.

_ES6 runs on a belief of modules. So every module that we write, is independent of other modules._

###### Why do we need ReactDOM?
The react is starting to split into two separate libraries. React core handles and works with components(Render and nest). However the functionality to render them to the DOM is in ReactDOM.

Hence the code at this stage is:
```js
//ReduxSimpleStarter\src\index.js
import React from 'react';
import ReactDOM from 'react-dom';

const App = function(){
  return <div>Get Get</div>;
}

ReactDOM.render(App);
```
However, the 'App' that we are trying to render here is a class and we cant render the class as it is. We need to render the instance of the class instead.
we can create and instace by simply wrapping them in JSX tags like this:
```js
const App = function(){
  return <div>Get Get</div>;
}
<App></App>
```
Because we're in JSX, `<App></App>` can be shortened to `<App />`

But `ReactDOM.render` takes two components. The component that needs to be rendered and a target component.

```js
var targetElement = document.querySelector('.container');
ReactDOM.render(<App />, targetElement);
```

##### Adopting the ES6 syntax.
```js
const App = function(){
  return <div>Get Get</div>;
}
//now becomes
const App = () => {
  return <div>Get Get</div>;
}
```
Multi line JSX expressions are always bound inside a ():
```js
//ReduxSimpleStarter\src\index.js
return (
  <div>
  <SearchBar />
  </div>
)
```

###### Creating a new component
A simple new JS file in the components folder. Eg:
```js
//ReduxSimpleStarter\src\components\search_bar.js
import React from 'react';

const SearchBar = () => {
  return <input type="text"/>
}

export default SearchBar;

```

##### Introducing class based component
```js
//ReduxSimpleStarter\src\components\search_bar.js
import React from 'react';

class SearchBar extends React.Component {
  render() {
    return <input type="text"/>
  }
}

export default SearchBar;
```

###### Converting the above code to ES6
```js
//ReduxSimpleStarter\src\components\search_bar.js
import React, {Component} from 'react';

class SearchBar extends Component {
  render() {
    return <input type="text"/>
  }
}

export default SearchBar;
```

_`import React, {Component} from 'react';`_ is equal to saying `import React, {Component} from 'react'; const Component = React.Component`.
It just pulls off component from react and assigns to component variable.

Every class based component should have a render() method and a return statement.

_Every input Element in HTML emits a change event by default._
we can catch that like this:
```js
render() {
  return <input type="text" onChange = {this.onInputChange}/>
}
```

Every event like this, defined by a browser, have an event object. Whenver we call an event handler, like a function that is called after the event is triggered. This event object is available inside that event handler.

Example:
```js
class SearchBar extends Component {
  render() {
    return <input type="text" onChange = {this.onInputChange}/>
  }

  onInputChange(event){
    console.log(event.target.value);
  }
}

export default SearchBar;
```

##### States
State is a JS object that is used to record and react to user events.
Functional components do NOT have state. Only Class based components do.

We only SET the state using `this.state = {term:''}`in constructor at the time of the initialization. Apart from that, we always manipulate our state using `this.setState({ term: event.target.value })`.

For example:
```js
import React, {Component} from 'react';
class SearchBar extends Component {
  constructor(props) {
    super(props); //inherited from component class
    this.state = {term: ''}; //initializing blank state
  }
  render() {
    return (
      <div>
      <input onChange={event => this.setState({term: event.target.value})} />
      Value of the input: {this.state.term}
      </div>
    );
  }
}
export default SearchBar;
```

###### Controlled components
Here we use state to set the value of the input. It is suggested that we do it like this:
```js
render() {
  return (
    <div>
    <input
    value={this.state.term}
    onChange={event => this.setState({term: event.target.value})} />
    </div>
  );
}
```
This also allows us to set the value of the input beforehand.

##### Downward data flow
Downward data flow means only the most parent component is responsible for the data fetching.

_In ES6, the key value syntax {key : value} can be changed to {key} if key and value have the same variable names._

###### Passing data to the child component
We can pass the data down to the child component by simply passing them as arguments to the child component - Which then arrive in the child component in 'props' and can be accessed via accessing props.
For ex:
```js
//ReduxSimpleStarter\src\index.js
//defined and set the state for the data fetched from YT.
class App extends Component{
  constructor(props){
    super(props);

    this.state = {videos: [] };

    YTSearch({key: API_KEY, term: 'surf'}, function(videos){
      this.setState({videos});
    });
  }
}
```
```js
//ReduxSimpleStarter\src\components\video_list.js

const VideoList = (props) => {
  return (
    <ul className="col-md-4 list-group">
    {props.videos}
    </ul>
  );
};
```


###### JS map function
```js
var arr = [1,2,3];
arr.map(function(number) {return number * 2});
```

using the same map function we render a list in the template.

```js
//ReduxSimpleStarter\src\components\video_list_item.js
const VideoListItem = (props) => {
  return (
    <li>VideoName</li>
  );
}
export default VideoListItem;
```

```js
//ReduxSimpleStarter\src\components\video_list.js
const VideoList = (props) => {

  const VideoItems = props.videos.map((video) => {
    return <VideoListItem key = {video.etag} video={video}/>
  })

  return (
    <ul className="col-md-4 list-group">
    {VideoItems}
    </ul>
  );
};
```

In ES6,
```js
const VideoListItem = (props) => {
  const video = props.video;
}
```
can be written as
```js
const VideoListItem = ({video}) => {
};
```

###### Template Strings in ES6.
The template strings are simply like this:
```js
const videoURL = `www.youtube.com/embed/${videoID}`;
```
where `videoID` is another const.

Some parent objects cannot render things fast enough to satisfy the needs of the child object.


#### To change the video after clicking on the video in the list.
We will be using callbacks. We start by defining a function in index.js that is passed down to the video list - which in turn passes it down to videoListItem which gives it the video that we click on and the function is executed setting the new state.
for ex:

```js
//index.js
return (
  <div>
  <SearchBar />
  <VideoDetail video = {this.state.selectedVideo} />
  <VideoList
  onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
  videos = {this.state.videos} />
  </div>
);
```

```js
//video_list.js
const VideoList = (props) => {
  const VideoItems = props.videos.map((video) => {
    return <VideoListItem
    onVideoSelect = {props.onVideoSelect}
    //getting that function in video_list and passing it to VideoListItem
    key = {video.etag} video={video} />
  })};
```

```js
  //ReduxSimpleStarter\src\components\video_list_item.js
  const VideoListItem = ({video, onVideoSelect}) => {
    const imageURL = video.snippet.thumbnails.medium.url;
    return (
      <li onClick={()=>onVideoSelect(video)} className="list-group-item">
      ...
      </li>
    );}
```

### Making the searchbar work.
We start off by moving the YTSearch function under a function that will be called by the onChange event on the seachbar.

Hence:

```js
//ReduxSimpleStarter\src\index.js

getVideoList(term){
  YTSearch({key: API_KEY, term: term}, (videos) => {
    this.setState({
      videos: videos,
      selectedVideo: videos[1]
    });
  });
}
//YTSearch moved under getVideoList(term).
```
Then we pass this function as a callback to the searchbar element.
```html
<SearchBar onSearch = {term => this.getVideoList(term)}/>
```

Now in the searchbar element:
```js
//ReduxSimpleStarter\src\components\search_bar.js
render() {
  return (
    <div>
      <input
      value={this.state.term}
      onChange={event => this.searchFunction(event)} />
    </div>
  );
};
```
we replace the logic for onChange by the function which is defined as:
```js
//ReduxSimpleStarter\src\components\search_bar.js
searchFunction(event){
  console.log("heppens");
  this.setState({term: event.target.value});
  this.props.onSearch(this.state.term);
}
```
Here `this.props.onSearch(this.state.term);` calls the onSearch function passed as an attribute to the search component
which in turn will call `getVideoList(term)` all the while passing it a search term.

### Throttling the search
To make the search better, we'll use a library called Lodash. Install it using Npm and include it at the top of the index.js file.
