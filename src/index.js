
document.addEventListener("DOMContentLoaded", function(event){
    const ul = document.getElementById("list-group")
    const detailDiv = document.getElementById("beer-detail")

    fetch("http://localhost:3000/beers")
    .then(resp => resp.json())
    .then(beers => beers.forEach(beer => beerInfo(beer)))

    
    
    function beerInfo(beer){
        const li = document.createElement('li')
        li.className = "list-group-item"
        li.innerHTML = `${beer.name}`
        li.dataset.id = beer.id
        ul.append(li)

    }
    
    ul.addEventListener("click", function(event){
        console.log(event.target)
        if (event.target.className === "list-group-item"){
            fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
            .then(resp => resp.json())
            .then(beers => displayBeers(beers))
        }
    })

 function displayBeers(beer){
    let div = document.createElement("div")
     div.dataset.id = beer.id
     div.innerHTML = `
     <h1>${beer.name}</h1>
     <img src=${beer.url}>
     <h3>${beer.tagline}</h3>
     <textarea>${beer.description}</textarea>
     <button id="edit-beer" class="btn btn-info"> Save </button>`
     detailDiv.append(div)


 }
    

    detailDiv.addEventListener("click", function(event){
        if (event.target.id === "edit-beer"){
            let description = document.querySelector("textarea")
            let newDescription = {description: description.value}
            fetch(`http://localhost:3000/beers/${event.target.parentNode.dataset.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newDescription)
                // "description" : description.value
            })
            
        }
    })
})



