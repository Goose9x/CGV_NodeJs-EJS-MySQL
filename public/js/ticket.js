document.getElementById("soghe").innerHTML = `Số ghế: ${localStorage.getItem(
  "seatNumber"
)}`;
document.getElementById(
  "totalPrice"
).innerHTML = `Tổng tiền: ${localStorage.getItem("totalPrice")}đ`;
