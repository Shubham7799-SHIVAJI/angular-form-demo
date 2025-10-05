import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable,inject } from '@angular/core';

import { OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee-service';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {
 private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private svc: EmployeeService = inject(EmployeeService);

  // Reactive form definition
form = this.fb.group({
  id: [null as number | null],
  firstName: [null as string | null, Validators.required],
  lastName: [null as string | null],
  email: [null as string | null, [Validators.required, Validators.email]],
  phone: [null as string | null],
  age: [null as number | null],
  salary: [null as number | null],
  dob: [null as string | null],
  hireDate: [null as string | null],
  favoriteColor: [null as string | null],
  gender: [null as string | null],
  department: [null as string | null],
  bio: [null as string | null],
  isActive: [true as boolean | null],
  website: [null as string | null],
  skills: this.fb.array([]) // FormArray
});

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.svc.getById(+id).subscribe((emp: Employee) => {
      // Null-safe patchValue
      const empToPatch: Employee = {
        ...emp,
        age: emp.age ?? null,
        salary: emp.salary ?? null,
        isActive: emp.isActive ?? true,
        skills: emp.skills ?? []
      };

      // Patch the form
      this.form.patchValue(empToPatch);

      // Skills FormArray
      if (empToPatch.skills.length) {
        empToPatch.skills.forEach(skill => this.addSkill(skill));
      }
    });
  }
}

  // Getter for FormArray
  get skillsArray(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // Check if skill is selected
  hasSkill(skill: string): boolean {
    return this.skillsArray.value.includes(skill);
  }

  // Toggle skill on checkbox change
  onSkillToggle(skill: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.addSkill(skill);
    } else {
      this.removeSkill(skill);
    }
  }

  addSkill(skill: string) {
    if (!this.hasSkill(skill)) {
      this.skillsArray.push(this.fb.control(skill));
    }
  }

  removeSkill(skill: string) {
    const index = this.skillsArray.controls.findIndex(c => c.value === skill);
    if (index >= 0) {
      this.skillsArray.removeAt(index);
    }
  }

  // Check if editing
  isEdit(): boolean {
    return !!this.form.value.id;
  }

  // Save employee
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = { ...this.form.value } as Employee;

    if (payload.id) {
      const id = payload.id;
      delete payload.id; // JSON server expects id in URL for PUT
      this.svc.update(id, payload).subscribe(() => this.router.navigate(['/dashboard']));
    } else {
      this.svc.create(payload).subscribe(() => this.router.navigate(['/dashboard']));
    }
  }

  // Cancel action
  cancel() {
    this.router.navigate(['/dashboard']);
  }

}
