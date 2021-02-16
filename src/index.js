import React from 'react';
import ReactDOM from 'react-dom';

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
      <div>
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
  
  // Has to be an arrow function to properly bind `this`
  submitWord = () => {
    alert(this.state.word);
  }

  backspace = () => {
    this.setState({
      word: this.state.word.slice(0, -1)
    });
  }

  render() {
    const outerLetters = this.outerLetters.slice();
    return (
      <div>
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

