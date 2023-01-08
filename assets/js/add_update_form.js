const inputElement = document.querySelector('input[name="summary"]');
const errorElement = document.querySelector('.error-message');

inputElement.addEventListener('input', () => {
  if (inputElement.value.length >= 120) {
    errorElement.style.display = 'block';
  } else {
    errorElement.style.display = 'none';
  }
});