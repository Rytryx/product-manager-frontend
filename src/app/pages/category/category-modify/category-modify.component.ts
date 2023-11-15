import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService } from '../../../openapi-client';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-category-modify',
  templateUrl: './category-modify.component.html',
  styleUrls: ['./category-modify.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule
  ]
})
export class CategoryModifyComponent implements OnInit {
  formGroup: FormGroup;
  isEdit = false;
  categoryId!: number;

  constructor(
    private categoryControllerService: CategoryControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      active: new FormControl(false, Validators.required),
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.categoryControllerService.getCategoryById(id).subscribe(category => {
        this.formGroup.patchValue(category);
        this.categoryId = category.id;
      });
    }
  }

  submit(): void {
    if (this.formGroup.valid) {
      const categoryData = this.formGroup.value;
      if (this.isEdit) {
        this.categoryControllerService.updateCategoryById(this.categoryId, categoryData).subscribe(() => {
          this.router.navigate(['/categories/list']);
        });
      } else {
        this.categoryControllerService.createCategory(categoryData).subscribe(() => {
          this.router.navigate(['/categories/list']);
        });
      }
    } else {
    }
  }
}
