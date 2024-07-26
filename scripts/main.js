// lines 2 & 3 there for javascript validator messages.... //
/*jshint esversion: 6 */
/*jshint esversion: 8*/

const pass = document.getElementById('password');
const msg = document.getElementById('message');
const str = document.getElementById('strength');
const togglePassword = document.getElementById('togglePassword');
const generatedPassword = document.getElementById('generatedPassword');
const generatePassword = document.getElementById('generatePassword');
const copyPassword = document.getElementById('copyPassword');
const pastePassword = document.getElementById('pastePassword');

// Function to generate a random password
function generateRandomPassword(length = 15) {
  const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbolCharset = '!@#$%^&*()_+[]{}|;:,.<>?/';
  const numberCharset = '0123456789';

  // Initialize the password with one character from each required set
  let password = [
    lowercaseCharset[Math.floor(Math.random() * lowercaseCharset.length)],
    uppercaseCharset[Math.floor(Math.random() * uppercaseCharset.length)],
    numberCharset[Math.floor(Math.random() * numberCharset.length)],
    symbolCharset[Math.floor(Math.random() * symbolCharset.length)],
  ];

  // Create a combined charset for the rest of the password
  const combinedCharset = lowercaseCharset + uppercaseCharset + symbolCharset + numberCharset;

  // Generate the rest of the password
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * combinedCharset.length);
    password.push(combinedCharset[randomIndex]);
  }

  // Shuffle the password to ensure characters are not in a fixed order
  password = password.sort(() => Math.random() - 0.5).join('');

  return password;
}

// Check if the input contains symbols
function hasSymbols(input) {
  const symbolRegex = /[^a-zA-Z0-9\s]/;
  return symbolRegex.test(input);
}

// Check if the input contains numbers
function hasNumbers(input) {
  const numberRegex = /[0-9]/;
  return numberRegex.test(input);
}

// Check if the input contains uppercase letters
function hasUppercase(input) {
  const uppercaseRegex = /[A-Z]/;
  return uppercaseRegex.test(input);
}

// Check if the input contains lowercase letters
function hasLowercase(input) {
  const lowercaseRegex = /[a-z]/;
  return lowercaseRegex.test(input);
}

pass.addEventListener('input', () => {
    if (pass.value.length > 0) {
        msg.style.display = "block";
    } else {
        msg.style.display = "none";
    }

    let strength = "weak";
    let borderColor = "#ff5925"; // Default border color

    // Check password strength
    if (pass.value.length >= 8 &&
        hasSymbols(pass.value) &&
        hasNumbers(pass.value) &&
        hasUppercase(pass.value) &&
        hasLowercase(pass.value)) {
        strength = "strong";
        borderColor = "#26d730";
    } else if (pass.value.length >= 4 &&
               (hasSymbols(pass.value) || hasNumbers(pass.value)) &&
               (hasUppercase(pass.value) || hasLowercase(pass.value))) {
        strength = "medium";
        borderColor = "yellow";
    }

    str.innerHTML = strength;
    pass.style.borderColor = borderColor; // Update border color
});


// Toggle password visibility
togglePassword.addEventListener('click', () => {
  if (pass.type === 'password') {
    pass.type = 'text';
    togglePassword.querySelector('img').src = 'images/icons8-eye-24.png'; // Update the icon to 'show'
  } else {
    pass.type = 'password';
    togglePassword.querySelector('img').src = 'images/icons8-eye-24.png'; // Update the icon to 'hide'
  }
});

// Generate a new password
generatePassword.addEventListener('click', () => {
  const password = generateRandomPassword();
  generatedPassword.value = password;
});

// Copy the generated password to clipboard
copyPassword.addEventListener('click', () => {
  generatedPassword.select();
  document.execCommand('copy');
});

// Handle paste button
pastePassword.addEventListener('click', async () => {
  try {
    // Read text from the clipboard
    const text = await navigator.clipboard.readText();
    // Set the input field's value to the clipboard text
    pass.value = text;
    // Trigger the input event to update password strength
    pass.dispatchEvent(new Event('input'));
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
});
