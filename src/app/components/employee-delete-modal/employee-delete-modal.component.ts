import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';

declare const $;

@Component({
  selector: 'employee-delete-modal',
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.scss']
})
export class EmployeeDeleteModalComponent implements OnInit {

  @Input()
  employee: Employee;

  @Output()
  onDestroy: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private element: ElementRef, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  destroy() {
    const copy = Object.assign({}, this.employee);
    this.employeeService.destroyEmployee(this.employee);
    this.employeeService.deleteEmployee(copy).subscribe();
    this.onDestroy.emit(copy);
    this.hide();
  }

  hide() {
    const divModal = this.getDivModal();
    $(divModal).modal('hide');
  }

  show() {
    const divModal = this.getDivModal();
    $(divModal).modal('show');
  }

  private getDivModal() {
    const nativeElement: HTMLElement = this.element.nativeElement;
    return nativeElement.firstChild;
  }

}
