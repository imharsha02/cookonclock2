import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { TypographyP } from "./ui/typographyP";
import Link from "next/link";
import { Button } from "./ui/button";
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
          <Image src={obj.recipe.image} wrapped ui={false} alt="" className="mb-2" />
          <CardTitle className="mb-2">{obj.recipe.label}</CardTitle>
          <Button asChild>
            <Link href={obj.recipe.url}>View Recipe</Link>
          </Button>
        </>
        <CardDescription className="flex mt-2">
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
      </CardContent>
    </Card>
  );
}
