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
        letter={this.props.tiles[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderTile(0)}
        {this.renderTile(1)}
        {this.renderTile(2)}
        {this.renderTile(3)}
        {this.renderTile(4)}
        {this.renderTile(5)}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: ['a','b','c','d','e','f'],
      stepNumber: 0,
      history: []
    }
  };

  handleClick(i) {
    this.setState({
      history: this.state.history.concat([i]),
      stepNumber: this.state.stepNumber + 1
    })
  }

  render() {
    const tiles = this.state.tiles.slice();
    return (
      <div>
      <div className="info">{this.state.stepNumber} - {this.state.history} </div>
      <Board 
        tiles={tiles}
        onClick={(i) => this.handleClick(i)}
      />
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

