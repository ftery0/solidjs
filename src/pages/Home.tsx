import { A } from "@solidjs/router";
import { user, setUser } from "../stores/user";
import { createSignal, createEffect, createMemo } from "solid-js";
import Nav from "../ui/nav";

export default function Home() {
  
  const [name, setName] = createSignal(user.name);
  const [age, setAge] = createSignal(user.age);
  const [email, setEmail] = createSignal(user.email);

  
  const updateUser = () => {
    setUser("name", name());
    setUser("age", age());
    setUser("email", email());
  };

  return (
    <div>
        <Nav/>
      <h1>Home Page</h1>

      <div>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Age:{" "}
          <input
            type="number"
            value={age()}
            onInput={(e) => setAge(Number(e.currentTarget.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Email:{" "}
          <input
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
      </div>

      <button onClick={updateUser}>Save Profile</button>
    </div>
  );
}
