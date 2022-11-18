import React, { useEffect, useState } from 'react';
import './App.css';



function App() {

  const [actualBoxColor, setColor] = useState("");
  const [answers, setAnswer] = useState<string[]>([]);
  const [result, setresult] = useState<Result | undefined>(undefined);
  const [rightAnswerCounter, setRightAnswerCounter] = useState(0);

  enum Result {
    Correct,
    Wrong,
  }

  useEffect(() => {
    generateColors();
    }, []);
  

  function getRandomNumberString(base: number = 16, length: number = 6) {
    const max = Math.pow(base, length)
    const decimal = Math.floor(Math.random() * max)
    const hexString = decimal.toString(base).padStart(length, '0')

    return "#" + hexString.toUpperCase();
}


const generateColors:any = () => {
  const correctAnswerColor = getRandomNumberString()
  setColor(correctAnswerColor);
  setAnswer([correctAnswerColor, getRandomNumberString(), getRandomNumberString()].sort(() => 0.5 - Math.random()));
}




  const incrementCount = () => {
    // Update state with incremented value
    setRightAnswerCounter(rightAnswerCounter + 1);
  };
  
  const handleAnswerClick = (answer: string) => {
    
    if (answer === actualBoxColor) {
      // right answer
      incrementCount();
      setresult(Result.Correct);
      generateColors();
    }
    else {
      // wrong answer
      setresult(Result.Wrong);
      setRightAnswerCounter(0);
    }
  }

 

  return (
    <div className="App">
    <h1>Hex guessing game</h1>
     <div className='color-square' style={{ background: actualBoxColor }}></div>
     <div className='center-div'>
        {answers.map(answer => (
          <button onClick={() => handleAnswerClick(answer)} key={answer}>{answer}</button>
        ))}
     </div>
     {result === Result.Wrong && <div className='wrong'>Wrong answer</div>}
     {result === Result.Correct && <div className='correct'>Correct Answer! {rightAnswerCounter}</div>}
     </div>
  );
}

export default App;
