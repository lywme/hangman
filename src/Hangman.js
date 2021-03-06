import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    nWrong:0,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: "apple" };
    this.handleGuess = this.handleGuess.bind(this);
  }

  componentDidMount()
  {
    //console.log(randomWord());
    this.setState({answer:randomWord()});
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,index) => (
      <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleReset=()=>{
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  isWin=()=>{
    let win=false;
    for(let i=0;i<this.state.answer.length;i++)
    {
      if(!this.state.guessed.has(this.state.answer.charAt(i)))
      {
        return false;
      }
    }
    win=true;

    //console.log((this.state.nWrong<this.props.maxWrong)&&win);
    return (this.state.nWrong<this.props.maxWrong)&&win;
  }

  /** render: render game */
  render() {
    const isWin=this.isWin();
    const gameOver=this.state.nWrong>=this.props.maxWrong;
    const hasError=this.state.nWrong<this.props.maxWrong&&this.state.nWrong>0;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`}/>
        {hasError&&!gameOver?<p>Number wrong : {this.state.nWrong}</p>:null}

        {gameOver&&!isWin?<p className='Hangman-word'>{this.state.answer}</p>:<p className='Hangman-word'>{this.guessedWord()}</p>}
        {gameOver&&!isWin?<div><p>You loose!!!</p><button onClick={this.handleReset} id="resetBtn">Reset</button></div>:null}
        {this.isWin()?<div><p>You win</p><button onClick={this.handleReset} id="resetBtn">Reset</button></div>:null}
        {!(gameOver||isWin)?<p className='Hangman-btns'>{this.generateButtons()}</p>:null}
      </div>
    );
  }
}

export default Hangman;
