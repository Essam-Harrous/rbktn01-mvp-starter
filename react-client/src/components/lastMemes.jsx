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
            return <MemeTemplate key={meme._id} meme={meme}/>
          })}
        </div>
      </div>
    )
  }
}

export default LastMemes;