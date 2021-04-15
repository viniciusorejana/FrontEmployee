import { Component } from '@angular/core';
import { EmployeeService } from './services/employee.service';

declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProjetoTeste';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.atualizaEmployees();
  }

}