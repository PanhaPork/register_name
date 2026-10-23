'use strict';

const registrationForm = document.getElementById('registrationForm');
const studentNameField = document.getElementById('studentName');
const studentIdField = document.getElementById('studentId');
const emailField = document.getElementById('emailAddress');
const courseField = document.getElementById('courseSelection');
const formMessage = document.getElementById('formMessage');

const courseNames = {
  web: 'Web Design & Development',
  programming: 'Programming Fundamentals',
  networking: 'Computer Networking'
};

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message is-visible ${type === 'success' ? 'is-success' : 'is-error'}`;
}

// Course cards can preselect a course and take the student to the form.
document.querySelectorAll('.choose-course').forEach((button) => {
  button.addEventListener('click', () => {
    courseField.value = button.dataset.course;
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => studentNameField.focus({ preventScroll: true }), 450);
  });
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const studentName = studentNameField.value.trim();
  const studentId = studentIdField.value.trim();
  const email = emailField.value.trim();
  const selectedCourse = courseField.value;

  if (!studentName || !studentId || !email || !selectedCourse) {
    showMessage('សូមបំពេញព័ត៌មានចាំបាច់ទាំងអស់ មុនពេល Submit។', 'error');
    return;
  }

  if (!emailField.checkValidity()) {
    showMessage('សូមបញ្ចូល Email Address ឱ្យបានត្រឹមត្រូវ។', 'error');
    emailField.focus();
    return;
  }

  const selectedCourseName = courseNames[selectedCourse];
  if (!selectedCourseName) {
    showMessage('សូមជ្រើសរើសវគ្គសិក្សាដែលមាននៅក្នុងបញ្ជី។', 'error');
    return;
  }

  showMessage(
    `អរគុណ ${studentName}! Form របស់អ្នកត្រូវបានដំណើរការដោយជោគជ័យ (Demo)។ វគ្គសិក្សា៖ ${selectedCourseName}។ ដោយសារនេះជា Front-end demo ព័ត៌មានមិនត្រូវបានរក្សាទុកក្នុង Server ឬ Database ទេ។`,
    'success'
  );
});

// Clear the old confirmation when the student edits the form.
registrationForm.addEventListener('input', () => {
  if (formMessage.classList.contains('is-visible')) {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }
});
registrationForm.addEventListener('change', () => {
  if (formMessage.classList.contains('is-visible')) {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }
});
