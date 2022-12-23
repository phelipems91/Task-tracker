import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  task = this.fb.group({
    text: '',
    date: '',
    owner: this.authenticatedUser()
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
  }

  authenticatedUser(): any{
    const user = this.authService.authenticatedUser();
    type ObjectKey = keyof typeof user;
    const key = 'username' as ObjectKey;

    return user[key];
  };

  createTask(task: any){
    let errorMessage = "";
    let errorCount = 0;

    if(task.text === ""){
      errorMessage += "Description is blank!\n";
      errorCount++;
    }
    if(task.date === ""){
      errorMessage += "Start Date is blank!\n";
      errorCount++;
    }

    if(errorCount > 0){
      window.alert(errorMessage);
    }
    else{
      this.tasksService.createTask(task).subscribe();
      window.alert("Task Created!");
      this.router.navigate(['/login']);
    }
  }

}
