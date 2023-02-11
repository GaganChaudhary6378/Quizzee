import React from "react";
import App from "./App";
import { nanoid } from "../nanoid/index.browser";

export default function Questions(props) {
  const [finalArr, setNewArr] = React.useState([]);
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  React.useEffect(() => {
    let answers = props.options[0];
    answers.push(props.options[1]);
    let newArr = [];
    let temp = answers.map((items) => {
      newArr.push({ value: items });
    });
    setNewArr(newArr);
  },[]);

  const answerElements = finalArr.map((items) => {
    let id = null;
    if (props.q.isHeld) {
      if (props.q.correct === items) {
        id = "correct";
      } else if (props.q.selected === items) {
        id = "incorrect";
      } else {
        id = "not-selected";
      }
    }
    return (
      <button
        key={nanoid()}
        id={id}
        className={items === props.q.selected ? "answer-chosen" : "btn-el"}
        onClick={() => handleClick(items)}
      >
        {items.value}
      </button>
    );
  });
  function handleClick(item) {
    if (props.q.checked) {
      return;
    }
    props.isHold(props.id, item);
  }

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
