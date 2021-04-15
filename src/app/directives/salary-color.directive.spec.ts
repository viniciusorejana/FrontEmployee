import { SalaryColorDirective } from './salary-color.directive';
import { element } from 'protractor';
import { ElementRef } from '@angular/core';

describe('SalaryColorDirective', () => {
  it('should create an instance', () => {
    element: ElementRef;
    const directive = new SalaryColorDirective(this.element);
    expect(directive).toBeTruthy();
  });
});
