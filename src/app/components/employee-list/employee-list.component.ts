import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditModalComponent } from '../employee-edit-modal/employee-edit-modal.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { fade } from '../../animations';

declare const $;

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  preserveWhitespaces: true,
  animations: [
    fade
  ]
})
export class EmployeeListComponent implements OnInit {

  employee: Employee;
  employeeToEdit: Employee;
  employeeToDelete: Employee;
  employeeToAddMoney: Employee;

  @ViewChild(EmployeeNewModalComponent, {static: false})
  employeeNewModal: EmployeeNewModalComponent;

  @ViewChild(EmployeeEditModalComponent, {static: false})
  employeeEditModal: EmployeeEditModalComponent;

  @ViewChild(EmployeeDeleteModalComponent, {static: false})
  employeeDeleteModal: EmployeeDeleteModalComponent;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
  }

  openNewModal() {
    this.employeeNewModal.show();
  }

  openEditModal(employee: Employee) {
    this.employeeToEdit = employee;

    this.employeeEditModal.show();
  }

  openDestroyModal(employee: Employee) {
    this.employeeToDelete = employee;
    
    this.employeeDeleteModal.show();
  }

  onNewEmployee(employee: Employee) {
    this.employee = employee;
    this.showNotification('top', 'right', 'sucesso')
  }

  onError(employee: Employee) {
    this.employee = employee;
    this.showNotification('top', 'right', 'erro')
  }

  onEditEmployee(employee: Employee) {
    console.log(employee);
  }

  onDestroyEmployee(employee: Employee) {
    console.log(employee);
  }

  showNotification(from, align, status){

    let _message;
    let _type;

    if(status == "sucesso"){
      _message = "Funcionário <strong>" + this.employee.name + "</strong> cadastrado com sucesso!"
      _type = "success"
    } else {
      _message = "Funcionário com CPF: <strong>" + this.employee.cpf + "</strong> já foi cadastrado!"
      _type = "warning"
    }

    $.notify({
        icon: "notifications",
        message: _message

    },{
        type: _type,
        timer: 500,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }


}
