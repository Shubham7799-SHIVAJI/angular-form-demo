import { Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeForm } from './employee-form/employee-form';

export const routes: Routes = [

    // Default route redirects to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Employee dashboard showing all records
  { path: 'dashboard', component: EmployeeList },

  // Add new employee
  { path: 'employee-form', component: EmployeeForm},

  // Edit existing employee
  { path: 'employee-form/:id', component: EmployeeForm },

  // Wildcard route redirects to dashboard
  { path: '**', redirectTo: '/dashboard' }
];
