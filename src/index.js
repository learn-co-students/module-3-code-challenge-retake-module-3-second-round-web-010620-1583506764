document.addEventListener("DOMContentLoaded", function(event){
    BEER_URL = "http://localhost:3000/beers"
    
    
    let ul = document.getElementById('list-group')

    fetch(BEER_URL)
    .then(resp =>resp.json())
    .then(beers => beers.forEach(beer=> {

        let li = document.createElement('li')
        li.innerText = `${beer.name}`
        li.dataset.id =`${beer.id}`
        ul.appendChild(li)
    })
    )//List of all the beers

    ul.addEventListener('click',function(e){
        let beerId = parseInt(e.target.dataset.id)
        let divCard= document.getElementById("beer-detail")

        fetch(`${BEER_URL}/${beerId}`)
        .then(resp => resp.json())
        .then(beer => {
         
        divCard.innerHTML =`
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button data-id =${beer.id} id="edit-beer" class="btn btn-info">
          Save
        </button>`
        
        let button = document.getElementById('edit-beer')
        button.addEventListener("click", function(event){
        let textValue = event.target.parentNode.children[3]
        let newTxt = textValue.value

        let body = {description: newTxt}

            fetch(`${BEER_URL}/${beerId}`, {
            method: 'PATCH', 
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
             },
            body: JSON.stringify(body),
            })
            .then(resp =>resp.json())
            .then(beer => {
                textValue.innerText = beer.description     
            })
               
            
        

        })
        })


    })

})//DOMM loaded
