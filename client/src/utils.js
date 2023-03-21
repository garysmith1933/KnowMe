import React from "react";

export const assignNumber = (set) => {
  const random = Math.floor(Math.random() * set.size)
  const res = Array.from(set)[random]
  set.delete(res)
  return res
}

export const judgeScore = (score) => {
  const scores = {
    0: '0/5...uhhh how did you get 0, there is literally 5 questions with 4 options each and somehow you guessed wrong EVERY SINGLE TIME!? HOWWWWW!?!?',
    1: '1/5 Hey you got 1...NOW GO GET MORE!', 
    2: '2/5 Meh, you can do better.',
    3: '3/5 You got more right than you did wrong! Not bad, but not great either!',
    4: '4/5 Off by one, but 4 is pretty dang good',
    5: '5/5 You got them all right!! You"re not stalking me are you?'
  }

  return scores[score]
}
