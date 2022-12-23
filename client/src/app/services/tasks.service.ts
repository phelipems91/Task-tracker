import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiUrlGetTasks: string = environment.backend + '/api/get/tasks';
  apiUrlGetTask: string = environment.backend + '/api/get/task';
  apiUrlPostTask: string = environment.backend + '/api/post/task';

  constructor(private http: HttpClient, private router: Router) { }

  listAllTasksByOwner(owner: any) : Observable<any>{
    return this.http.get(`${this.apiUrlGetTasks}/all/${owner.username}`);
  }

  listActiveTasksByOwner(owner: any) : Observable<any>{
    return this.http.get(`${this.apiUrlGetTasks}/active/${owner.username}`);
  }

  listTaskById(id: any) : Observable<any>{
    return this.http.get(`${this.apiUrlGetTask}/${id}`);
  }

  createTask(task: any): Observable<any> {
    this.router.navigate(['/tasks']);
    return this.http.post(this.apiUrlPostTask, task);
  }

  editTask(id: any, newTask: any) : Observable<any>{
    let API_URL = `${this.apiUrlPostTask}/${id}`;
    return this.http.post(API_URL, newTask);
  }

  deleteTask(id: any){
    let API_URL = `${this.apiUrlGetTasks}/${id}`;

    return this.http.delete(API_URL);
  }
}
