import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[salaryColor]'
})
export class SalaryColorDirective {

  constructor(private element: ElementRef) { }

  @Input()
  set salaryColor(value) {
    const nativeElement: HTMLElement = this.element.nativeElement;
    const salary = parseFloat(value);
    nativeElement.style.color = salary > 500 ? 'green' : 'red';
  }
}
