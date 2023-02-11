import React from "react";
import App from "./App";
import { nanoid } from "../nanoid/index.browser";

export default function Questions(props) {
    let count=0;
  const [finalArr, setNewArr] = React.useState([]);

  function handleClick(item) {
    if (props.q.checked) {
      return;
    }
    props.isHold(props.id, item);
  }

  React.useEffect(() => {
    let answers = props.options[0];
    answers.push(props.options[1]);
    let newArr = [];
    let temp = answers.map((items) => {
      newArr.push({ value: items });
    });
    setNewArr(newArr);
  },[count]);

  const answerElements = finalArr.map((items) => {
    let id = null;  
    if (props.q.isHeld) {
      if (props.q.correct === items.value) {
        id = "correct";
      } else {
        id = "incorrect";
      }
    }
    return (
      <button
        key={nanoid()}
        id={id}
        className={items === props.q.selected ? 'answer selected' : 'answer'} onClick={() => handleClick(items)}>{items.value}
      </button>
    );
  });

//   console.log(newArr);
  return (
    <div>
      <h3 className="question-el">{props.q.question}</h3>
      <div className="option-el">{answerElements}</div>
      <br></br>
      <hr className="pagebr-el"></hr>
    </div>
  );
}
