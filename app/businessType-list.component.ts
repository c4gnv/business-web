import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BusinessTypeService } from './businessTypes.service';
import { BusinessCategory } from './businessCategory';

@Component({
  selector: 'businesstype-list',
  template: `
  <section>
    <section *ngIf="isLoading && !errorMessage">
    Retrieving data from data.cityofgainesville.org...
    </section>
      <div class="business-categories">
          <!-- this is the new syntax for ng-repeat -->
          <div class="business-category" *ngFor="let businessCategory of businessCategories | async">
            {{businessCategory.name}}
            <div class="business-type" *ngFor="let businessType of businessCategory.businessTypes">
                {{businessType.business_type}}
                <div class="permit" *ngFor="let permit of businessType.permits">
                    {{permit.friendly_name}}
                </div>
            </div>
          </div>
      </div>
      <section *ngIf="errorMessage">
        {{errorMessage}}
      </section>
  </section>
  `
})
export class BusinessTypeListComponent implements OnInit {
    bar: any;
    businessCategories: Observable<BusinessCategory[]>;
    errorMessage: string = '';
    isLoading: boolean = true;

    constructor(private businessTypesService: BusinessTypeService) {}

    ngOnInit() {
        this.businessCategories = this.businessTypesService.getBusinessCategories();

        this.businessCategories.subscribe(
            () => {},
            error => this.errorMessage = error,
            () => this.isLoading = false
        );
    }
}
