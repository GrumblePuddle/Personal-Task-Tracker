import { useState } from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";

type Task = { id: number; text: string; done: boolean };

function App() {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<Task[]>([]);
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

  const handleTaskTextChange = (id: number, newText: string) => {
    setList((l) =>
      l.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
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
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Task"
        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
      />
      <button
        onClick={addTask}
        className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
      >
        Add to list
      </button>
      {list.map((item, index) => (
        <div key={item.id}>
          <input
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            type="text"
            value={item.text}
            onChange={(e) => handleTaskTextChange(item.id, e.target.value)}
          />
          <button
            onClick={() => removeTask(index)}
            className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset"
          >
            remove task
          </button>
          <p
            onClick={() => toggleTaskDone(item.id)}
            style={{ color: item.done ? "green" : "red" }}
            className="size-6 bg-gray-100 rounded-md px-2 py-1"
          >
            {item.done ? <VscCheck /> : <VscChromeClose />}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
