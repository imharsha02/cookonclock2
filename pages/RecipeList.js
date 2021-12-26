import { withRouter } from "next/router";
import {useState, useEffect} from 'react'


function RecipeList(props) {
    const [res, setRes] = useState({});
    const [error, setError] = useState('');
    const getData = async() => {
        fetch("https://api.edamam.com/api/recipes/v2?type=public&q=egg&app_id=67e0e669&app_key=401c79fd1cbca14687587eea063de9ae&ingr=1-8")
        .then((response)=> {
            return response.json()
        }).then(data => {
            console.log(data)
            setRes(data)
        }).catch(error => {
            setError(`${error}`)
        })       
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            {Object.keys(res).length == 0 ? (
                error == '' ? (
                    <>
            <h1>{props.router.query.q}</h1>
            <p>loading please wait</p>
                </>
                ) : (
                    <p>{error}</p>
                )
            ): (
                <div>
                    {console.log(res)}
                    {res.hits&& res.hits.length>0 && (
                        <div>
                            {res.hits.map(obj => <div>
                                {obj.recipe.ingredients.map(ing => <div>
                                    <h1>{ing.food}</h1>
                                    
                                </div>)}
                            </div>)}
                        </div>
                    ) }
                </div>
            )}
        </>
    )
}

export default withRouter(RecipeList)