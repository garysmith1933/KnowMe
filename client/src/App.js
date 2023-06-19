import './css/App.css';
import './css/Questions.css'
import './css/Mobile.css'
import { useState, useEffect } from 'react';
import { shuffleOptions, judgeScore } from './utils';
import { Options } from './components/Options';
import { Score } from './components/Score';

function App() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [questionDetails, setQuestionDetails] = useState([])

  useEffect(() => {
    if (questions.length && current < 5) {
      const details = shuffleOptions(questions[current])
      setQuestionDetails(details)
    }
  },[current])

  useEffect(() => {
    fetch("https://knowme.onrender.com/questions")
    .then(res => res.json())
    .then(
      data => {
        const details = shuffleOptions(data[0])
        setQuestionDetails(details)
        setQuestions(data)
      }
    )
  },[])

  const isCorrect = (element, choice, answer) => {
    const el = document.getElementById(`${element}`)

    if (choice === answer) {
      if (el.classList.contains("correct")) return

      el.classList.add("correct")

      if (answered === false) {
        setScore(score + 1)
      }
    }
  
    else {
      el.classList.add("incorrect")
    }

    setAnswered(true)
  }

  const nextQuestion = () => {
    if (answered === false) return;

    const elements = document.getElementsByClassName('options')

    Array.from(elements).forEach(el => {
      el.classList.remove("correct")
      el.classList.remove("incorrect")
    })

    setCurrent(current + 1)
    setAnswered(false)
  }

  const display = () => {
    if (questions.length === 0) {
      return <p>Loading...</p> 
    }

    if (current < 5) {
      return <Options questionDetails={questionDetails} nextQuestion={nextQuestion} isCorrect={isCorrect}/>
    }

    return <Score score={score} judgeScore={judgeScore}/>
  }
  
  return (
    <div className="App">
        {display()}
    </div>
  );
}

export default App;
