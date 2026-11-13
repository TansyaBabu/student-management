import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges,
} from '@angular/core';
import { Student } from '../../models/student.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { FeesCurrencyPipe } from '../../pipes/fees-currency.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CapitalizePipe, FeesCurrencyPipe, HighlightDirective],
  template: `
    <article class="card" [appHighlight]="student.status">
      <div class="top">
        <div class="avatar" aria-hidden="true">{{ student.name.charAt(0) }}</div>
        <div class="who">
          <h3>{{ student.name | capitalize }}</h3>
          <p>{{ student.course }}</p>
        </div>
        <span class="pill" [class.off]="student.status !== 'Active'">{{ student.status }}</span>
      </div>
      <div class="bottom">
        <div>
          <span class="label">Fees</span>
          <strong>{{ student.fees | feesCurrency }}</strong>
        </div>
        <button type="button" (click)="delete.emit(student.id)">Delete</button>
      </div>
    </article>
  `,
  styles: [`
    .card {
      background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
      padding: 16px; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 16px;
      transition: background-color .15s;
    }
    .top { display: flex; align-items: center; gap: 12px; }
    .avatar {
      width: 42px; height: 42px; border-radius: 50%; background: var(--accent-soft); color: var(--accent);
      display: grid; place-items: center; font-weight: 700; font-size: 1.1rem; text-transform: uppercase; flex: none;
    }
    .who { flex: 1; min-width: 0; }
    h3 { margin: 0; font-size: 1.05rem; font-weight: 600; }
    .who p { margin: 0; font-size: .875rem; color: var(--muted); }
    .pill { font-size: .75rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: var(--ok-soft); color: var(--ok); }
    .pill.off { background: #f1f2f4; color: var(--muted); }
    .bottom { display: flex; align-items: flex-end; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 12px; }
    .label { display: block; font-size: .75rem; color: var(--muted); }
    strong { font-size: 1.1rem; font-weight: 600; }
    button {
      background: transparent; color: var(--danger); border: 1px solid #fecaca; border-radius: 8px;
      padding: 6px 12px; font-size: .875rem; font-weight: 500; cursor: pointer; transition: background-color .15s;
    }
    button:hover { background: #fef2f2; }
  `],
})
export class StudentCardComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) student!: Student;
  @Output() delete = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      const c = changes['student'];
      console.log(`[Card] ngOnChanges: student ${c.firstChange ? 'received' : 'changed'}`, c.currentValue);
    }
  }

  ngOnDestroy(): void {
    console.log(`[Card] ngOnDestroy: card for "${this.student.name}" destroyed`);
  }
}