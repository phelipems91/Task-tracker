import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  user!: any;
  imgSrc!: any;
  tasks:any = [];
  public currentDate = new Date();

  constructor(private authService: AuthService, private tasksService: TasksService, private datepipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.authenticatedUser();
    this.listAllTasks();
  }

  listAllTasks(){
    let owner = this.authService.authenticatedUser();

    this.tasksService.listAllTasksByOwner(owner).subscribe((response)=>{
      this.tasks = response;
    },(error=>{

    }));
  }

  listActiveTasks(){
    let owner = this.authService.authenticatedUser();

    this.tasksService.listActiveTasksByOwner(owner).subscribe((response)=>{
      this.tasks = response;
    },(error=>{

    }));
  }

  convertDateToDay(date: Date): String{
    return this.datepipe.transform(date, 'dd')!;
  }

  convertDateToMonth(date: Date): String{
    return this.datepipe.transform(date, 'MMM')!;
  }

  convertDateToHour(date: Date): String{
    return this.datepipe.transform(date, 'shortTime')!;
  }

  confirmDeleteTask(id: any) {
    if(confirm("Are you sure?")) {
      this.deleteTask(id);
    }
  }

  deleteTask(id: any){
    this.tasksService.deleteTask(id).subscribe((result) => {
      
    });
    window.alert("Task Deleted!");
    window.location.reload();
  }

  handleFilter(event: any){
    if(event.target.id === "btnall") this.listAllTasks();
    else this.listActiveTasks();
  }

}
