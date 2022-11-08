const renderLogin = document.getElementsByClassName("lo-ren")[0];
const rendenRegister = document.getElementsByClassName("re-ren")[0];
const form = document.getElementById("loginForm");
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
  let info = {};
  if (e.target.classList.contains("login-btn")) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)
    ) {
      info = {
        email: form.email.value,
        password: form.password.value,
      };
    } else if (
      /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(form.email.value)
    ) {
      info = {
        phone: form.email.value,
        password: form.password.value,
      };
    } else {
      if (inputEmail.value == "") {
        inputEmail.style.border = "1px solid red";
      }
      if (inputPassword.value == "") {
        inputPassword.style.border = "1px solid red";
      }
      return showMessage("Invalid email or phone");
    }
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          if (data.role === "admin") {
            window.location.href = "/auth/admin/users";
          } else {
            alert("Đăng nhập thành công");
            window.location.href = "/";
          }
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
