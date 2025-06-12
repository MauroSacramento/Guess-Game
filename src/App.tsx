import styles from "./app.module.css"
import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";

import { useEffect } from "react";
import { useState } from "react";

import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";





export function App(){
  const [attempts, setAttempts] = useState(0)
  const [letter, setLetter] = useState("")
  const [score, setScore] = useState(0)
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([])
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  function handleRestartGame(){
    const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar?");

    if(isConfirmed){
      startGame()
    }
  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setAttempts(0);
    setLetterUsed([])
    setLetter("")
    setScore(0);
  }

function endGame(message: string){
  alert(message);
  startGame()
}

  function handleConfirm(){

    if(!challenge){
      return
    }

    if(!letter.trim()){
      return alert("Digite uma letra!")
    }

    const value = letter.toUpperCase()
    
    const exists = letterUsed.find( (used) => used.value.toUpperCase() === value);

    if(exists){
      alert("Você já utilizou a letra "+ value)
    } 

    const hits = challenge.word
        .toUpperCase()
        .split("")
        .filter((char) => char === value).length
    
    const correct = hits > 0;
    const currentScore = score + hits;

    setLetterUsed((prevState) => [...prevState, {value, correct}])
    setScore(currentScore)

    setLetter("")
  }


  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if(!challenge){
      return
    }

    setTimeout(() => {
      if(score === challenge.word.length){
        return endGame("Parabéns, você descobriu a palavra!")
      }
    }, 200)
  }, [score, letterUsed.length])

  if (!challenge){
    return
  }

  return (
  <div className={styles.container}>
    <main>
      <Header current={attempts} max={10} onRestart={handleRestartGame}/>
      <Tip tip={challenge.tip} />
      <div className={styles.word}>
        {challenge.word.split("").map((letter, index) => {
          const usedLetter = letterUsed.find(
            (used) => used.value.toUpperCase() === letter.toUpperCase()
          )

          return <Letter key={index} value={usedLetter?.value} color={usedLetter?.correct ? 'correct' : 'default'}/>
        })}
      </div>

      <h4>Palpite</h4>
      <div className={styles.guess}>
        <Input autoFocus maxLength={1} placeholder="?" value={letter} onChange={(e) => setLetter(e.target.value)}/>
        <Button title="Confirmar" onClick={handleConfirm}/>
      </div>

      <LettersUsed data={letterUsed} />
    </main>
  </div>

)
}