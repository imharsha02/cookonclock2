import { withRouter } from "next/router";
import {useState, useEffect} from 'react'


function RecipeList(props) {
    const [res, setRes] = useState({});
    const getData = async() => {
        fetch("https://api.edamam.com/api/recipes/v2?type=public&q=egg&app_id=67e0e669&app_key=401c79fd1cbca14687587eea063de9ae&ingr=1-8")
        .then((response)=> {
            return response.json()
        }).then(data => {
            console.log(data)
            setRes(data)
        })
        
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            {res == {} ? (
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
            ): (
                <div>
                    yo{res.hits&& res.hits.length>0 && res.hits.length }
                </div>
            )}
        </>
    )
}

export default withRouter(RecipeList)