const moviesListNode = document.querySelector("#films")

let loadedMovieId = 1;
 

function fetchAllMovies(){
    return fetch( `http://localhost:3000/films`, {
            headers: {
                "Content-type": "application/json",
            }
    })
    .then(resp => resp.json())
    .then(movies => movies)
}

async function renderMoviesList(){
    const movies = await fetchAllMovies()
    movies.forEach(movie => {
        const li=document.createElement("li")
        li.textContent= movie.title
        li.id= movie.id
        li.addEventListener("click", handleDisplayMovie)
         
        moviesListNode.appendChild(li)
    });


    renderMovieListDetail(movies[0])
    renderTicketAvailable(movies[0])
}

async function handleDisplayMovie(e){
    const id= e.target.id
    const movie = await fetchMovieById(id)
    renderMovieListDetail(movie)
    renderTicketAvailable(movie)
    movieIsSoldOut(movie)
}
function fetchMovieById(id){
    return fetch( `http://localhost:3000/films/${id}`, {
        headers: {
            "Content-type": "application/json",
        }
})
.then(resp => resp.json())
.then(movie => {
    renderTicketAvailable(movie)
    renderMovieListDetail(movie)
})

}

function renderMovieListDetail(movie){
    loadedMovieId = movie.id
        const movieInfo= document.querySelector("#movie-about")
        const h1 = movieInfo.querySelector("#title")
        const img= movieInfo.querySelector("#image")
        const p = movieInfo.querySelector("#text")

        h1.textContent = movie.title
        img.src = movie.poster
        p.textContent = movie.description

}

function renderTicketAvailable(movie){
    const movieMoreDetails= document.querySelector("#tickets")
    const h1 = document.querySelector("#my-title")
    const runtime = document.querySelector("#runtime span")
    const showtime = document.querySelector("#showtime span")

    h1.textContent = movie.title
    runtime.textContent= movie.runtime
    showtime.textContent = movie.showtime

    let capacity = movie.capacity
    let tickets_sold = movie.tickets_sold
    let remaining = capacity - tickets_sold
    
    const availabletickets = document.querySelector("#available-tickets span")
    availabletickets.innerText = remaining;
    const button= movieMoreDetails.querySelector("#my-tickets")
    button.addEventListener("click", () => {
        if (remaining > 0 ){
            remaining--
            availabletickets.innerText = remaining
        }
        else{
            button.disabled = true
            button.innerHTML = 'SoldOut'
            button.style.backgroundColor='grey'
        }
    })
    const deleteButton = movieMoreDetails.querySelector("#delete")

   
    

    
}
   
   
    // const isSoldOut = movieIsSoldOut(movie)
    // if(isSoldOut) {
    //     button.textContent = "Sold Out"
    //     button.disabled = true
    // } else {
    //     button.textContent = "Buy Ticket"
    // }
   
    // deleteButton.textContent = 



// function handleAvailableTickets(movie) {
//    availabletic
// }

// function movieIsSoldOut(movie){
//     return movie.capacity===movie.tickets_sold;

// }


// console.log(loadedMovieId)


 window.onload= renderMoviesList