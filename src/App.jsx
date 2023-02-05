import React from "react";
import Start from "./Start";
import Questions from "./Questions";

export default function App() {
  const [ques, setQues] = React.useState([]);
  const [start,setStart]=React.useState(true)

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setQues(data.results));
  }, []);

  function startKaro(){
    setStart(prevState => !prevState)
  }


  return (
    <main>
      {!start ? (
        <div>
          <img className="img1" src="blobs.png" />
          <div className="question-container">
            <Questions/>    
          </div>
          <img className="img2" src="blob5.png" />
        </div>
      ) : (
        <Start startFunc={() => startKaro}/>
      )}
    </main>
  );
}
