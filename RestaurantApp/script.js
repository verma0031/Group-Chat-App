let orderArray = [];
let selectedIndex = null;

console.log(orderArray);

async function clickSubmit() {
  let order = {
    order_price: document.getElementById("price").value,
    order_dish: document.getElementById("dish").value,
    tableno: document.getElementById("category").value,
  };

  orderArray.push(order);

  localStorage.orderRecords = JSON.stringify(orderArray);
  await showOrderOnScreen(order);

  clearFields();

  console.log(order);
}

async function init() {
  if (localStorage.orderRecords) {
    orderArray = JSON.parse(localStorage.orderRecords);

    for (var i = 0; i < orderArray.length; i++) {
      console.log(orderArray[i]);
      await showOrderOnScreen(orderArray[i]);
    }
  }
}

async function showOrderOnScreen(order) {
  const parentNode = document.getElementById("listOfOrders");
  const childHTML = `<li id=${order.tableno}> ${order.order_price} ${order.order_dish} ${order.tableno} <button onclick=deleteOrder('${order.tableno}')>DELETE</button></li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

async function deleteOrder(orderId) {
  console.log(orderId);

  orderArray.splice(orderId, 1);
  localStorage.orderRecords = JSON.stringify(orderArray);

  removeOrderFromScreen(orderId);
}

async function removeOrderFromScreen(orderId) {
  const parentNode = document.getElementById("listOfOrders");
  const childNodeToBeDeleted = document.getElementById(orderId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function clearFields() {
  document.getElementById("price").value = "";
  document.getElementById("dish").value = "";
  document.getElementById("category").value = "table1";
}

console.log(orderArray);
