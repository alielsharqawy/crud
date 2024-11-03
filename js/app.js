let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
// get total
function getTotal() {
  // to calc total--> basic condition the price has value
  if (price.value != "") {
    // add + after each value to transfer it to numbers
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    // if i do not have value in total
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
// create product

// array to collect all product here
// easy to deal with data(read-store-update-delete-search) 35

// important logical error
// let dataPro = [];

let dataPro;
// check if the localStorage has data
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    // because it's not has input (total is small tag)
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // clean data
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count <= 100
  ) {
    // switch between create and update
    if (mood === "create") {
      // create
      // count
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    }
    // update
    else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  // save data in local storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  // call clearData function

  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  // to put array data in the table
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
       <td>${i + 1}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="updateData(${i})" id="update">update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
    // i--> number of the product i want to delete 89
  }
  document.getElementById("tbody").innerHTML = table;
  // delete all data
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick='deleteAll()'>delete All(${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
// save the data after reload
showData();

// delete
// (1) delete one product
function deleteData(i) {
  // delete product from array
  dataPro.splice(i, 1);
  // update localStorage
  localStorage.product = JSON.stringify(dataPro);
  // update table
  showData();
}

// (2) delete all data
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// count

// update 2 steps
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  // to make i global (متغير وهمي)
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search 2 steps
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search by " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      {
        if (dataPro[i].title.includes(value.toLowerCase())) {
          table += `
    <tr>
       <td>${i}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="updateData(${i})" id="update">update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
        }
      }
    } else {
      {
        if (dataPro[i].category.includes(value.toLowerCase())) {
          table += `
    <tr>
       <td>${i}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].price}</td>
       <td>${dataPro[i].taxes}</td>
       <td>${dataPro[i].ads}</td>
       <td>${dataPro[i].discount}</td>
       <td>${dataPro[i].total}</td>
       <td>${dataPro[i].category}</td>
       <td><button onclick="updateData(${i})" id="update">update</button></td>
       <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
        }
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
// clean data

// scroll btn
let btn = document.getElementById("scroll");
window.onscroll = function () {
  if (scrollY >= 400) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
  btn.onclick = function () {
    scroll({
      top: 0,
      behavior:"smooth"
     });
  };
};
