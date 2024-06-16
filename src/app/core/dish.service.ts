import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Import your environment configuration
import { Dish } from '../shared/models/dish.model'; // Adjust based on your model

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = `${environment.apiBaseUrl}/api/v1/dishes`; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }
}
