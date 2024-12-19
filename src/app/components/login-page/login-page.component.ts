import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginAndSignup } from '../../login-and-signup';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;

  signupUsers: LoginAndSignup[] = []

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })


    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
  })
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('users')
    if(localData != null) {
      this.signupUsers = JSON.parse(localData)
    }
    
  }


  onSubmit() {
    const newUser = {
      userName: this.signupForm.value.userName.trim(),
      email: this.signupForm.value.email.trim(),
      password: this.signupForm.value.password.trim()
    };
  
    this.signupUsers.push(newUser);
    console.log('Updated signup users:', this.signupUsers);
  
    localStorage.setItem('users', JSON.stringify(this.signupUsers));
    this.signupForm.reset();
  }
  


  onLogin() {
  const loginData = {
    userName: this.loginForm.value.userName.trim(),
    password: this.loginForm.value.password.trim()
  };

  console.log('Login data:', loginData);

  const userExist = this.signupUsers.find(
    u => u.userName === loginData.userName && u.password === loginData.password
  );

  console.log('Matched user:', userExist);

  if (userExist) {
    alert('User login successfully');
  } else {
    alert('Wrong credentials');
  }

  this.loginForm.reset();
}



}
