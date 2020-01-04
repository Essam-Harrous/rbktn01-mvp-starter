import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch ,Route, Link} from 'react-router-dom';
import $ from 'jquery';
import LastMemes from './components/lastMemes.jsx'
import GenerateMeme from './components/generateMeme.jsx';
import MemeTemplate from './components/memeTemplate.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memeTemplates: [],
      currentTemplate: undefined,
      createdMemes: []
    }
  }


  selectedTemplate(index) {
    this.setState({
      currentTemplate: this.state.memeTemplates[index]
    })
  }


  addMeme(createdMeme) {
    let prevMemes = this.state.createdMemes
    this.setState({
        createdMemes: [createdMeme, ...prevMemes]
      }, ()=> console.log(this.state.createdMemes))
    
  }


  componentDidMount() {
    $.ajax({
      url: '/memeTemplates',
      success: (data) => {
        this.setState({
          memeTemplates: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

    $.ajax({
      url: '/generatedMemes',
      success: (memes) => {
        let prevMemes = this.state.createdMemes;
        this.setState({
          createdMemes: [...prevMemes, ...memes]
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    var containerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }

    var memeTemplates = this.state.memeTemplates.map((template, i)=> {
      return <MemeTemplate selectedTemplate={(index)=> this.selectedTemplate(index)} i={i} key={template.id} meme={template}/>
    })
    return (
      <BrowserRouter>
				<div>
      {console.log(this.state.createdMemes)}
				<h1>meme generator</h1>
					<Link to="/"><button>last generated meme </button></Link>
					<Link to="/templates"><button>generate a meme </button></Link>
            <Switch>
              <Route path="/" exact component={() => {
               return <LastMemes memes={this.state.createdMemes}/>
              }}/>
              <Route path="/templates" exact component={()=> {
                return(
                  <Link to="/templates/generateMeme">
                    <div style={containerStyle}>{memeTemplates}</div>
                  </Link>
                  ) 
              }}/>
              <Route path="/templates/generateMeme" exact component={ ()=> {
                return <GenerateMeme addMeme={(meme)=> this.addMeme(meme)} memeTemplate={this.state.currentTemplate}/>
                }}/>
            </Switch>
				</div>
      </BrowserRouter>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'));