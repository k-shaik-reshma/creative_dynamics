import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishService } from '../../core/dish.service';
import { AuthService } from '../../core/auth.service'; // Adjust path as needed
import { Router } from '@angular/router';
import { Dish } from '../../models/dish.model';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './chef-page.component.html',
})
export class ChefPageComponent implements OnInit {
  dishForm: FormGroup;
  dishes: Dish[] = [];
  userId: number = 21; // Hardcoded user_id for now, adjust as needed

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private authService: AuthService,
    private router: Router
  ) {
    this.dishForm = this.fb.group({
      dish_name: ['', Validators.required],
      dish_type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllDishes();
  }

  loadAllDishes(): void {
    this.dishService.getAllDishes().subscribe(
      (data: Dish[]) => {
        this.dishes = data;
      },
      (error: any) => {
        console.error('Error fetching dishes:', error);
      }
    );
  }

  createDish(): void {
    if (this.dishForm.valid) {
      const newDish: Dish = {
        user_id: this.userId,
        dish_name: this.dishForm.value.dish_name,
        dish_type: this.dishForm.value.dish_type,
        description: this.dishForm.value.description,
        dish_id: 0,
        full_name: '',
        email: ''
      };

      this.dishService.createDish(newDish).subscribe(
        (createdDish: Dish) => {
          console.log('Dish created successfully:', createdDish);
          this.dishes.push(createdDish); // Optionally add the created dish to the list
          this.dishForm.reset(); // Reset the form after successful creation
        },
        (error: any) => {
          console.error('Error creating dish:', error);
        }
      );
    }
  }

  get dishesFormArray(): FormArray {
    return this.dishForm.get('dishes') as FormArray;
  }

  addDish(): void {
    const newFormGroup = this.fb.group({
      dish_name: ['', Validators.required],
      dish_type: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Add the new form group to an array or directly reset the form
    // Example: If you want to manage multiple entries
    // this.dishFormArray.push(newFormGroup);

    // For simplicity, reset the form directly
    this.dishForm.reset();
  }

  onSubmit(): void {
    if (this.dishForm.valid) {
      this.createDish();
    } else {
      // Handle form validation errors if needed
      console.error('Form is invalid.');
    }
  }
}
