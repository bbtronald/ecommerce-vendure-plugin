import { NgModule } from "@angular/core";
import { SharedModule } from '@vendure/admin-ui/core';
import { registerFormInputComponent } from "@vendure/admin-ui/core";
import { BrandsListSelectionComponent } from "./components/brands-list-selection/brands-list-selection.component";
import { CategoriesTypeSelectionComponent } from "./components/categories-type-selection/categories-type-selection.component";
import { FacetsListColourSelectionComponent } from "./components/facets-list-colour-selection/facets-list-colour-selection.component";
import { FacetsListMaterialsSelectionComponent } from "./components/facets-list-materials-selection/facets-list-materials-selection.component";
import { FacetsListTypesSelectionComponent } from "./components/facets-list-types-selection/facets-list-types-selection.component";
import { ListSelectionComponent } from "./components/list-selection/list-selection.component";
import { CustomCollectionTreeNodeComponent } from "./components/custom-collection-tree-node/custom-collection-tree-node.component";
import { CustomCollectionTreeComponent } from "./components/custom-collection-tree/custom-collection-tree.component";

@NgModule({
  imports: [SharedModule],
  declarations: [
    BrandsListSelectionComponent,
    CategoriesTypeSelectionComponent,
    FacetsListColourSelectionComponent,
    FacetsListMaterialsSelectionComponent,
    FacetsListTypesSelectionComponent,
    ListSelectionComponent,
    CustomCollectionTreeComponent,
    CustomCollectionTreeNodeComponent
  ],
  providers: [
    registerFormInputComponent('brands-list-selection', BrandsListSelectionComponent),
    registerFormInputComponent('categories-type-selection', CategoriesTypeSelectionComponent),
    registerFormInputComponent('facets-list-colour-selection', FacetsListColourSelectionComponent),
    registerFormInputComponent('facets-list-materials-selection', FacetsListMaterialsSelectionComponent),
    registerFormInputComponent('facets-list-types-selection', FacetsListTypesSelectionComponent),
  ]
})

export class ProductsUiExtensionModule {}
