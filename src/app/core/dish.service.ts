import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private baseUrl = 'http://localhost:8000/api/v1';
  private dishesUrl = `${this.baseUrl}/dishes`; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl);
  }

  getDishById(dishId: number): Observable<Dish> {
    const url = `${this.baseUrl}/dish/${dishId}`; // Corrected URL for fetching dish by ID
    return this.http.get<Dish>(url);
  }

  createDish(dishData: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.dishesUrl, dishData);
  }

  getDishesByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/dishes`);
  }
}
