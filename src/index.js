const BASE_URL = "http://localhost:3000/beers"
const beerDiv = document.getElementById("beer-detail")
const beerUl = document.getElementById("list-group")

window.addEventListener('DOMContentLoaded', (event) => {
   console.log('DOM fully loaded and parsed');
   getBeers()
   showBeer()
});//DOMContentLoaded closing

// GET request to base URL & rendering information about all the beers
function getBeers() {
   fetch(BASE_URL)
   .then(function(response) {
      return response.json()
   })
   .then(function(data) {
      // console.log(data)
      // iterate through the beers and for each, create a list element with the beer name
      data.forEach(function(beer) {
         let beerLi = document.createElement("li")
         beerLi.className = "list-group-item"
         beerLi.dataset.beerId = `${beer.id}`
         beerLi.innerHTML = `
         ${beer.name}
         `
         beerUl.append(beerLi)
         })
      })    
   } //getBeers closing

   // show each individual beer's details; GET request to /beers/:id
   // click event listener on beerLi -- beerLi has a dataset beerId so we can access the beer id we need
   function showBeer() {
      beerUl.addEventListener("click", function(event) {
         // console.log(event.target.dataset.beerId)
         let thisBeerId = event.target.dataset.beerId
         // console.log(thisBeerId)
         fetch(`${BASE_URL}/${thisBeerId}`)
         .then(function(response) {
            // console.log(response)
            return response.json()
         })
         .then(function(data) {
            beerDiv.innerHTML = `
            <h1>${data.name}</h1>
            <img src="${data.image_url}">
            <h3>${data.tagline}</h3>
            <textarea>${data.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-beer-id=${data.id}>Save</button>
            `
            // PATCH request to /beers/:id
            const editButton = document.getElementById("edit-beer")
            editButton.addEventListener("click", function(event) {
               // console.log(event.target.previousElementSibling.value)
               let newDesc = event.target.previousElementSibling.value

               fetch(`${BASE_URL}/${thisBeerId}`, {
                  method: "PATCH", 
                  headers: {
                     "Content-Type": "application/json", 
                     "Accept": "application/json"
                  }, 
                  body:  JSON.stringify({description: `${newDesc}`})
               })
            })
         })
      })
   }//showBeer closing

