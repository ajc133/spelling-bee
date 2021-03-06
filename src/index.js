import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Tile(props) {
  return (
    <button className="tile" onClick={props.onClick}>{props.letter}</button>
  );
}

class Board extends React.Component {
  renderTile(i) {
    return (
      <Tile
        letter={this.props.outerLetters[i]}
        onClick={() => this.props.onClickOuter(i)}
      />
    );
  }

  renderCenter() {
    return (
          <Tile
            letter={this.props.centerLetter}
            onClick={() => this.props.onClickInner()}
          />
    )
  }

  render() {
    return (
      <div id="board">
        <div className="inner">
          {this.renderCenter()}
        </div>
        <div className="outer">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
          {this.renderTile(3)}
          {this.renderTile(4)}
          {this.renderTile(5)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ""
    }
    this.outerLetters = ['a','b','c','d','e','f'];
    this.centerLetter = 's';
    this.wordList = ['deafs', 'deeds'];
  };

  handleClickOuter(i) {
    let letter = this.outerLetters[i];
    this.handleClick(letter);
  }

  handleClickInner() {
    let letter = this.centerLetter.slice();
    this.handleClick(letter);
  }

  handleClick(letter) {
    this.setState({
      word: this.state.word + letter,
    })
  }
  
  onKeyPressed(e) {
    const key = e.key.toLowerCase();
    if (alphabet.includes(key)) {
      this.handleClick(key);
    } else if (key === "backspace" || key === "delete") {
      this.backspace();
    } else if (key === "enter") {
      this.submitWord();
    }
  }

  backspace = () => {
    this.setState({
      word: this.state.word.slice(0, -1)
    });
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }
  
  // Has to be an arrow function to properly bind `this`
  submitWord = () => {
    if(this.followsRules()) {
      document.getElementById('messages').textContent = "Nice!";
    } else {
      document.getElementById('messages').textContent = "Submitted";
    }
    console.log('Submitted');
    this.setState({
      word: ''
    });
  }

  followsRules = () => {
    /**
      Words must contain at least 4 letters.
      Words must include the center letter.
      Our word list does not include words that are obscure, hyphenated, or proper nouns.
      No cussing either, sorry.
      Letters can be used more than once.
     */

    if (this.state.word.length < 4) {
      alert('Too short');
      return(false);
    } else if( !this.state.word.includes(this.centerLetter) ){
      alert('Must contain center letter');
      return(false);
    } else if( this.wordList.indexOf(this.state.word) === -1 ){
      alert('Not in wordlist');
      return(false);
    } else {
      return(true);
    }

  }

  render() {
    const outerLetters = this.outerLetters.slice();
    return (
      <div 
        id="game"
        onKeyDown={this.onKeyPressed}
      >
        <p id="messages"></p>
        <div className="info">
          {this.state.word.length} - {this.state.word}
        </div>
        <Board 
          outerLetters={outerLetters}
          centerLetter={this.centerLetter}
          onClickOuter={(i) => this.handleClickOuter(i)}
          onClickInner={() => this.handleClickInner()}
        />
        <button id="deleteButton" onClick={this.backspace}> Delete </button>
        <button id="submitButton" onClick={this.submitWord} > Submit </button>
      </div>
    )
  }
}


// =====================================================

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

