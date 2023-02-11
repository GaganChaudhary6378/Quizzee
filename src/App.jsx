import React from "react";
import Start from "./Start";
import Questions from "./Questions";
import Confetti from "react-confetti";
import { nanoid } from "../nanoid/index.browser";

export default function App() {
  const [ques, setQues] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [isHeld,setHeld]=React.useState(false)
  const [correct,setCorrect]=React.useState(0)

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        let arr = [];
        data.results.map((item) => {
          arr.push({id:nanoid(),answers:[item.incorrect_answers,item.correct_answer],question:item.question,correct:item.correct_answer,selected:null,isHeld:false});
        });
        // console.log(data.results)
        setQues(arr);
      });
  }, [count]);


  const questionElement = ques ? ques.map(question =>{
    return(
      <Questions
       key={question.id}
       options={question.answers}
       q={question}
       id={question.id}
    //    isHeld={question.isHeld}
       isHold={isHold}
      />
    )
   }) : []
//    console.log(ques
  function startKaro() {
    setStart((prevState) => !prevState);
  }

  function handleCheck(){
    let selected=true;
    ques.forEach(question => {
        if(question.selected==null){
            selected=false
            return 
        }
        if(!selected){
            return 
        }
        setQues(ques => ques.map(question => {
            return {...question,isHeld:true}
        }))
    })
    setHeld(true)
    let correct=0
    ques.forEach(question => {
        if(question.correct===question.selected.value){
            correct=correct+1;
        }
    })
    setCorrect(correct)
    // console.log(correct)
  }
//   console.log(correct)
  function isHold(id,answer){
    // console.log(id); 
    // setQues(ques => ques.map(question =>{
    //     return id === answer.id ? {...question, isHeld: !question.isHeld} : question
    //   }))
    //   console.log(ques)
    setQues(ques => ques.map(question =>{
        return question.id === id ? {...question, selected: answer} : question
      }))
  }
//   console.log(ques)
  return (
    <main>
        {isHeld && <Confetti/>}
      {start ? (
        <div>
          <img className="img1" src="blobs.png" />
          <div className="question-container">{questionElement}</div>
          <img className="img2" src="blob5.png" />
          <button onClick={handleCheck} className="check-el">Check answers</button>
          {isHeld && <p className="check-ans">You scored {correct} /5 correct answers </p>}
        </div>
      ) : (
        <Start startFunc={() => startKaro} />
      )}
    </main>
  );
}
