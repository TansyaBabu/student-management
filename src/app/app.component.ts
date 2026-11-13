import { Component } from '@angular/core';
import { NewStudent } from './models/student.model';
import { StudentService } from './services/student.service';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentListComponent, StudentFormComponent],
  templateUrl: './app.component.html',
  styles: [`
    :host { display: block; }
    .topbar { background: var(--surface); border-bottom: 1px solid var(--line); }
    .inner { max-width: 1040px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; gap: 12px; }
    .logo {
      width: 36px; height: 36px; border-radius: 10px; background: var(--accent); color: #fff;
      display: grid; place-items: center; font-weight: 700;
    }
    h1 { margin: 0; font-size: 1.15rem; font-weight: 600; }
    main { max-width: 1040px; margin: 24px auto 48px; padding: 0 20px; display: grid; gap: 20px; }
    .panel { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 22px; box-shadow: var(--shadow); }
  `],
})
export class AppComponent {
  constructor(private studentService: StudentService) {}

  onStudentSubmitted(student: NewStudent): void {
    this.studentService.addStudent(student);
  }
}