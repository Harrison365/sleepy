import "./App.css";
import { useState } from "react";
import apiCall from "../utils/apiCall";
import LocalApiCall from "../utils/localApiCall";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [response, setResponse] = useState("Please make your API call :)");
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("https://jsonplaceholder.typicode.com/posts", {
    username: "grumpy19",
    body: "This is my pushed comment",
  });
  console.log(method, url, requestBody);

  const fetchData = async () => {
    if (!url) {
      setResponse("URL is required");
    } else {
      setIsLoading(true);
      if (/local/.test(url)) {
        await LocalApiCall(method, url, setResponse, requestBody);
      } else {
        await apiCall(method, url, setResponse, requestBody);
      }
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div>
        <h1>Difficulty Sleeping</h1>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <h1>Difficulty Sleeping</h1>
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
      <button
        onClick={() => {
          setUrl("");
        }}
      >
        Clear
      </button>
      <br />
      {method === "patch" || method === "post" ? (
        <textarea
          value={requestBody}
          onChange={(e) => {
            setRequestBody(e.target.value);
          }}
        ></textarea>
      ) : null}

      {/* code block */}
      <div style={{ overflow: "auto", height: "50%" }}>
        <SyntaxHighlighter language="json" style={vscDarkPlus}>
          {JSON.stringify(response, null, 2)}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default App;
