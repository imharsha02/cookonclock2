import { withRouter } from "next/router";
import {useState, useEffect} from 'react'
import { Card, Icon, Image, Table, Header, Form, Message, Button } from 'semantic-ui-react'
import RecipeCard from "../components/RecipeCard";
import useForm from "../hooks/useForm";

function validate (values) {
    let nameRule = /^[a-z A-Z]([-']?[a-z A-Z]+)*( [a-z A-Z]([-']?[a-z A-Z]+)*)*$/
    let errors = {}
    if(!values.item) {
        errors.item = "Enter an ingredient or food item to search for"
    } else if (!nameRule.test(values.item)) {
        errors.item = "item is invalid"
    }
    // if(!values.name) {
    //     errors.name = "Name is required"
    // }else if(!nameRule.test(values.name)) {
    //     errors.name = "name can only contain letters"
    // }
    // if(values.phone && !
    //     /^\d{10}$/.test(values.phone)) {
    //         errors.phone = "phone number invalid"
    // }
    // if(!values.tAndC) {
    //     errors.tAndC = "agree to Terms and Conditions to proceed"
    // }
    return errors
}
function RecipeList(props) {
    
    const [res, setRes] = useState({});
    const [error, setError] = useState('');
    const [searchState, setSearchState] = useState('toSearch')
    const [mostSearched, setMostSearched] = useState([])
    const getData = async() => {
        setSearchState('loading')
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${values.item}&app_id=67e0e669&app_key=401c79fd1cbca14687587eea063de9ae&ingr=1-8`)
        .then((response)=> {
            setSearchState('success')
            return response.json()
        }).then(data => {
            console.log(data)
            setRes(data)
        }).catch(error => {
            setSearchState('error')
            setError(`${error}`)
        })
             
    }
    const {values, errors, handleSubmit, handleChange} = useForm(getData, validate)
    console.log(errors.item)

    useEffect(() => {
        if(res && values && values.item) {
            fetch(`/api/newUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: JSON.stringify({name: values.item})
            }).then(res => {
                return res.json()
            })
        }
    }, [res]) 
    useEffect((async() => {
        await fetch('/api/newUser/most').then(res => res.json()).then(data => {
            setMostSearched(data.data)
        })
    }), []) 
    console.log(mostSearched)
    return (
        <>
            <h1 className="text-4xl font-bold text-center p-12">Recipes</h1>
            <div className="m-12">
                <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-4">
                <input className={` px-4 py-2 w-80 border-2 rounded-md`} name="item" placeholder="pizza" value={values.item || ""} onChange={handleChange} ></input>
                {errors.length>0 && <h4 className="text-red-600 text-sm">{errors.item}</h4>}
                <button type="submit" className="bg-pink-200 p-2 hover:bg-pink-100 rounded-md">Go</button>
                </form>
            </div>
            <div className="m-12 flex flex-wrap items-center justify-center">
                commmon searches
                {mostSearched && mostSearched.length> 0 && mostSearched.map(m => (
                    <div className="bg-gray-100 p-4 rounded-full space-x-1.5 m-4" key={m._id}><span>{m.name}</span><span>(by {m.count} users)</span></div>
                ))}
            </div>
            { searchState !== 'toSearch' &&
            (Object.keys(res).length == 0 ? (
                error == '' ? (
                    <>
            <p>loading please wait</p>
                </>
                ) : (
                    <p>{error}</p>
                )
            ): (
                <div>
                    {console.log(res)}
                    {res.hits&& res.hits.length>0 && (
                        <div className="flex flex-wrap space-x-8 space-y-8 p-20 justify-around">
                            {/* {res.hits.map(obj => <div>
                                <h1>{obj.recipe.label}</h1>
                                {obj.recipe.ingredients.map(ing => <div>
                                    <h4>{ing.food}</h4>
                                    
                                </div>)}
                            </div>)} */}
                            {res.hits.map(obj => <div key={obj.recipe.url} className="w-96"><RecipeCard obj={obj} /> </div>)}
                        </div>
                    ) }
                </div>
            ))
                        }
        </>
    )
}

export default withRouter(RecipeList)