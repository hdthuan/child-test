import './App.css';

const MAX_SINGLE = 10
const MAX_QUESTIONS = 10
const isSumTest = true;

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
  const questions = generateMultiQuestions(MAX_QUESTIONS)
  return (
    <div className="App">
      {isSumTest ? <TableSum questions={questions} /> : <TableSub questions={questions} />}
    </div>
  );
}

function Cell({ value }) {
  if (value === null) {
    return <input className="hint" />
  }
  return <div>{value}</div>
}

function TableSum({ questions }) {
  const rows = []
  for (let index = 0; index < questions.length; index++) {
    const element = questions[index];
    console.log(rows);

    if (index % 2 === 0) {
      rows.push([element])
    } else {
      rows[rows.length - 1].push(element)
    }
  }
  return (
    <div className="App">
      <table>
        <tbody>
          {rows.map((qs, index) => (<tr key={index}>
            {qs.map((r, ix) => (
              <td key={ix} >
                <div className="question-container">
                  <Cell value={r[0]} />&nbsp;
                  <div>+</div>&nbsp;
                  <Cell value={r[1]} />&nbsp;
                  <div>=</div>&nbsp;
                  <Cell value={r[2]} />
                </div>
              </td>
            ))}
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

function TableSub({ questions }) {
  const rows = []
  for (let index = 0; index < questions.length; index++) {
    const element = questions[index];
    console.log(rows);

    if (index % 2 === 0) {
      rows.push([element])
    } else {
      rows[rows.length - 1].push(element)
    }
  }
  return (
    <div className="App">
      <table>
        <tbody>
          {rows.map((qs, index) => (<tr key={index}>
            {qs.map((r, ix) => (
              <td key={ix} >
                <div className="question-container">
                  <Cell value={r[2]} />&nbsp;
                  <div>-</div>&nbsp;
                  <Cell value={r[1]} />&nbsp;
                  <div>=</div>&nbsp;
                  <Cell value={r[0]} />
                </div>
              </td>
            ))}
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
