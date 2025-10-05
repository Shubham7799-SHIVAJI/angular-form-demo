import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveForms } from './reactive-forms'; // adjust filename/class as in your app

describe('ReactiveForms2 (Standalone Angular v20)', () => {
  let fixture: ComponentFixture<ReactiveForms>;
  let component: ReactiveForms;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ Standalone component goes here
      imports: [ReactiveForms],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ 1. Component should load
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ 2. Form should exist
  it('should have a FormGroup with all controls', () => {
    const form = component.userForm;
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('age')).toBeTrue();
    expect(form.contains('gender')).toBeTrue();
    expect(form.contains('address')).toBeTrue();
    expect(form.contains('terms')).toBeTrue();
  });

  // ✅ 3. Default gender
  it('should default gender to "male"', () => {
    expect(component.userForm.get('gender')?.value).toBe('male');
  });

  // ✅ 4. Name required
  it('should make name invalid if empty', () => {
    const name = component.userForm.get('name');
    name?.setValue('');
    expect(name?.valid).toBeFalse();
    expect(name?.errors?.['required']).toBeTrue();
  });

  // ✅ 5. Email pattern
  it('should invalidate wrong email', () => {
    const email = component.userForm.get('email');
    email?.setValue('wrong-email');
    expect(email?.valid).toBeFalse();
    expect(email?.errors?.['email']).toBeTruthy();
  });

  // ✅ 6. Age below 18
  it('should invalidate age < 18', () => {
    const age = component.userForm.get('age');
    age?.setValue(15);
    expect(age?.valid).toBeFalse();
    expect(age?.errors?.['min']).toBeTruthy();
  });

  // ✅ 7. Terms unchecked
  it('should invalidate form when terms not accepted', () => {
    component.userForm.patchValue({
      name: 'John',
      email: 'john@example.com',
      age: 25,
      gender: 'male',
      address: { city: 'Delhi', state: 'Delhi' },
      terms: false,
    });
    expect(component.userForm.valid).toBeFalse();
  });

  // ✅ 8. Valid form
  it('should validate when all fields correct', () => {
    component.userForm.patchValue({
      name: 'John',
      email: 'john@example.com',
      age: 25,
      gender: 'male',
      address: { city: 'Delhi', state: 'Delhi' },
      terms: true,
    });
    expect(component.userForm.valid).toBeTrue();
  });

  // ✅ 9. Successful submit
  it('should alert success and reset on valid submit', () => {
    spyOn(window, 'alert');
    const resetSpy = spyOn(component.userForm, 'reset');

    component.userForm.patchValue({
      name: 'John',
      email: 'john@example.com',
      age: 25,
      gender: 'male',
      address: { city: 'Delhi', state: 'Delhi' },
      terms: true,
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Registration successful!');
    expect(resetSpy).toHaveBeenCalled();
  });

  // ✅ 10. Invalid submit
  it('should alert error on invalid submit', () => {
    spyOn(window, 'alert');

    component.userForm.patchValue({
      name: '',
      email: 'bad',
      age: 10,
      gender: '',
      address: { city: '', state: '' },
      terms: false,
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Please fill all fields correctly!');
  });
});
