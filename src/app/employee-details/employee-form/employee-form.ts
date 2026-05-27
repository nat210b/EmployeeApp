import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeDetailService } from '../../shared/employee-detail';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styles: ``,
})
export class EmployeeForm {
  constructor(public service: EmployeeDetailService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const request =
      this.service.formData.id === 0
        ? this.service.postEmployeeDetail()
        : this.service.putEmployeeDetail();

    request.subscribe({
      next: () => {
        this.service.refreshList();
        this.service.resetForm(form);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetForm(form: NgForm) {
    this.service.resetForm(form);
  }
}
