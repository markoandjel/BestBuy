// Import the `login` function from `routes-login.js`
//const { login } = require('./routes-login');

export class LogInPage {
  // Define a constructor method to accept the `router` object
  constructor(router) {
    this.router = router;
  }

  createLoginForm(host) {
    // Create the login form
    const loginForm = document.createElement('form');
    loginForm.classList.add('form-container');
    loginForm.setAttribute('id', 'login-form');
    const loginHeading = document.createElement('h2');
    loginHeading.textContent = 'Login';
    const loginUsernameLabel = document.createElement('label');
    loginUsernameLabel.setAttribute('for', 'username');
    loginUsernameLabel.textContent = 'Username:';
    const loginUsernameInput = document.createElement('input');
    loginUsernameInput.classList.add('form-input');
    loginUsernameInput.setAttribute('type', 'text');
    loginUsernameInput.setAttribute('id', 'username');
    loginUsernameInput.setAttribute('name', 'username');
    loginUsernameInput.setAttribute('required', 'true');
    const loginPasswordLabel = document.createElement('label');
    loginPasswordLabel.setAttribute('for', 'password');
    loginPasswordLabel.textContent = 'Password:';
    const loginPasswordInput = document.createElement('input');
    loginPasswordInput.classList.add('form-input');
    loginPasswordInput.setAttribute('type', 'password');
    loginPasswordInput.setAttribute('id', 'password');
    loginPasswordInput.setAttribute('name', 'password');
    loginPasswordInput.setAttribute('required', 'true');
    const loginButton = document.createElement('button');
    loginButton.classList.add('form-button');
    loginButton.setAttribute('type', 'submit');
    loginButton.textContent = 'Login';

    // Add a `submit` event listener to the form
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = loginUsernameInput.value;
      const password = loginPasswordInput.value;

      // Call the `login` function from `routes-login.js`
      const success = await login(this.router, username, password);

      if (success) {
        // Redirect the user to the dashboard page
        this.router.navigate('/dashboard');
      } else {
        // Display an error message to the user
        alert('Invalid username or password');
      }
    });

    // Append the login form elements to the login form
    loginForm.appendChild(loginHeading);
    loginForm.appendChild(loginUsernameLabel);
    loginForm.appendChild(loginUsernameInput);
    loginForm.appendChild(loginPasswordLabel);
    loginForm.appendChild(loginPasswordInput);
    loginForm.appendChild(loginButton);

    // Add the login form to the host element
    host.appendChild(loginForm);
  }
}

//module.exports = { LogInPage };
