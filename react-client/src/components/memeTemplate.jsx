import React, {Component} from 'react';
import { Link} from 'react-router-dom';


class MemeTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    let card = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      margin: '20px'
    }

    let container = {
      padding: '2px 16px'
    }
    return (
      <div style={card}>
          <div onClick={()=>this.props.selectedTemplate(this.props.i)} style={{width: '380px', height: '300px'}}>
            <img src={this.props.meme.url} alt="Avatar" width="100%" height="100%"/>
          </div>
          <div style={container}>
            <h4><b>{this.props.meme.name}</b></h4> 
          </div>
      </div>
     );
  }
}
 
export default MemeTemplate;