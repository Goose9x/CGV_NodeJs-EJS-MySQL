const renderLogin = document.getElementsByClassName("lo-ren")[0];
const rendenRegister = document.getElementsByClassName("re-ren")[0];
const form = document.getElementById("registerForm");
const inputName = document.getElementsByClassName("name")[0];
const inputPhone = document.getElementsByClassName("phone")[0];
const inputEmail = document.getElementsByClassName("email")[0];
const inputPassword = document.getElementsByClassName("password")[0];

const showMessage = (message) => {
  let messageContainer = document.getElementsByClassName("errmessage")[0];
  messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 5000);
};

form.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("register-btn")) {
    let info = {
      userName: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
    };
    if (inputName.value == "") {
      inputName.style.border = "1px solid red";
    }
    if (inputPhone.value == "") {
      inputPhone.style.border = "1px solid red";
    }
    if (inputEmail.value == "") {
      inputEmail.style.border = "1px solid red";
    }
    if (inputPassword.value == "") {
      inputPassword.style.border = "1px solid red";
    }
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Đăng kí thành công");
          window.location.href = "/auth/login";
        } else {
          showMessage(data.message);
        }
      })
      .catch((err) => {
        showMessage(err);
      });
  }
});

renderLogin.addEventListener("click", (e) => {
  window.location.href = "/auth/login";
});
rendenRegister.addEventListener("click", (e) => {
  window.location.href = "/auth/register";
});
