import { useState } from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";

function App() {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<
    { id: number; text: string; done: boolean }[]
  >([]);
  const [idCounter, setIdCounter] = useState(0);

  const addTask = () => {
    if (input.trim() !== "") {
      setList((l) => [...l, { id: idCounter, text: input, done: false }]);
      setInput("");
      setIdCounter((c) => c + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const removeTask = (index: number) => {
    setList((l) => l.filter((_, i) => i !== index));
  };

  const toggleTaskDone = (id: number) => {
    setList((l) =>
      l.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={addTask}>Add to list</button>
      {list.map((item, index) => (
        <div key={item.id}>
          <li>{item.text}</li>
          <button onClick={() => removeTask(index)}>remove task</button>
          <p
            onClick={() => toggleTaskDone(item.id)}
            style={{ color: item.done ? "green" : "red" }}
          >
            {item.done ? <VscCheck /> : <VscChromeClose />}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
