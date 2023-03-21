export const Score = ({score, judgeScore}) => {
  return (
    <div id='question-container'>
      <p>{judgeScore(score)}</p>
      <p>Thanks for playing!</p>
    </div>
  )
}