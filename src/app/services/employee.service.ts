import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number,
  name: string;
  cpf: string;
  salary: number;
  bonus: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly urlDb = 'http://localhost:3000/api/database'

  employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  addEmployee(employee) {
    employee.bonus = employee.salary > 500 ? 0 : employee.bonus;
    if(this.employees.some( ({cpf}) => cpf == employee.cpf)){
      return 'erro';
    }

    this.createEmployee(employee);

    setTimeout(() => {
      this.getOneEmployee(employee.cpf).then(r => employee.id = r[0].id);
      this.employees.push(employee);
    }, 500);
    
  }  

  atualizaEmployees(){
    this.getEmployees()
      .subscribe(
        r => {
          for(var i = 0; i < r.length; i++)
          this.employees.push(r[i])
      }) 
  }

  getEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlDb);
  }

  createEmployee(employee: Employee)  {
    const data = employee;
    this.http.post(this.urlDb, data).subscribe();
  }

  destroyEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1);
  }

  getOneEmployee(cpf){
    return this.http.get(this.urlDb + '/' + cpf).toPromise();
  }

  deleteEmployee(employee: Employee) {
    return this.http.delete(this.urlDb + '/' + employee.cpf);
  }

  updateEmployee(employee: Employee){
    return this.http.put(this.urlDb + '/' + employee.cpf , employee);
  }

}