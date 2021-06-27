import { useState } from 'react';
import './App.css';
import readingLessions from "./text.json"

const MAX_SINGLE = 10
const MAX_QUESTIONS = 10

function randomNumber(max, min = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function generateQuestion() {
  const a = randomNumber(MAX_SINGLE)
  const b = randomNumber(MAX_SINGLE)
  const sum = a + b
  const c = randomNumber(3, 0)
  const result = [a, b, sum]
  result[c] = null;
  return result;
}

function generateMultiQuestions(length) {
  const result = [];
  for (let index = 0; index < length; index++) {
    result.push(generateQuestion())
  }
  return result;
}

function App() {
  const [step, setStep] = useState(0)
  const [testingType, setTestingType] = useState(0)
  if (step === 0) {
    return <FirstStep choose={(choose) => {
      setStep(1);
      setTestingType(choose);
    }} />;
  }
  const questions = generateMultiQuestions(MAX_QUESTIONS)
  let testingBody = null;
  switch (testingType) {
    case 0:
      testingBody = <TableSum questions={questions} />;
      break;
    case 1:
      testingBody = <TableSub questions={questions} />;
      break;
    case 2:
      testingBody = <ReadingLessions />;
      break;
    default:
      testingBody = <TableSum questions={questions} />;
      break;
  }
  return (
    <div className="App">
      {testingBody}
    </div>
  );
}

function ReadingLessions() {
  const [readingLessionIndex, setReadingLessionIndex] = useState(null)
  const [randomSeed, setRandomSeed] = useState(0)
  const lessionContent = readingLessions[readingLessionIndex]
  return (
    <div>
      <div className="reading-lessions-selector">
        {readingLessions.map((_, index) => (<button key={index} onClick={() => {
          setRandomSeed(Math.random())
          setReadingLessionIndex(index);
        }
        }>{index + 1}</button>))}
      </div>
      <div className="hidden">
        {randomSeed}
      </div>
      {lessionContent && <div className="reading-lession-content">
        {lessionContent.sort(() => Math.random() - 0.5).slice(0, 5).map(r => (<div key={r}>{r}</div>))}
      </div>
      }
    </div>
  )
}

function FirstStep({ choose }) {
  return <div className="first-step-container">
    <button onClick={() => choose(0)}>+</button>
    <button onClick={() => choose(1)}>-</button>
    <button onClick={() => choose(2)}>Aa</button>
  </div>
}

function Cell({ value }) {
  if (value === null) {
    return <input type="number" className="hint" />
  }
  return <div>{value}</div>
}

function TableSum({ questions }) {
  // const rows = []
  // for (let index = 0; index < questions.length; index++) {
  //   const element = questions[index];
  //   console.log(rows);

  //   if (index % 2 === 0) {
  //     rows.push([element])
  //   } else {
  //     rows[rows.length - 1].push(element)
  //   }
  // }
  return (
    <div className="App">
      <table>
        <tbody>
          {questions.map((r, index) => (
            <tr key={index}>
              <td >
                <div className="question-container">
                  <Cell value={r[0]} />&nbsp;
                  <div>+</div>&nbsp;
                  <Cell value={r[1]} />&nbsp;
                  <div>=</div>&nbsp;
                  <Cell value={r[2]} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSub({ questions }) {
  // const rows = []
  // for (let index = 0; index < questions.length; index++) {
  //   const element = questions[index];
  //   console.log(rows);

  //   if (index % 2 === 0) {
  //     rows.push([element])
  //   } else {
  //     rows[rows.length - 1].push(element)
  //   }
  // }
  return (
    <div className="App">
      <table>
        <tbody>
          {questions.map((r, index) => (
            <tr key={index}>
              <td >
                <div className="question-container">
                  <Cell value={r[2]} />&nbsp;
                  <div>-</div>&nbsp;
                  <Cell value={r[1]} />&nbsp;
                  <div>=</div>&nbsp;
                  <Cell value={r[0]} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
