let watchlistJSON = localStorage.getItem('watchlist')
let watchlist = JSON.parse(watchlistJSON)

//render array of movies
function renderMovies(movies) {
    const movieHtmlArray = movies.map(function(currentMovie) {
        //html template for movie card
        return `<div class="movie col-4">
            <div class="card" style="width:">
                <img src="${currentMovie.Poster}" class="card-img-top" alt="${currentMovie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${currentMovie.Title}</h5>
                    <p class="card-text">${currentMovie.Year}</p>
                    <a href="#" class="btn btn-primary remove-button" data-imdbid='${currentMovie.imdbID}'>Remove</a>
                </div>
            </div>
        </div>`
    });
    html = movieHtmlArray.join("");
    //place html string in results div
    const results = document.querySelector("#movies-container")
    results.innerHTML = html
}

renderMovies(watchlist)

//remove watchlist when remove button is clicked
document.addEventListener('click', function(event) {
    const movieID = event.target.dataset.imdbid
    if (event.target.classList.contains('remove-button')) {
        watchlist.filter()
        saveToWatchlist(movieID)
    }
})