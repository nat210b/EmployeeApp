import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployeeDetail } from './employee-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDetailService {
  list: EmployeeDetail[] = [];
  url: string = environment.apiBaseUrl + '/EmployeeDetails';
  formData: EmployeeDetail = new EmployeeDetail();

  constructor(private http: HttpClient) {}

  refreshList() {
    this.http.get<EmployeeDetail[]>(this.url).subscribe({
      next: (res) => {
        this.list = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  postEmployeeDetail() {
    return this.http.post<EmployeeDetail>(this.url, this.formData);
  }

  putEmployeeDetail() {
    return this.http.put<EmployeeDetail>(
      `${this.url}/${this.formData.id}`,
      this.formData
    );
  }

  deleteEmployeeDetail(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  populateForm(selectedRecord: EmployeeDetail) {
    this.formData = Object.assign({}, selectedRecord);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new EmployeeDetail();
  }
}
