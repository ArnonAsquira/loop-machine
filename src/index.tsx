import { render } from "react-dom";
import App from "./App";
import "./css/main.css";

const Index = () => {
  return <App />;
};

render(<Index />, document.getElementById("root"));
