import React from "react";

export default function Start(props) {
  return (
    <div>
      <img className="img1" src="blobs.png" />
      <div className="container">
        <h2>Quizzical</h2>
        <h3>Some description if needed </h3>
        <button className="start-el" onClick={props.startFunc()}>Start Quiz</button>
      </div>
      <img className="img2" src="blob5.png" />
    </div>
  )
}
