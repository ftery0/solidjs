import { Router, Route, A } from "@solidjs/router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Study from "./study";
import Nav from "./ui/nav";


export default function App() {
  return (
    <>
      <Nav />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/study" component={Study} />
      </Router>
    </>
  );
}
