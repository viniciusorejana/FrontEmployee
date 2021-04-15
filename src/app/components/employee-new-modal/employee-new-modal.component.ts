import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';

declare const $;

@Component({
  selector: 'employee-new-modal',
  templateUrl: './employee-new-modal.component.html',
  styleUrls: ['./employee-new-modal.component.scss']
})
export class EmployeeNewModalComponent implements OnInit {

  employee: Employee = {
    id: null,
    name: '',
    cpf: '',
    salary: null,
    bonus: null,
  }

  @Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter<Employee>();
  
  @Output()
  onError: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private element: ElementRef, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  addEmployee() {
    const copy = Object.assign({}, this.employee);
    const check = this.employeeService.addEmployee(copy);
    if(check == 'erro'){
      this.onError.emit(copy);
    } else {
      this.onSubmit.emit(copy);
    }
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
