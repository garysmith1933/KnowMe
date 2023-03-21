import './css/App.css';
import './css/Questions.css'
import './css/Mobile.css'
import { useState, useEffect } from 'react';
import { shuffleOptions, judgeScore } from './utils';


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
    fetch("https://knowme.onrender.com/data")
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

  const data = questions.length === 0 ?
      <p>Loading...</p> 
:
  current < 5 ?
    <div id='question-container'>
      <div className='header'>
        <h1>Think you know <span>Me</span>?</h1>
        <p>Try out this quiz and see how you do!</p>
      </div>

      <h3 className='title'> Current <span>Question</span>: {questionDetails[0]} </h3>

        <div className='questions'>
          <div className='options' id="option1" onClick={() => isCorrect("option1", questionDetails[2], questionDetails[1])}>{questionDetails[2]}</div>
            <div className='options' id="option2" onClick={() => isCorrect("option2", questionDetails[3], questionDetails[1])}>{questionDetails[3]}</div>
            <div className='options' id="option3" onClick={() => isCorrect("option3", questionDetails[4], questionDetails[1])}>{questionDetails[4]}</div>
            <div className='options' id="option4" onClick={() => isCorrect("option4", questionDetails[5], questionDetails[1])}>{questionDetails[5]}</div>
          </div>
          
          <button id='next' onClick={() => nextQuestion()}>Next</button>
        </div>
  : 
  
    <div id='question-container'>
      <p>{judgeScore(score)}</p>
      <p>Thanks for playing!</p>
    </div>
    
  return (
    <div className="App">
        {data}
    </div>
  );
}

export default App;
