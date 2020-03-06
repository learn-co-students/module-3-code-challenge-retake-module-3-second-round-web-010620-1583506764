document.addEventListener("DOMContentLoaded", function(event){
    
    BASE_URL = "http://localhost:3000/beers"
    let ul = document.getElementById('list-group')

    fetch(BASE_URL)
    .then(resp =>resp.json())
    .then(beers => beers.forEach(beer=>{

        let li = document.createElement('li')
        li.innerText = `${beer.name}`
        ul.appendChild(li)
        li.dataset.id  = `${beer.id}`
    })
    )//fetch

    ul.addEventListener("click", function(event){
        let beerId = parseInt(event.target.dataset.id)
        let div  = document.getElementById("beer-detail")

        fetch(`${BASE_URL}/${beerId}`)
        .then(resp =>resp.json())
        .then(beer =>{
         
        div.innerHTML =`
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button data-id =${beer.id} id="edit-beer" class="btn btn-info">
          Save
        </button>`
        let button = document.getElementById('edit-beer')
        button.addEventListener("click", function(event){

        let textArea = event.target.parentNode.children[3]

        let newText = textArea.value

        let body = {description: newText}

            fetch(`${BASE_URL}/${beerId}`, {
            method: 'PATCH', 
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
             },
            body: JSON.stringify(body),
            })
            .then(resp =>resp.json())
            .then(beer => {
                textArea.innerText= beer.description     
            })
               
            //fetch
        

        })//event
        })//fetch


    })//ul eventL












})//dom loaded