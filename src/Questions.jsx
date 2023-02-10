import React from "react";
import { nanoid } from "../nanoid/index.browser";

export default function Questions(props) {
    let answers = props.options[0];
    answers.push(props.options[1])
    console.log(answers)
    const answerElements=answers.map((items) => {
        return (
            <button className="btn-el">{items}</button>
        )
    })
    return (
        <div>
            <h3 className="question-el">{props.q}</h3>
            <div className="option-el">{answerElements}</div>
        </div>
  );
}
