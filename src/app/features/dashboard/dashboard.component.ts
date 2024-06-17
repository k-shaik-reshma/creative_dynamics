import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../core/dish.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ SidebarComponent, CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllDishes();
  }

  loadAllDishes() {
    this.dishService.getAllDishes().subscribe(
      (data: Dish[]) => {
        this.dishes = data;
      },
      (error: any) => {
        console.error('Error fetching dishes:', error);
      }
    );
  }

  navigateToDish(dishId: number) {
    this.router.navigate(['/dish', dishId]);
  }
}
