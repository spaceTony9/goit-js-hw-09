const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
reloadData();

form.addEventListener('input', formInput);

form.addEventListener('submit', submitData);

function formInput() {
  e.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const obj = {
    email,
    message,
  };
  loadToLS(STORAGE_KEY, obj);
}

function submitData() {
  e.preventDefault();
  if (form.elements.email.value && form.elements.message.value) {
    const obj = localStorage.getItem(STORAGE_KEY);
    try {
      console.log(JSON.parse(obj));
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log('JSON package is corrupted');
    }
    localStorage.removeItem(STORAGE_KEY);
    form.elements.email.value = '';
    form.elements.message.value = '';
  } else alert('Please, fill the form');
}

function loadToLS(key, value) {
  const inputDataStorage = JSON.stringify(value);
  localStorage.setItem(key, inputDataStorage);
}

function loadFromLS(key) {
  const inputDataStorage = localStorage.getItem(key);
  try {
    return JSON.parse(inputDataStorage);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log('JSON package is corrupted');
  }
}

function reloadData() {
  const data = loadFromLS(STORAGE_KEY);
  if (data) {
    form.elements.email.value = data.email;
    form.elements.message.value = data.message;
  } else {
    return 1;
  }
}
