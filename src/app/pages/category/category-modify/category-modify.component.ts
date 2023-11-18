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
  // Define FormGroup to manage form controls and validation for category data.
  formGroup: FormGroup;

  // Flag to determine if the component is in 'edit' mode, default is false.
  isEdit = false;

  // Variable to store the category ID when in 'edit' mode.
  categoryId!: number;

  /**
   * Constructor to inject necessary services.
   * @param categoryControllerService Service to handle category-related operations.
   * @param router Angular Router for navigation.
   * @param activatedRoute ActivatedRoute to access route parameters.
   */
  constructor(
    private categoryControllerService: CategoryControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Initialize the form group with controls for 'active' and 'name'.
    // 'active' is a boolean field and 'name' is a required text field.
    this.formGroup = new FormGroup({
      active: new FormControl(false, Validators.required),
      name: new FormControl('', Validators.required)
    });
  }

  /**
   * ngOnInit lifecycle hook to perform component initialization.
   */
  ngOnInit(): void {
    // Extract the 'id' parameter from the route, if available.
    const id = this.activatedRoute.snapshot.params['id'];

    // Check if an 'id' is present, indicating edit mode.
    if (id) {
      this.isEdit = true; // Set the component to 'edit' mode.

      // Fetch the category details by ID from the category service.
      this.categoryControllerService.getCategoryById(id).subscribe(category => {
        // Update the form group with the fetched category data.
        this.formGroup.patchValue(category);
        // Store the fetched category's ID.
        this.categoryId = category.id;
      });
    }
  }
  /**
   * Handles the submission of the category form.
   */
  submit(): void {
    // Check if the form is valid.
    if (this.formGroup.valid) {
      // Extract the data from the form.
      const categoryData = this.formGroup.value;

      // Check if the component is in 'edit' mode.
      if (this.isEdit) {
        // If in 'edit' mode, call the updateCategoryById method from the service.
        // Pass the categoryId and the updated category data for the request.
        this.categoryControllerService.updateCategoryById(this.categoryId, categoryData).subscribe(() => {
          // After successful update, navigate to the category list view.
          this.router.navigate(['/categories/list']);
        });
      } else {
        // If not in 'edit' mode, call the createCategory method to create a new category.
        this.categoryControllerService.createCategory(categoryData).subscribe(() => {
          // After successful creation, navigate to the category list view.
          this.router.navigate(['/categories/list']);
        });
      }
    } else {
    }
  }
}
