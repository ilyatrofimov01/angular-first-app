import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = []
  private igChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getAllIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients)
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index)
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe()
  }

}
