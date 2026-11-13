import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewStudent, Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'A', course: 'Angular', fees: 5000, status: 'Active' },
    { id: 2, name: 'B', course: 'React', fees: 4000, status: 'Active' },
    { id: 3, name: 'C', course: 'Java', fees: 3000, status: 'Inactive' },
  ];

  private students$ = new BehaviorSubject<Student[]>([...this.students]);
  readonly studentsChanges$ = this.students$.asObservable();

  getStudents(): Student[] {
    return [...this.students];
  }

  addStudent(data: NewStudent): void {
    const nextId = this.students.length
      ? Math.max(...this.students.map((s) => s.id)) + 1
      : 1;
    this.students = [...this.students, { id: nextId, ...data }];
    this.students$.next([...this.students]);
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter((s) => s.id !== id);
    this.students$.next([...this.students]);
  }
}