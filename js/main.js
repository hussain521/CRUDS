let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "Create New";
let moodSearch = "title";
let index;
// let title =document.getElementById('title');
// console.log(document.getElementById("submit"));
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.classList.add("bg-danger");
  } else {
    total.innerHTML = " ";
    total.classList.remove("bg-danger");
  }
}

// create product
//save local
let data;
if (localStorage.getItem("product")) {
  data = JSON.parse(localStorage.getItem("product"));
} else {
  data = [];
}
submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
  };
  if(title.value!="" ){
  if (mood === "Create New") {
    if (product.count > 1) {
      for (let i = 0; i < product.count; i++) {
        data.push(product);
      }
    } else {
      data.push(product);
    }
  } else {
    data[index] = product;
    mood = "Create New";
    submit.innerHTML = "Create New";
    count.classList.remove("d-none");
  }
}else{

}

localStorage.setItem("product", JSON.stringify(data));
clearInputs();
  showData();
};
//clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}

//read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
    <td>[ ${i+1} ]</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button class="btn btn-warning" onclick="updatedata(${i})" >UpDate</button></td>
    <td><button class="btn btn-warning" onclick="deleteProduct(${i}) ">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deletBtn = document.getElementById("deleteAll");
  if (data.length > 0) {
    deletBtn.innerHTML = `
    <button class="w-100 p-2 btn-danger mt-3 btn fw-bold" onclick="deleteAll()">Delete All ( ${data.length} )</button>`;
  } else {
    deletBtn.innerHTML = "";
  }
}
showData();

// delete product

function deleteProduct(i) {
  data.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(data));
  showData();
}
// deleteAll

function deleteAll() {
  localStorage.clear();
  data.splice(0);
  showData();
}
// updata data
function updatedata(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  category.value = data[i].category;
  getTotal();
  count.classList.add("d-none");
  submit.innerHTML = "UpDate";
  mood = "UpDate";
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// sesrch
function getSearch(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    moodSearch = "title";
  } else {
    moodSearch = "Category";
}
search.placeholder = `Search by ${moodSearch}`;
  search.focus();
  search.value="";
  showData()
}
function searchdata(value) {
  let table = "";
        for (let i = 0; i < data.length; i++) {
  if (moodSearch == "title") {

      if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>[ ${i} ]</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button class="btn btn-warning" onclick="updatedata(${i})" >UpDate</button></td>
    <td><button class="btn btn-warning" onclick="deleteProduct(${i}) ">Delete</button></td>
    </tr>
    `;
      }
    
        } else {
      if (data[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
    <tr>
    <td>[ ${i} ]</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button class="btn btn-warning" onclick="updatedata(${i})" >UpDate</button></td>
    <td><button class="btn btn-warning" onclick="deleteProduct(${i}) ">Delete</button></td>
    </tr>
    `;
      }
  }
}
  document.getElementById("tbody").innerHTML = table;
}
