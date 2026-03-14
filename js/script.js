// Отримуємо елементи зі сторінки
const form = document.getElementById("contact-form");
const list = document.getElementById("contact-list");

// Завантажуємо контакти з localStorage.
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// відображаємо контакти при завантаженні сторінки
renderContacts();

// Обробник відправки форми
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Створюємо новий об'єкт контакту
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
    };

    contacts.push(contact);

    // Зберігаємо оновлений список у localStorage
    saveContacts();

    // Перемальовуємо список контактів на сторінці
    renderContacts();

    // Очищаємо форму після додавання
    form.reset();
});

// Функція збереження контактів у localStorage
function saveContacts() {
    // переводить масив у текст для збереження
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Функція відображення контактів на сторінці
function renderContacts() {

    // Очищаємо список перед новим відображенням
    list.innerHTML = "";

    // Перебираємо всі контакти в масиві
    contacts.forEach(function (contact, index) {

        // Створюємо новий елемент списку
        const li = document.createElement("li");

        // Додаємо текст контакту та кнопки
        li.innerHTML = `
      ${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}
      <button onclick="deleteContact(${index})">Видалити</button>
      <button onclick="editContact(${index})">Редагувати</button>
    `;

        // Додаємо елемент у список
        list.appendChild(li);
    });
}

// Функція видалення контакту
function deleteContact(index) {

    // Видаляємо контакт з масиву
    contacts.splice(index, 1);

    // Зберігаємо зміни
    saveContacts();

    // Оновлюємо список на сторінці
    renderContacts();
}

// Функція редагування контакту
function editContact(index) {

    // Отримуємо контакт, який потрібно змінити
    const contact = contacts[index];

    // Запитуємо нові дані у користувача
    const newPhone = prompt("Новий телефон:", contact.phone);
    const newEmail = prompt("Новий email:", contact.email);

    // Якщо користувач не натиснув Cancel
    if (newPhone !== null && newEmail !== null) {

        // Оновлюємо дані контакту
        contact.phone = newPhone;
        contact.email = newEmail;

        // Зберігаємо зміни
        saveContacts();

        // Оновлюємо список
        renderContacts();
    }
}