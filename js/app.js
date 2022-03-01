// Search Icon click function
const loadPhone = () =>{
  // const searchIcon = document.getElementById("search-icon");
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;
  const errorMessage = document.getElementById("error-message");
  searchField.value = "";

  // search field error handling 
  if(searchFieldText == "" || searchFieldText >= 0 || searchFieldText <= 0 ){
    errorMessage.classList.add("error-message-style");
    errorMessage.innerText = "Please enter your phone name";
  }
  else{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
  }
}

// All phones load function
const displayPhone = (phones) =>{
  const newPhones = phones.slice(0,20);
  const allPhones = document.getElementById("all-phones");
  allPhones.innerHTML ="";
  newPhones.forEach(phone => {
    // console.log(phone)
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="col">
        <div class="card">
          <img src="${phone.image}" class="card-img-top" alt="Phone image">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button class="details-btn">Details</button>
          </div>
        </div>
      </div>
    `;
    allPhones.appendChild(div);
  })
}