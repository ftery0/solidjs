import { Router, Route,  A } from "@solidjs/router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Nav from "./ui/nav";


export default function App() {
  return (
    <Router>
    <Route path="/" component={Home} />
    <Route path="/profile" component={Profile} />
  </Router>
  );
}
