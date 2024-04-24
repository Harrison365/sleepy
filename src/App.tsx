import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [response, setResponse] = useState();
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState("");

  console.log(method, url);
  const fetchData = async () => {
    try {
      const { data } = await axios({
        method,
        url,
      });
      setResponse(data);
    } catch (error: any) {
      setResponse(error.message);
    }
  };

  return (
    <>
      <select
        value={method}
        onChange={(e) => {
          setMethod(e.target.value);
        }}
      >
        <option value="get">GET</option>
        <option value="post">POST</option>
        <option value="patch">PATCH</option>
        <option value="delete">DELETE</option>
      </select>
      {/* input with label */}
      <label htmlFor="url">URL</label>
      <input
        type="text"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetchData();
        }}
      >
        GO!
      </button>
      {/* code block */}
      <pre>
        <code>{JSON.stringify(response, null, 2)}</code>
      </pre>
    </>
  );
}

export default App;
