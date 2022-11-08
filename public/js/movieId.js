let trailer = document.getElementsByClassName("btn-trailer")[0];
let column = document.getElementsByClassName("movie");
let cityPicker = document.getElementsByClassName("city")[0];
let statePicker = document.getElementsByClassName("state");
let messageMovie = document.getElementsByClassName("messageMovie")[0];
let cinemaPicker = document.getElementById("cinema");
let modalClick = document.getElementById("modal-editor");
let test = document.getElementsByClassName("pdc")[0];
trailer.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href =
    "https://www.youtube.com/watch?v=Oj3c-P1XVQM&ab_channel=HieuTranMinh";
});
// a
for (let i = 0; i < 7; i++) {
  column[i].addEventListener("click", (e) => {
    let date = e.target.innerHTML.trim();
    e.preventDefault();
    e.target.classList.add("on");
    for (let i = 0; i < statePicker.length; i++) {
      if (statePicker[i]) {
        statePicker[i].style.display = "block";
        statePicker[i].addEventListener("click", (e) => {
          if (!e.target.classList.contains("on")) {
            e.target.classList.add("on");
          }
          let state = e.target.innerHTML.trim();
          console.log(date, state);
          cinemaPicker.innerHTML = "";
          cinemaPicker.style.display = "block";
          let id = e.target.id.replace("state-", "");
          fetch(`http://localhost:5000/movie/city/cinema/${id}`)
            .then((res) => res.json())
            .then((data) => {
              for (i = 0; i < data.message[0].length; i++) {
                cinemaPicker.innerHTML += `
                <div class=" cinema cinema-${i + 1}">
                  <h4>${data.message[0][i].cinemaName}</h4>
                  <p>Rạp 3d premium<p>
                  <div class="row">
                    <div class="col-2 movie time time-1" style="text-align: center; text-decoration:none;">08:00-10:00</div>
                    <div class="col-2 movie time time-2" style="text-align: center; text-decoration:none;">10:00-12:00</div>
                    <div class="col-2 movie time time-3" style="text-align: center; text-decoration:none;">12:00-14:00</div>
                    <div class="col-2 movie time time-4" style="text-align: center; text-decoration:none;">14:00-16:00</div>
                    <div class="col-2 movie time time-5" style="text-align: center; text-decoration:none;">16:00-18:00</div>
                    <div class="col-2 movie time time-6" style="text-align: center; text-decoration:none;">18:00-20:00</div>
                  </div>
                </div>`;
              }
              let time = document.querySelectorAll(".time");
              let movieId = test.classList[1];
              console.log(movieId);
              console.log(cinemaPicker);
              // console.log(data.message[0]);
              for (let j = 0; j < cinemaPicker.children.length; j++) {
                let cinemaId =
                  cinemaPicker.children[j].classList[1].split("-")[1];
                cinemaPicker.children[j].addEventListener("click", (e) => {
                  for (i = 0; i < time.length; i++) {
                    let timeId = time[i].classList[3].split("-")[1];
                    time[i].addEventListener("click", (e) => {
                      window.location.href = `http://localhost:5000/movie/booking/${movieId}?state=${id}&cinema=${cinemaId}&time=${timeId}`;
                    });
                    // console.log(cinemaId);
                    // console.log(timeId);
                    // window.location.href = `http://localhost:5000/movie/booking/${movieId}?cinema=${cinemaId}&time=${timeId}`;
                  }
                });
              }
            });
        });
      }
    }
    messageMovie.style.display = "none";
  });
}
// b
for (let i = 7; i < 30; i++) {
  column[i].addEventListener("click", (e) => {
    e.preventDefault();
    e.target.classList.add("on");
    for (let i = 0; i < statePicker.length; i++) {
      if (statePicker[i]) {
        statePicker[i].style.display = "none";
        cinemaPicker.style.display = "none";
      }
    }
    messageMovie.style.display = "block";
  });
}
// c
// for (let i = 0; i < statePicker.length; i++) {
//   if (statePicker[i]) {
//     statePicker[i].addEventListener("click", (e) => {
//       if (!e.target.classList.contains("on")) {
//         e.target.classList.add("on");
//       }
//       cinemaPicker.innerHTML = "";
//       cinemaPicker.style.display = "block";
//       let id = e.target.id.replace("state-", "");
//       fetch(`http://localhost:5000/movie/city/cinema/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           for (i = 0; i < data.message[0].length; i++) {
//             cinemaPicker.innerHTML += `<div class=" cinema">
//             <h4>${data.message[0][i].cinemaName}</h4>
//             <p>Rạp 3d premium<p>
//             <div class="row">
//             <div class="col-2 movie time" style="text-align: center;">08:00-10:00</div>
//             <div class="col-2 movie time" style="text-align: center;">08:00-10:00</div>
//             <div class="col-2 movie time" style="text-align: center;">08:00-10:00</div>
//             <div class="col-2 movie time" style="text-align: center;">08:00-10:00</div>
//             <div class="col-2 movie time" style="text-align: center;">08:00-10:00</div>
//             <div class="col-2 movie time" style="text-align: center;">08:00-10:00</div></div>
//         </div>`;
//           }
//         });
//     });
//   }
// }
