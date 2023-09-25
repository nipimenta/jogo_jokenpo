import { useState } from 'react'
import { Fragment } from 'react'
import './App.css'

import PaperHandTransparent from './assets/moves/paper-hand-transparent.png'
import RockHandTransparent from './assets/moves/rock-hand-transparent.png'
import ScissorHandTransparent from './assets/moves/scissor-hand-transparent.png'


function App() {
  const [curretPlay, setCurrentPlay] = useState({
    player: '',
    computer: ''
  })
  const [winnerCounter, setWinnerCounter] = useState({
    player: 0,
    computer: 0,
    ties: 0
  })
  const [winner, setWinner] = useState('')
  const [possibleMoves, setPossibleMoves] = useState([
    {
       type: 'paper',
       label: 'Papel',
       wins: 'rock',
       lose: 'scissor'
    },
    {
      type: 'rock',
      label: 'Pedra',
      wins: 'scissor',
      lose: 'paper'
   },
   {
      type: 'scissor',
      label: 'Tesoura',
      wins: 'paper',
      lose: 'rock'
    }
  ]);


  const makeMove = playerMove =>{
    const minimumMachineMachineMoveNumber = 1;
    const maximumMachineMachineMoveNumber = 3;

    const randemMachineMove = Math.floor(Math.random() * (maximumMachineMachineMoveNumber - minimumMachineMachineMoveNumber + 1)) + minimumMachineMachineMoveNumber;
  
    let machineMoveType = '';

    switch(randemMachineMove){
      case 1:
        machineMoveType = 'paper';
        setCurrentPlay((curretValue) => ({ ...curretValue, computer:'Papel'}))
        break
      case 2:
        machineMoveType = 'rock';
        setCurrentPlay((curretValue) => ({ ...curretValue, computer:'Pedra'}))
        break
      case 3: 
        machineMoveType = 'scissor';
        setCurrentPlay((curretValue) => ({ ...curretValue, computer:'Tesoura'}))
        break
    }

    switch(playerMove){
      case 'paper':
        setCurrentPlay((curretValue) => ({ ...curretValue, player:'Papel'}))
        break
      case 'rock':
        setCurrentPlay((curretValue) => ({ ...curretValue, player:'Pedra'}))
        break
      case 'scissor': 
        setCurrentPlay((curretValue) => ({ ...curretValue, player:'Tesoura'}))
        break
    }
    if (machineMoveType === playerMove) {
      setWinner('Empate');
      setWinnerCounter((currentCouter) => {
        return({
          ... currentCouter,
          ties: currentCouter.ties++
        })
      })
      return;
    }

    const playerMoveValidation = possibleMoves.find(
      currentMove => currentMove.type === playerMove
    );

    const isPlayerTheWinner = playerMoveValidation.wins === machineMoveType;

    if (isPlayerTheWinner) {
      setWinner('Jogador');
      setWinnerCounter((currentCouter) => {
        return({
          ...currentCouter,
          player: currentCouter.player++
        })
      })
      return;
    }

    setWinner('Computador');
    setWinnerCounter(currentCouter => {
      return{
        ...currentCouter,
        computer: currentCouter.computer++
      };
    });
  };
  return (
    <>
    <Fragment>
    {winner && <h1>O resultado é{' '}
    {winner === 'Empate' ? 'Empate' : `Vencedor: ${winner}`}</h1>}

    { curretPlay.player && <p>Jogador: {curretPlay.player}</p>}
    { curretPlay.computer &&<p>Computador: {curretPlay.computer}</p>}

    <p>Jogador: {winnerCounter.player}</p>
    <p>Computador: {winnerCounter.computer}</p>
    <p>Empates: {winnerCounter.ties}</p>

  <button onClick={() =>makeMove('paper')}>
    <img src={PaperHandTransparent} />
  </button>
  <button onClick={() => makeMove('rock')}>
    <img src={RockHandTransparent} />
  </button>
  <button  onClick={() => makeMove('scissor')}>
    <img src={ScissorHandTransparent} />
  </button>
  </Fragment> 
    </>
  )
}

export default App
