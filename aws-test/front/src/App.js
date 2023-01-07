import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./about/About";
import Admin from "./Admin/Admin";
import "./App.css";
import Main from "./home/Main";
import Header from "./shared/UI/Header";
import Nav from "./shared/UI/Nav";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
