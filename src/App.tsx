import "./App.css";
import { useState } from "react";
import apiCall from "../utils/apiCall";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [response, setResponse] = useState();
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState("");

  console.log(method, url);
  const fetchData = async () => {
    try {
      apiCall(method, url, setResponse);
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
      <br />
      {method === "patch" || method === "post" ? <textarea></textarea> : null}
      {/* code block */}
      <div style={{ overflow: "auto", maxHeight: "600px" }}>
        <SyntaxHighlighter language="json" style={vscDarkPlus}>
          {JSON.stringify(response, null, 2)}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default App;
