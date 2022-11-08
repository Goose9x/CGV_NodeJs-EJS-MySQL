let seatPicker = document.querySelectorAll(".seat");
let total = document.getElementsByClassName("total")[0];
let sum = 0;
let seatNumber = [];
let finish = document.getElementById("finish");
for (i = 0; i < seatPicker.length; i++) {
  seatPicker[i].addEventListener("click", (e) => {
    color = e.target.style.backgroundColor;
    e.target.classList.toggle("colorred");
    if (e.target.classList.contains("colorred")) {
      sum = sum + 150000;
      total.innerHTML = sum;
      seatNumber.push(e.target.innerHTML);
    } else {
      sum = sum - 150000;
      total.innerHTML = sum;
      seatNumber.splice(seatNumber.indexOf(e.target.innerHTML), 1);
    }
    // FIXME: Đoạn lấy seat này vẫn cần sửa
    // seatNumber.push(e.target.innerHTML);
    let totalPrice = total.innerHTML;
    let surfixLink = window.location.href.replace(
      "http://localhost:5000/movie/booking/",
      ""
    );
    let movieId = surfixLink.split("").splice(0, 1);
    console.log(surfixLink, seatNumber, movieId);
    localStorage.setItem("seatNumber", seatNumber);
    localStorage.setItem("totalPrice", totalPrice);
    let data = {
      totalPrice,
      seatNumber,
    };
    finish.addEventListener("click", (e) => {
      //   window.location.href = `http://localhost:5000/movie/ticket/`;
      window.location.href = `http://localhost:5000/movie/ticket/${surfixLink}`;
      // fetch(`http://localhost:5000/movie/booking/${movieId}`, {
      //   method: "POST", // or 'PUT'
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(seatNumber),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });
  });
}
