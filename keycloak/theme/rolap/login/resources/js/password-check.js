let passwordInput, confirmPasswordInput, passwordInputError, confirmPasswordInputError;

const passwordPolicy = {
  minLength: 8,
  maxLength: 64,
  specialCharackters: 1,
  uppercaseCharacters: 1,
  lowercaseCharacters: 1,
  digits: 1
}

window.addEventListener('load', function () {
  initVariables();
  createObservers();
});

function initVariables() {
  passwordInput = document.getElementById('password');
  confirmPasswordInput = document.getElementById('password-confirm');
  passwordInputError = document.getElementById('password-error');
  confirmPasswordInputError = document.getElementById('password-confirm-error');
}

function createObservers() {
  passwordInput.addEventListener('input', checkPassword);
  confirmPasswordInput.addEventListener('blur', checkConfirmPassword)
  confirmPasswordInput.addEventListener('input', checkConfirmPassword)
}

/**
 * Check if password input is valid.
 */
function checkPassword(event) {
  const value = event.target.value;
  const isPasswordGood = checkPasswordPolicy(value);

  if (!isPasswordGood) {
    passwordInputError.classList.remove('d-none');
  } else {
    passwordInputError.classList.add('d-none');
  }
}

/**
 * Check if confirm password is valid.
 */
function checkConfirmPassword(event) {
  const confirmPasswordValue = event.target.value;
  const passwordValue = passwordInput.value;

  if (passwordValue !== confirmPasswordValue) {
    confirmPasswordInputError.classList.remove('d-none');
  } else {
    confirmPasswordInputError.classList.add('d-none');
  }
}

/**
 * Check if entered password pass policy.
 */
function checkPasswordPolicy(password) {
  // password lenght
  if (password.length < passwordPolicy.minLength || password.length > passwordPolicy.maxLength) {
    return false;
  }

  // password uppercase
  const numUpper = getLength(password, /[A-Z]/g);
  if (numUpper < passwordPolicy.uppercaseCharacters) {
    return false;
  }

  // password lowercase
  const numLower = getLength(password, /[a-z]/g);
  if (numLower < passwordPolicy.lowercaseCharacters) {
    return false;
  }

  // password digits
  const numDigit = getLength(password, /[0-9]/g);
  if (numDigit < passwordPolicy.digits) {
    return false;
  }

  // password special
  const numSpecial = getLength(password, /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
  if (numSpecial < passwordPolicy.specialCharackters) {
    return false;
  }

  return true;
}

/**
 * Gets the number of characters that match the regular expression.
 */
function getLength(password, regexp) {
  return (password.match(regexp) || []).length
}