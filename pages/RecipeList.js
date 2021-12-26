import { withRouter } from "next/router";
import {useState, useEffect} from 'react'
import { Card, Icon, Image, Table, Header } from 'semantic-ui-react'

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
                            {/* {res.hits.map(obj => <div>
                                <h1>{obj.recipe.label}</h1>
                                {obj.recipe.ingredients.map(ing => <div>
                                    <h4>{ing.food}</h4>
                                    
                                </div>)}
                            </div>)} */}
                            {res.hits.map(obj => <Card>
                                <Image src={obj.recipe.image} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>{obj.recipe.label}</Card.Header>
                                <Card.Description>
                                    <Table basic="very" celled collapsing>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Ingredient</Table.HeaderCell>
                                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                    
                                        {obj.recipe.ingredients.map(ing => 
                                         <Table.Row>
                                                    <Table.Cell>
                                                    <Header as='h4' image>
                                                        <Image src={ing.image} rounded size='mini' />
                                                        <Header.Content>
                                                        {ing.food}
                                                        {ing.measure && ing.measure != "<unit>" && <Header.Subheader>in {ing.measure}</Header.Subheader>}
                                                        </Header.Content>
                                                    </Header>
                                                    </Table.Cell>
                                                    <Table.Cell>{ing.quantity == 0 ? "as required" : ing.quantity}</Table.Cell>
                                            </Table.Row>   
                                        )}
                                    </Table.Body>
                                    </Table>
                                </Card.Description>
                                
                                </Card.Content>
                            </Card>)}
                        </div>
                    ) }
                </div>
            )}
        </>
    )
}

export default withRouter(RecipeList)