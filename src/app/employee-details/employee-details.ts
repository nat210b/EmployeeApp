import { Component, OnInit } from '@angular/core';
import { EmployeeForm } from './employee-form/employee-form';
import { EmployeeDetailService } from '../shared/employee-detail';
import { EmployeeDetail } from '../shared/employee-detail.model';

@Component({
  selector: 'app-employee-details',
  imports: [EmployeeForm],
  templateUrl: './employee-details.html',
  styles: ``,
})
export class EmployeeDetails implements OnInit {
  constructor(public service: EmployeeDetailService) {}

  get roleCount(): number {
    return this.service.list.filter((employee) => employee.position?.trim()).length;
  }

  get contactReadyCount(): number {
    return this.service.list.filter(
      (employee) => employee.email?.trim() || employee.phone?.trim()
    ).length;
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: EmployeeDetail) {
    this.service.populateForm(selectedRecord);
  }

  onDelete(id: number) {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.service.deleteEmployeeDetail(id).subscribe({
      next: () => {
        this.service.refreshList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
