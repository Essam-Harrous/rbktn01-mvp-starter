import React, {Component} from 'react'
import MemeTemplate from './memeTemplate.jsx'

class LastMemes extends Component  {
  constructor(props) {
    super(props)
  }

  render() {
    var containerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }
    return(
      <div>
        <h1>
        generated memes
        </h1>
        <div style={containerStyle}>
          {this.props.memes.map((meme)=> {
            return <a target="_blank" key={meme._id} download={meme.name + ".jpg"} href={meme.url} title={meme.name}>
              <MemeTemplate meme={meme}/>

            </a>
          })}
        </div>
      </div>
    )
  }
}

export default LastMemes;