import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent{
  public id: any;
  task = this.fb.group({
    _id: '',
    text: '',
    date: '',
    owner: ''
  });

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private router: Router, private fb: FormBuilder) { 
    this.id = route.snapshot.paramMap.get('id');
    this.tasksService.listTaskById(this.id).subscribe((response)=>{
      for(var myTask of response) {
        this.task.setValue({
          _id: myTask._id,
          text: myTask.text,
          date: myTask.date.substring(0, myTask.date.indexOf("T") + 6),
          owner: myTask.owner
        });
      };
      
    },(error=>{

    }));
  }

  editTask(task: any){
    this.tasksService.editTask(this.id,task).subscribe();
    this.router.navigate(['/login']);
  }

}
