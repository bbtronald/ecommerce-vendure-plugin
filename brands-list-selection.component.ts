import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  BaseDetailComponent, CustomDetailComponent,
  CustomFieldControl,
  DataService, GetProductWithVariants, LanguageCode, ProductDetail, ProductDetailFragment, ServerConfigService,
  findTranslation, CustomFieldConfig,
} from '@vendure/admin-ui/core';

import {GetCollection} from "../../types";
import {GET_COLLECTION} from "../../ui.graphql";
import {distinctUntilChanged, map, shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';


@Component({
  templateUrl: './brands-list-selection.component.html',
  styleUrls: ['./brands-list-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})


export class BrandsListSelectionComponent extends BaseDetailComponent<ProductDetail.Fragment> implements OnInit, CustomDetailComponent,
    CustomFieldControl {
  
  
  detailForm: FormGroup;
  formBuilder: FormBuilder;
  formControl: FormControl;
  entity$: Observable<any>;
  readonly: boolean;
  config: any;
  collection$: Observable<any>;
  product$: Observable<GetProductWithVariants.Product>;
  protected destroy$ = new Subject<void>();
  id: string;
  customFields: CustomFieldConfig[];
  arr: any = []
  
  constructor(
      route: ActivatedRoute,
      router: Router,
      serverConfigService: ServerConfigService,
      protected dataService: DataService
  ) {
    super(route, router, serverConfigService, dataService);

  }
  
  ngOnInit() {
    this.detailForm = this.formBuilder.group({
      brandsId: [[]],
    });
  
    // this.detailForm = this.formBuilder.group({
    //   brands: this.formBuilder.array(data.map(param =>
    //       this.formBuilder.group({ ...param})
    //   ))
    // });
    
    this.entity$ = this.route.data.pipe(
        switchMap(data => (data.entity as Observable<any>).pipe(takeUntil(this.destroy$))),
        tap(entity => (this.id = entity.id)),
        shareReplay(1),
    );
    
    this.product$ = this.entity$;
    this.collection$ = this.dataService
        .query<GetCollection.Query, GetCollection.Variables>(GET_COLLECTION, {
          slug: 'brands',
        }).mapSingle(data => data.collection)
  

  }
  
  
  /**
   * Sets the values of the form on changes to the product or current language.
   */
  protected setFormValues(product: GetProductWithVariants.Product, languageCode: LanguageCode) {
    console.log('adasdasdasda');
    const currentTranslation = findTranslation(product, languageCode);
    this.detailForm.patchValue({
      product: {
        customFields: {
          brandsIds: ['912i32132', '901-8421321-903']
        },
      },
    });
    
    if (this.customFields.length) {
      this.setCustomFieldFormValues(
          this.customFields,
          this.detailForm.get(['customFields']),
          currentTranslation,
      );
    }
  }
  
 
  
  onCheckboxChange(collections: any, event: any) {
    console.log(collections, 'collections')
    console.log(event.target.checked, 'event')
    const checkArray: [] = [];
    
    // @ts-ignore
    this.detailForm.get('brandsIds').setValue(checkArray);
    

    // const checkArray: FormArray = this.detailForm.get(['product', 'customFields']) as FormArray;
    //
    // if (event.target.checked) {
    //   checkArray.push(new FormControl(event.target.value));
    // } else {
    //   let i: number = 0;
    //   checkArray.controls.forEach((item: any) => {
    //     if (item.value == event.target.value) {
    //       checkArray.removeAt(i);
    //       return;
    //     }
    //     i++;
    //   });
    // }
  }
}

