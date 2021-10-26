import UserSearch from "./Components/userSearch";
import UserDetails from "./Components/userDetails";
import Navbar from "./Components/navBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar />
          <div className="App">
          <Switch>
            <Route exact path="/" component={UserSearch} />
            <Route exact path="/:username" component={UserDetails} />
            </Switch>
          </div>
      </Router>
    </>
  );
}

export default App;
