import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddPsyComponent } from '../psy/admin-add-psy/admin-add-psy.component';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListPsyComponent } from '../psy/admin-list-psy/admin-list-psy.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';
import { DetailPsyComponent } from '../psy/detail-psy/detail-psy.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NonValidStudentComponent } from './non-valid-student/non-valid-student.component';

const routes: Routes = [
  {path:'add',component:AdminAddStudentComponent},
  {path:'',component:AdminListStudentsComponent},
  {path:'detail/:id',component:DetailStudentComponent},
  {path:'edit/:id',component:EditStudentComponent},
  {path:'nonvalid',component:NonValidStudentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
