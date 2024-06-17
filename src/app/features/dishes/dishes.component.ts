import { Component, OnInit } from '@angular/core';
import { DishService } from '../../core/dish.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: any[] = [];
  userId: string | null = null; // Adjusted to be nullable for initial state

  constructor(
    private dishService: DishService, 
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch userId from route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.dishService.getDishesByUser(this.userId.toString()).subscribe({
          next: (data: any) => {
            this.dishes = data;
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          }
        });
      }
    });
  }

  navigateToDish(dishId: number) {
    this.router.navigate(['/dish', dishId]);
  }

  navigateToDishes() {
    this.router.navigate(['/dashboard']);
  }
  
}