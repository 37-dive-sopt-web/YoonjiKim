import { Global } from "@emotion/react";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Global
        styles={{ body: { margin: 0, padding: 0, boxSizing: "border-box" } }}
      />
      <Header />
    </>
  );
}

export default App;
