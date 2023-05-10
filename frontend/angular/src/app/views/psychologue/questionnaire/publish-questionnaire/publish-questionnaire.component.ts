import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { Student } from 'src/app/models/Student';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-publish-questionnaire',
  templateUrl: './publish-questionnaire.component.html',
  styleUrls: ['./publish-questionnaire.component.css']
})
export class PubishQuestionnaireComponent implements OnInit {
  publishForm!: FormGroup;
  students!: Student[];
  questionnaire!: Questionnaire;
  checkboxes!: FormControl[];

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireService,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.publishForm = this.fb.group({
      etudiantIds: [[], Validators.required]
    });

    // Fetch list of students from API
    this.studentService.getAllStudents().subscribe(students => {
      this.students = students;
      this.checkboxes = this.students.map(student => this.fb.control(false));
       // Disable checkboxes for published students
       this.checkboxes.forEach((checkbox, i) => {
        if (this.questionnaire.publishedTo.includes(this.students[i]._id)) {
          checkbox.disable();
        }
      });
    });

    // Fetch questionnaire object from API
    const questionnaireId = this.route.snapshot.params['id'];
    this.questionnaireService.getQuestionnaireById(questionnaireId).subscribe(questionnaire => {
      this.questionnaire = questionnaire;
        // Disable checkboxes for published students
  this.questionnaire.publishedTo.forEach(studentId => {
    const index = this.students.findIndex(student => student._id === studentId);
    if (index !== -1) {
      this.checkboxes[index].disable();
    }
  });
    });
  }

  onSubmit(): void {
    const etudiantIds: string[] = [];

  // Extract selected student IDs from checkboxes
  this.checkboxes.forEach((checkbox, i) => {
    if (checkbox.value) {
      etudiantIds.push(this.students[i]._id);
    }
  });

    const questionnaireId = this.questionnaire._id;

    this.questionnaireService.publishQuestionnaire(questionnaireId, etudiantIds).subscribe(questionnaire => {
      this.questionnaire = questionnaire;
      alert('Questionnaire has been published!');
    }, error => {
      console.log(error);
      alert('An error occurred while publishing the questionnaire.');
    });
  }
}