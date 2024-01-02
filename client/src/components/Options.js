

export const Options = ({questionDetails, nextQuestion, isCorrect}) => {
  return (
    <div id='question-container'>
      <div className='header'>
        <h1>Think you <span>Know Me</span>?</h1>
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
  )
}