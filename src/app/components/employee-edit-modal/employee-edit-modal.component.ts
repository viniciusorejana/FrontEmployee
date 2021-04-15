import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';

declare const $;

@Component({
  selector: 'employee-edit-modal',
  templateUrl: './employee-edit-modal.component.html',
  styleUrls: ['./employee-edit-modal.component.scss']
})
export class EmployeeEditModalComponent implements OnInit {

  @Input()
  employee: Employee;

  @Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private element: ElementRef, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  addEmployee() {
    const copy = Object.assign({}, this.employee);
    this.employee.bonus = this.employee.salary > 500 ? 0 : this.employee.bonus;
    if(this.employee.salary == null){ this.employee.salary = 0;}
    if(this.employee.bonus == null){ this.employee.bonus = 0;}
    this.employeeService.updateEmployee(this.employee).subscribe();
    this.onSubmit.emit(copy)
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
    return nativeElement.firstChild.firstChild;
  }

}
