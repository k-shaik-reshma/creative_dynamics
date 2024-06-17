import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../core/dish.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  standalone: true,
  imports: [ CommonModule, SidebarComponent, ReactiveFormsModule, RouterModule],
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish: Dish | undefined;

  constructor(private route: ActivatedRoute, private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    const dishId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDishDetails(dishId);
  }

  loadDishDetails(dishId: number) {
    this.dishService.getDishById(dishId).subscribe(
      (data: Dish) => {
        this.dish = data;
      },
      (error: any) => {
        console.error('Error fetching dish details:', error);
      }
    );
  }

  navigateToDishes() {
    this.router.navigate(['/dashboard']);
  }
}
