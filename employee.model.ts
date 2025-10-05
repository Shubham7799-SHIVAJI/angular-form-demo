export interface Employee {
  id?: number ;
  firstName: string | null;
  lastName?: string | null;
  email: string | null;
  phone?: string | null;
  age: number | null;           // ← remove optional ?
  salary: number | null;        // ← remove optional ?
  dob: string | null;
  hireDate: string | null;
  favoriteColor: string | null;
  gender: string | null;
  department: string | null;
  bio: string | null;
  isActive: boolean | null;
  website: string | null;
  skills: string[];             // empty array by default
}

