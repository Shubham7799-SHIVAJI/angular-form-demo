import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee-service';
import { RouterModule, Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {
  private svc: EmployeeService = inject(EmployeeService);  // ✅ correct
  private router: Router = inject(Router);
  
  employees: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployees();
  }
loadEmployees() {
    this.svc.getAll().subscribe({
  next: (data: Employee[]) => {
    this.employees = data;
    console.log('Fetched employees:', data);
  },
  error: (err: any) => {
    console.error('Error fetching employees:', err);
  }
});
  }

  editEmployee(id: number | undefined) {
    if (id != null) this.router.navigate(['/employee', id]);
  }

  deleteEmployee(id: number | undefined) {
    if (id != null && confirm('Are you sure to delete?')) {
      this.svc.delete(id).subscribe(() => this.loadEmployees());
    }
  }

}
