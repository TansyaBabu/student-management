import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewStudent } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <h2>Add a student</h2>
      <div class="fields">
        <label>Name
          <input formControlName="name" placeholder="e.g. D" />
        </label>
        <label>Course
          <input formControlName="course" placeholder="e.g. Python" />
        </label>
        <label>Fees (₹)
          <input type="number" formControlName="fees" min="0" />
        </label>
        <label>Status
          <select formControlName="status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <button type="submit" [disabled]="form.invalid">Add student</button>
      </div>
    </form>
  `,
  styles: [`
    h2 { margin: 0 0 16px; font-size: 1.05rem; font-weight: 600; }
    .fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; align-items: end; }
    label { display: flex; flex-direction: column; gap: 6px; font-size: .85rem; font-weight: 500; color: var(--muted); }
    button {
      background: var(--accent); color: #fff; border: 0; border-radius: 8px;
      padding: 11px 18px; font-weight: 600; cursor: pointer; transition: background-color .15s;
    }
    button:hover:not(:disabled) { background: var(--accent-dark); }
    button:disabled { background: #cbd5d3; cursor: not-allowed; }
  `],
})
export class StudentFormComponent {
  private fb = inject(FormBuilder);

  @Output() studentSubmitted = new EventEmitter<NewStudent>();

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    course: ['', Validators.required],
    fees: [0, [Validators.required, Validators.min(0)]],
    status: ['Active' as 'Active' | 'Inactive', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.studentSubmitted.emit({ ...v, name: v.name.trim(), course: v.course.trim() });
    this.form.reset({ name: '', course: '', fees: 0, status: 'Active' });
  }
}