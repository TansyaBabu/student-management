import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule, StudentCardComponent],
  templateUrl: './student-list.component.html',
  styles: [`
    .heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    h2 { margin: 0; font-size: 1.05rem; font-weight: 600; }
    .count { background: var(--accent-soft); color: var(--accent); font-size: .8rem; font-weight: 600; padding: 3px 12px; border-radius: 999px; }
    .toolbar { display: grid; grid-template-columns: 1fr 200px; gap: 12px; margin-bottom: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .empty { color: var(--muted); text-align: center; padding: 28px 0; margin: 0; }
    @media (max-width: 520px) { .toolbar { grid-template-columns: 1fr; } }
  `],
})
export class StudentListComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  students: Student[] = [];
  searchText = '';
  selectedCourse = '';

  private sub?: Subscription;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
    this.sub = this.studentService.studentsChanges$.subscribe((list) => (this.students = list));
  }

  ngDoCheck(): void {
    console.log('[List] ngDoCheck: change detection ran');
  }

  ngAfterViewInit(): void {
    console.log('[List] ngAfterViewInit: view initialized');
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    console.log('[List] ngOnDestroy: component destroyed');
  }

  get courses(): string[] {
    return [...new Set(this.students.map((s) => s.course))];
  }

  get filteredStudents(): Student[] {
    const text = this.searchText.trim().toLowerCase();
    return this.students.filter(
      (s) =>
        s.name.toLowerCase().includes(text) &&
        (!this.selectedCourse || s.course === this.selectedCourse),
    );
  }

  onDelete(id: number): void {
    this.studentService.deleteStudent(id);
  }
}