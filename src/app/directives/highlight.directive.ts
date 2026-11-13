import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input('appHighlight') status = '';

  private originalBackground = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.status === 'Active') {
      this.originalBackground = this.el.nativeElement.style.backgroundColor;
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalBackground;
  }
}