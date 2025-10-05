import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {inject} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.css',
  standalone: true
})
export class ReactiveForms {
  userForm! :FormGroup;
   constructor(private fb: FormBuilder) {
    // Build form using FormBuilder
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      gender: ['male', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
      terms: [false, Validators.requiredTrue],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted ✅', this.userForm.value);
      alert('Registration successful!');
      this.userForm.reset(); // Clear form after submit
    } else {
      alert('Please fill all fields correctly!');
      this.userForm.markAllAsTouched();
    }
  }
  get f() {
    return this.userForm.controls;
  }


}
