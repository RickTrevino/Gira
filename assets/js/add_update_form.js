const inputElement = document.querySelector('input[name="summary"]');
const errorTicketSummary = document.querySelector('.error-message-summary');
const errorTicketDetail = document.querySelector('.error-message-detail');

inputElement.addEventListener('input', () => {
  if (inputElement.value.length >= 120) {
    errorTicketSummary.style.display = 'block';
  } else {
    errorTicketSummary.style.display = 'none';
  }
});

inputElement.addEventListener('input', () => {
  if (inputElement.value.length >= 1000) {
    errorTicketDetail.style.display = 'block';
  } else {
    errorTicketDetail.style.display = 'none';
  }
});