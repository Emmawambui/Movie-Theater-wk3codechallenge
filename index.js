const moviesListNode = document.querySelector("#films")
 

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
.then(movie => movie)

}

function renderMovieListDetail(movie){
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
    const h1 = movieMoreDetails.querySelector("#my-title")
    const runtime = movieMoreDetails.querySelector("#runtime span")
    const showtime = movieMoreDetails.querySelector("#showtime span")
    const availabletickets = movieMoreDetails.querySelector("#available-tickets span")
    const button= movieMoreDetails.querySelector("#my-tickets")
    button.addEventListener("click", handleAvailableTickets)
    const deleteButton = movieMoreDetails.querySelector("#delete")

    h1.textContent = movie.title
    runtime.textContent= movie.runtime
    showtime.textContent = movie.showtime
    availabletickets.textContent = (movie.capacity-movie.tickets_sold)

    const isSoldOut = movieIsSoldOut(movie)
    if(isSoldOut) {
        button.textContent = "Sold Out"
        button.disabled = true
    } else {
        button.textContent = "Buy Ticket"
    }
   
    // deleteButton.textContent = 

}

function movieIsSoldOut(movie){
    return movie.capacity===movie.tickets_sold;

}





window.onload= renderMoviesList