import React, { useEffect, useState } from "react";

function GameBoard() {
    const words = ["react", "javascript", "developer", "frontend", "backend", "node", "express", "database"];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  const [isGameOn, setIsGameOn] = useState(false);
  const [currentWord,setCurrentWord] = useState(getRandomWord());
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWords, setTotalWords] = useState(0);

  const startGame = () => {
    setIsGameOn(true)
    setTimeLeft(30)
    setCorrectWords(0)
    setTotalWords(0)
    setCurrentWord(getRandomWord());
    setInputValue("");
  }

  const resetGame = () => {
    setIsGameOn(false);
    setTimeLeft(30);
    setCorrectWords(0);
    setTotalWords(0);
    setCurrentWord(getRandomWord());
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === currentWord) {
      setCorrectWords((prev) => prev + 1);
      setTotalWords((prev) => prev + 1);
      setCurrentWord(getRandomWord());
      setInputValue("");
    }
  };


  useEffect(() => {
    if (isGameOn && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setIsGameOn(false);
    }
  }, [isGameOn, timeLeft]);
  return (
    <div className="mt-5 px-4">
      <h1 className="font-extrabold font-serif text-2xl text-center text-white">Rapid Typing Game</h1>
      <div className="flex justify-center items-center bg- m-6 rounded-xl p-4 w-full max-w-4xl mx-auto">
        <div className="w-full sm:w-3/4 lg:w-1/2 p-6 bg-white m-4 rounded-xl flex flex-col items-center"> 
        {
            isGameOn?(
                <>
                <h2 className="text-2xl font-extrabold text-center mb-3">Enter the word: </h2>
          <h2 className="text-xl font-semibold text-center">{currentWord}</h2>
          <input
            type="text"
            className="border p-2 rounded mt-4 text-center w-full sm:w-3/4 mb-1"
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
            />
            <p className="text-lg mb-2">Time Left: {timeLeft}s</p>
            </>
            ):(<>
            <div className="mt-3 w-full">
                <h1 className="text-2xl text-center font-bold">Start the game</h1>
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6  p-4 sm:p-6 w-full justify-center">
                <li className="bg-white rounded-lg px-4 py-2 text-center w-full sm:w-auto">Time left: {timeLeft}</li>
                <li className="bg-white rounded-lg px-4 py-2 text-center w-full sm:w-auto">WPM: {totalWords*2}</li>
                <li className="bg-white rounded-lg px-4 py-2 text-center w-full sm:w-auto">Accuracy: {totalWords ? ((correctWords / totalWords) * 100).toFixed(2) : 0}%</li>
            </ul>
          </div>
            </>)
        }
        
          
          <div>
            {isGameOn?(
                <button onClick={resetGame} className="bg-red-600 rounded-lg px-3 py-2 text-white"> Reset Game</button>
            ):(
                <button onClick={startGame} className="bg-green-500 rounded-lg px-3 py-2 text-white"> Start Game</button>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;