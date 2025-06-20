import { A } from "@solidjs/router";
import { user } from "../stores/user";
import Nav from "../ui/nav";

export default function Profile() {
  return (
    <div>
      <Nav/>
      <h1>Profile Page</h1>
      <h2>Profile Info</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}