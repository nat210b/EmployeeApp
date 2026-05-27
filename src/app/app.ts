import { Component, signal } from '@angular/core';
import { EmployeeDetails } from './employee-details/employee-details';


@Component({
  selector: 'app-root',
  imports: [EmployeeDetails],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('EmployeeApp');
}
