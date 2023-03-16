import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-list-students',
  templateUrl: './admin-list-students.component.html',
  styleUrls: ['./admin-list-students.component.css']
})
export class AdminListStudentsComponent implements OnInit{
  Students: Student[]=[];
  // editMode: boolean = false;
  errorMessage!: string;
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {

    this.studentService.getAllStudents().subscribe(data => {
      this.Students=data;

    })


}
shortenText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  const shortened = text.substr(0, maxChars);
  return `${shortened.substr(0, shortened.lastIndexOf(' '))}...`;
}

getAllStudents(): void {
  this.studentService.getAllStudents()
    .subscribe(
      (Students: Student[])=>{
        this.Students=Students;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }

      );
}

onDeleteStudent(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this student!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#673ab7',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.Students = this.Students.filter(a => a._id !== id);
          Swal.fire(
            'Deleted!',
            'The student has been deleted.',
            'success'
          );
        },
        error => {
          console.log(error);
          Swal.fire(
            'Error!',
            'There was an error deleting the student.',
            'error'
          );
        }
      );
    }
  });
}

}


