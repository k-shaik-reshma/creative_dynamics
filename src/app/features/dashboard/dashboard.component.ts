import { Component, OnInit } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { DishService } from '../../core/dish.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ SidebarComponent, CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService) {}

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
}
