import React, {useState} from 'react';
import './styles.scss'

function App () {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        App
      </div>
      <p>
        Count: {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </p>
    </>
  )
}

export default App;