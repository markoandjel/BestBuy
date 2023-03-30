export class RegisterPage {
createRegisterForm(host)
{
    const registerForm = document.createElement('form');
    registerForm.classList.add('form-container');
    registerForm.setAttribute('id', 'register-form');
    const registerHeading = document.createElement('h2');
    registerHeading.textContent = 'Register';
    const registerUsernameLabel = document.createElement('label');
    registerUsernameLabel.setAttribute('for', 'reg-username');
    registerUsernameLabel.textContent = 'Username:';
    const registerUsernameInput = document.createElement('input');
    registerUsernameInput.classList.add('form-input');
    registerUsernameInput.setAttribute('type', 'text');
    registerUsernameInput.setAttribute('id', 'reg-username');
    registerUsernameInput.setAttribute('name', 'reg-username');
    registerUsernameInput.setAttribute('required', 'true');
    const registerPasswordLabel = document.createElement('label');
    registerPasswordLabel.setAttribute('for', 'reg-password');
    registerPasswordLabel.textContent = 'Password:';
    const registerPasswordInput = document.createElement('input');
    registerPasswordInput.classList.add('form-input');
    registerPasswordInput.setAttribute('type', 'password');
    registerPasswordInput.setAttribute('id', 'reg-password');
    registerPasswordInput.setAttribute('name', 'reg-password');
    registerPasswordInput.setAttribute('required', 'true');
    const registerButton = document.createElement('button');
    registerButton.classList.add('form-button');
    registerButton.setAttribute('type', 'submit');
    registerButton.textContent = 'Register';
    
    // Append the register form elements to the register form
    registerForm.appendChild(registerHeading);
    registerForm.appendChild(registerUsernameLabel);
    registerForm.appendChild(registerUsernameInput);
    registerForm.appendChild(registerPasswordLabel);
    registerForm.appendChild(registerPasswordInput);
    
    registerForm.appendChild(registerButton);
    
    // Add the register form to the host element
    host.appendChild(registerForm);
}
}