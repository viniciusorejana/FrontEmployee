import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { fade } from '../../animations';

declare const $;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    fade
  ]
})
export class SearchComponent implements OnInit {

  employee: Employee = {
    id: null,
    name: '',
    cpf: '',
    salary: null,
    bonus: null,
  };

  existEmployee = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  searchEmployee(){
    if(this.employeeService.employees.some(({cpf}) => cpf == this.employee.cpf)){

      this.employeeService.getOneEmployee(this.employee.cpf).then(r => this.employee = r[0]);
      this.existEmployee = true;

    } else {
      this.showNotification('top','right')
    }
  }

  showNotification(from, align){

    $.notify({
        icon: "notifications",
        message: "Funcionário inexistente"

    },{
        type: 'warning',
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
