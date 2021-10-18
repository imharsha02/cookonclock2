import { withRouter } from "next/router";
function Home (props) {
    return (
        <div>
            <h1>{props.router.query.q}</h1>
        </div>
    )
}

export default withRouter(Home)