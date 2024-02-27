import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { TypographyP } from "./ui/typographyP";
import Link from "next/link";
import { ButtonIconDown } from "./ui/buttonIconDown";
import { ButtonIconUp } from "./ui/buttonIconUp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Image } from "semantic-ui-react";

export default function RecipeList({ obj }) {
  console.log(obj.recipe);
  const [need, setNeed] = useState(obj.recipe.yield);
  return (
    <Card>
      <CardContent>
        <>
          <Image src={obj.recipe.image} wrapped ui={false} alt="" />
          <CardTitle>{obj.recipe.label}</CardTitle>
          <Link href={obj.recipe.url}>View Recipe</Link>
        </>
        <div className="flex">
          <CardDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <div className="flex items-center justify-evenly">
                    <ButtonIconUp
                      onClick={() => {
                        setNeed(need + 1);
                      }}
                    />
                    <TypographyP>
                      {obj.recipe.yield == 0 ? "serves 1" : `serves ${need}`}
                    </TypographyP>
                    <ButtonIconDown
                      onClick={() => {
                        setNeed(need - 1);
                      }}
                    />
                  </div>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {obj.recipe.ingredients.map((ing) => (
                  <TableRow key={ing.foodId}>
                    <TableCell>
                      <Card>
                        <CardContent className="space-y-2">
                          <Image src={ing.image} rounded size="mini" alt="" />
                          <CardDescription className="w-max">
                            {ing.food}
                            {ing.measure && ing.measure != "<unit>" && (
                              <CardDescription className="flex">
                                in {ing.measure}
                              </CardDescription>
                            )}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </TableCell>
                    <TableCell>
                      {ing.quantity == 0
                        ? "as required"
                        : (ing.quantity * need) / obj.recipe.yield}
                    </TableCell>
                    <TableCell>
                      {ing.quantity == 0
                        ? "as required"
                        : (ing.quantity * need) / obj.recipe.yield}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}

//   <Image src={obj.recipe.image} wrapped ui={false} alt="" /> DONE
//   <Card.Content>
//     <Card.Header>{obj.recipe.label}</Card.Header> DONE
//     <a
//       rel="noreferrer" DONE
//       target="_blank"
//       className="border-b border-blue-200 text-blue-600"
//       href={obj.recipe.url}
//     >
//       View Recipe DONE
//     </a>
//     <div className="flex">
//       <Button
//         size="tiny"
//         onClick={() => {
//           setNeed(need + 1);
//         }}
//       >
//         <Icon size="large" name="angle up"></Icon>
//       </Button>
//       <span>{obj.recipe.yield == 0 ? "serves 1" : `serves ${need}`}</span>
//       <Button
//         size="tiny"
//         disabled={need <= 1}
//         onClick={() => {
//           setNeed(need - 1);
//         }}
//       >
//         {" "}
//         <Icon size="large" name="angle down"></Icon>
//       </Button>
//     </div> DONE

//     <Card.Description>
//       <Table basic="very" celled collapsing>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Ingredient</Table.HeaderCell>
//             <Table.HeaderCell>Quantity</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {obj.recipe.ingredients.map((ing) => (
//             <Table.Row key={ing.foodId}>
//               <Table.Cell>
//                 <Header as="h4" image>
//                   <Image src={ing.image} rounded size="mini" alt="" />
//                   <Header.Content>
//                     {ing.food}
//                     {ing.measure && ing.measure != "<unit>" && (
//                       <Header.Subheader>in {ing.measure}</Header.Subheader>
//                     )}
//                   </Header.Content>
//                 </Header>
//               </Table.Cell>
//               <Table.Cell>
//                 {ing.quantity == 0
//                   ? "as required"
//                   : (ing.quantity * need) / obj.recipe.yield}
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table>
//     </Card.Description>
//   </Card.Content>
