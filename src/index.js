const BASE_URL = "http://localhost:3000/beers"
const beerDiv = document.getElementById("beer-detail")
const beerUl = document.getElementById("list-group")

window.addEventListener('DOMContentLoaded', (event) => {
   console.log('DOM fully loaded and parsed');
   getBeers()
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
         beerLi.innerHTML = `
         ${beer.name}
         `
         beerUl.append(beerLi)
         })
      })    
   } //getBeers closing

   // When I click a beer name, the application should reveal more information about that particular beer. See the example above for the additional information that should be displayed.

   // Route: GET http://localhost:3000/beers/:id