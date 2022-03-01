const allPhones = document.getElementById("all-phones");
const singlePhone = document.getElementById("single-phone");

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
  singlePhone.innerHTML = "";
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
            <button class="details-btn" onclick="loadSinglePhone('${phone.slug}')">Details</button>
          </div>
        </div>
      </div>
    `;
    allPhones.appendChild(div);
  })
}

// Single phone load function
const loadSinglePhone = (phoneId) =>{
  // console.log(phoneId);
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
  .then(res => res.json())
  .then(data => displaySinglePhone(data))
}

// Single phone details function
const displaySinglePhone = (phoneDetails) =>{
  console.log(phoneDetails);
  // const singlePhone = document.getElementById("single-phone");
  const div = document.createElement("div");
  singlePhone.innerHTML = "";
  div.classList.add("card");
  div.style.width = "25rem";
  div.style.margin = "auto";
  div.innerHTML =`
      <img src="${phoneDetails.data.image}" class="card-img-top" alt="phone image">
      <div class="card-body">
        <h5 class="card-title" style="margin: 10px 0px 25px;">${phoneDetails.data.name}</h5>

        <table class="table table-striped table-hover table-bordered mx-auto"  style="max-width: 30rem;">
          <tbody>
            <tr>
              <th scope="row">First release</th>
              <td>${phoneDetails.data.releaseDate ? phoneDetails.data.releaseDate : 'No release date has found.'}</td>
            </tr>
            <tr>
              <th scope="row">Chip set</th>
              <td>${phoneDetails.data.mainFeatures.chipSet}</td>
            </tr>
            <tr>
              <th scope="row">Display size</th>
              <td colspan="2">${phoneDetails.data.mainFeatures.displaySize}</td>
            </tr>
            <tr>
            <th scope="row">Memory</th>
            <td colspan="2">${phoneDetails.data.mainFeatures.memory}</td>
          </tr>
          </tbody>
        </table>

      </div>
  `;
  singlePhone.appendChild(div);
  
}