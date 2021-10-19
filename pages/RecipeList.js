import { withRouter } from "next/router";
function RecipeList(props) {
    return (
        <>
            <style jsx>
                {
                    `
                    h1{
                        text-align:center;
                        font-size:2.5rem;
                        margin:0px 0px 2px 0px;
                    }
                `
                }
            </style>
            <h1>{props.router.query.q}</h1>
        </>
    )
}

export default withRouter(RecipeList)