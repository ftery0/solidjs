import { A } from "@solidjs/router";

export default function Nav() {
    return(
        <nav style={{ "margin-bottom": "20px","margin-left": "20px" }}>
            <A href="/">Home</A> 
            <A href="/profile">Profile</A>
        </nav>
    )
}