import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishService } from '../../core/dish.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './chef-page.component.html',
})
export class ChefPageComponent implements OnInit {
  dishForm: FormGroup;
  dishes: Dish[] = [];
  userId: string = localStorage.getItem('userId') || '';

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.dishForm = this.fb.group({
      dishes: this.fb.array([this.createDishFormGroup()])
    });
  }

  ngOnInit(): void {
    // this.loadAllDishes();
  }

  createDishFormGroup(): FormGroup {
    return this.fb.group({
      dish_name: ['', Validators.required],
      dish_type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  deleteDish(index: number) {
    this.dishesFormArray.removeAt(index);
  }

  get dishesFormArray(): FormArray {
    return this.dishForm.get('dishes') as FormArray;
  }

  addDishForm(): void {
    this.dishesFormArray.push(this.createDishFormGroup());
  }

  createDish(index: number): void {
    const dishFormGroup = this.dishesFormArray.at(index);
    if (dishFormGroup.valid) {
      const newDish: Dish = {
        user_id: this.userId,
        ...dishFormGroup.value,
      };

      this.dishService.createDish(newDish).subscribe(
        (createdDish: Dish) => {
          this.toastr.success('Dish created successfully');
          this.dishes.push(createdDish); // Optionally add the created dish to the list
          dishFormGroup.reset(); // Reset the form group after successful creation
        },
        (error: any) => {
          console.error('Error creating dish:', error);
        }
      );
    }
  }

  onSubmit(): void {
    // Iterate over each form group in the FormArray and submit
    this.dishesFormArray.controls.forEach((_, index) => {
      this.createDish(index);
    });
  }
}