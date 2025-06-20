import { Router, Route,  A } from "@solidjs/router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
    </>
  );
}
