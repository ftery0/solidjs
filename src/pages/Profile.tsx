import { A } from "@solidjs/router";
import { user } from "../stores/user";

export default function Profile() {
  return (
    <div>
        <nav>
        <A href="/">Home</A> | <A href="/profile">Profile</A>
      </nav>
      <h1>Profile Page</h1>
      <h2>Profile Info</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}