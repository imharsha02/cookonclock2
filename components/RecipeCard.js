import {useState, useEffect} from 'react'
import { Card, Icon, Image, Table, Header, Button } from 'semantic-ui-react'
function precise(x) {
    return Number.parseFloat(x).toPrecision(1);
  }
export default function RecipeList({obj}) {
    console.log(obj.recipe)
    const [need, setNeed] = useState(obj.recipe.yield) 
    return (
        <Card >
            <Image src={obj.recipe.image} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{obj.recipe.label}
            </Card.Header>
            <a target="_blank" className="border-b border-blue-200 text-blue-600" href={obj.recipe.url}>View Recipe</a>
            <div className='flex'>
                

                <Button size='tiny'  onClick={() => {setNeed(need+1)}}><Icon size='large' name='angle up'></Icon></Button>
                <span>{obj.recipe.yield == 0 ? "serves 1" : `serves ${need}`}</span>
                <Button size='tiny' disabled = {need <= 1} onClick={() => {setNeed(need-1)}}> <Icon size='large' name='angle down'></Icon></Button>
            </div>
            
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
                        <Table.Row key={ing.foodId}>
                                <Table.Cell>
                                <Header as='h4' image>
                                    
                                    <Image src={ing.image} rounded size='mini' />
                                    <Header.Content>
                                    {ing.food}
                                    {ing.measure && ing.measure != "<unit>" && <Header.Subheader>in {ing.measure}</Header.Subheader>}
                                    </Header.Content>
                                </Header>
                                </Table.Cell>
                                <Table.Cell>{ing.quantity == 0 ? "as required" : precise((ing.quantity * need) / obj.recipe.yield)}</Table.Cell>
                        </Table.Row>   
                    )}
                </Table.Body>
                </Table>
            </Card.Description>
            
            </Card.Content>
        </Card>
    )

}

