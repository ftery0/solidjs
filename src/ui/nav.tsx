import { A } from "@solidjs/router";

export default function Nav() {
    return(
        <nav style={{ "margin-bottom": "20px","margin-left": "20px" }}>
            <A href="/">Home</A> 
            <A href="/profile" style={{"margin-left":"20px"}}>Profile</A>
            <A href="/study" style={{"margin-left":"20px"}}>Study</A>
        </nav>
    )
}