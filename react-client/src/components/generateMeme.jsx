import React, {Component} from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import $ from 'jquery';
import axios from 'axios'


class GenerateMeme extends Component {

  // eventLogger = (e: MouseEvent, data: Object) => {
  //   console.log('Event: ', e);
  //   console.log('Data: ', data);
  // };

  constructor(props) {
    super(props)
    this.state = {
      activeDrags: 0,
    }
  }

  handleChange(e, textName) {
    document.getElementById(textName).value = e.target.value
  }

  generateMeme() {
    let text1 = {};
    let text2 = {}
    var rect1 = document.getElementById('text1').getBoundingClientRect()
    var rect2 = document.getElementById('text2').getBoundingClientRect()
    text1.text = document.getElementById('text1').value
    text1.width = rect1.width;
    text1.height = rect1.height;
    text1.x = rect1.x;
    text1.y = rect1.y;

    text2.text = document.getElementById('text2').value
    text2.width = rect2.width;
    text2.height = rect2.height;
    text2.x = rect2.x;
    text2.y = rect2.y;
    var data = {}
    data.template_id = this.props.memeTemplate.id;
    data.username = 'EssamFaraj';
    data.password = '12341234';
    data.boxes = [text1, text2]
    data.name = this.props.memeTemplate.name;
    let that = this;
    console.log(data)
    axios.post('/generateMeme', data)
    .then(function (response) {
      console.log(response);
      that.props.addMeme(response.data)
    })
    // $.post('/generateMeme', data, (data) => {
    //     console.log(data)
        
    //   });


  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  };

  onStart () {
    this.setState({activeDrags: ++this.state.activeDrags});
  };
  
  render() {
    let imgHeight = this.props.memeTemplate.height - this.props.memeTemplate.height * 0.06;
    let imgWidth = this.props.memeTemplate.width - this.props.memeTemplate.width * 0.06;


    let imgContainer = {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      margin: '20px',
      margin: ' 20px auto',
      position: 'relative',
    }

    let imgDiv1 = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      zIndex: '1000',
      cursor: 'move',
      padding: '10px',
      outLine: 'none',
      background: 'transparent',
      border: 'none'

    }

    let imgDiv2 = {
      position: 'absolute',
      top: '0px',
      right: '0px',
      zIndex: '1000',
      cursor: 'move',
      padding: '10px',
      outLine: 'none',
      background: 'transparent',
      border: 'none'

    }

    let ParentContainer = {
      display: 'flex'
    }

    const dragHandlers = {onStart: () => this.onStart(), onStop: () => this.onStop()};

    return (
      <div style={{textAlign: 'center'}}>
        {console.log(this.props)}
        <div style={ParentContainer}>
          <div style={imgContainer}>
            <Draggable bounds={{top: 0, left: 0, right: imgWidth, bottom: imgHeight}} {...dragHandlers}>
              <div>
                <input disabled id="text1" type="text" style={imgDiv1} placeholder="Text 1 will be here"/>
              </div>
            </Draggable>
            <Draggable bounds={{top: 0, left: -imgWidth, right: 0, bottom: imgHeight}} {...dragHandlers}>
              <div>
                <input id="text2" disabled type="text" style={imgDiv2} placeholder="Text 2 will be here"/>
              </div>
            </Draggable>
              <img src={this.props.memeTemplate.url} alt="meme" width="auto" height="100%"/>
          </div>
          <div style={{position: "relative", top: "150px", left: '-20px'}}>
            <div>
              <label>Text 1</label>
              <input onChange={(e) => this.handleChange(e, 'text1')} type="text"/>
            </div>
            <div  style={{marginTop: '25px'}}>
              <div>
                <label>Text 2</label>
                <input onChange={(e) => this.handleChange(e, 'text2')} type="text"/>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => this.generateMeme()}>Generate</button>
      </div>
    )
  }
}

export default GenerateMeme;