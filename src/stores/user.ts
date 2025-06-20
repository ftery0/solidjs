import { createStore } from "solid-js/store";

const [user, setUser] = createStore({
  name: "Lee Haejun",
  age: 30,
  email: "haejun.lee@example.com",
});

export { user, setUser };
