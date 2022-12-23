import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'register', component: RegisterComponent},
  {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
  {path: 'edit-task/:id', component: EditTaskComponent, canActivate: [AuthGuard]},
  {path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
