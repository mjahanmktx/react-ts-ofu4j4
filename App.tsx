import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './style.css';
import ChildComponent from './ChildComponent';

export default function App() {
  const [count, setCount] = React.useState(0);
  const [inputText, setInputText] = React.useState('');
  const [historyList, setHistoryList] = React.useState([]);
  const [users, setUsers] = useState([]);

  const memotizeChildComponent = React.useMemo(() => <ChildComponent />, []);
  const imageRef = useRef(null);
  const primaryImage =
    'https://images.freeimages.com/images/large-previews/46e/red-beetle-1416148.jpg';
  const secondaryImage =
    'https://images.freeimages.com/images/large-previews/218/my-dog-cutter-1499799.jpg';

  console.log('useRef', imageRef);
  console.log('Text Array: ', inputText);

  async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const users = await response.json();
    setUsers(users);
  }

  useEffect(() => {
    console.log('useEffect called');
    getUsers();
  }, [inputText]);

  return (
    <div>
      {memotizeChildComponent}
      <img
        onMouseOver={() => {
          imageRef.current.src = secondaryImage;
        }}
        onMouseOut={() => (imageRef.current.src = primaryImage)}
        src={primaryImage}
        alt=""
        ref={imageRef}
      />
      <h1>Let's Count!</h1>
      <button onClick={() => setCount(count + 1)}>+ 1</button>
      <button onClick={() => setCount(count - 1)}>- 1</button>
      <br />
      <h4>{count}</h4>

      <input
        type="text"
        placeholder="Enter some text."
        onChange={(evt) => {
          setInputText(evt.target.value);
          setHistoryList([...historyList, evt.target.value]);
        }}
      />

      {users.map((user, index) => (
        <p key={index}>{user.username}</p>
      ))}
      <ul>
        {historyList.map((record, index) => (
          <div key={index}>
            {index}: {record}
          </div>
        ))}
      </ul>
    </div>
  );
}
