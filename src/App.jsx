import React from "react";
import Start from "./Start";
import Questions from "./Questions";
import { nanoid } from "../nanoid/index.browser";

export default function App() {
  const [ques, setQues] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.results.map((item) => {
          arr.push({id:nanoid(),answers:[item.incorrect_answers,item.correct_answer],question:item.question});
        });
        setQues(arr);
      });
  }, [count]);


  const questionElement = ques ? ques.map(question =>{
    return(
      <Questions
       key={question.id}
       options={question.answers}
       q={question.question}
       id={question.id}
      />
    )
   }) : []

  function startKaro() {
    setStart((prevState) => !prevState);
  }

  return (
    <main>
      {start ? (
        <div>
          <img className="img1" src="blobs.png" />
          <div className="question-container">{questionElement}</div>
          <img className="img2" src="blob5.png" />
        </div>
      ) : (
        <Start startFunc={() => startKaro} />
      )}
    </main>
  );
}
