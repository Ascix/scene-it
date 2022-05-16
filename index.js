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
                    <a href="#" class="btn btn-primary add-button" data-imdbid='${currentMovie.imdbID}'>Add</a>
                </div>
            </div>
        </div>`
    });
    html = movieHtmlArray.join("");
    //place html string in results div
    const results = document.querySelector("#results")
    results.innerHTML = html
}

//render movies when form is submitted
const search = document.getElementById('search-form')
const input = document.querySelector('.search-bar')

search.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchString = input.value
    const urlEncodedSearchString = encodeURIComponent(searchString)
    fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
        .then(res => res.json())
        .then(function(data){
            // use data here
            movieData = data.Search  
            renderMovies(data.Search)
            
        })
})

//save to watchlist when add button is clicked
document.addEventListener('click', function(event) {
    const movieID = event.target.dataset.imdbid
    if (event.target.classList.contains('add-button')) {
        saveToWatchlist(movieID)
    }
})

//save to watchlist
function saveToWatchlist(movieID) {
    const movie = movieData.find(function(currentMovie) {
        return currentMovie.imdbID == movieID
    })
    // pull watchlist from local storage
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    if (watchlist == null) {
        watchlist = []
    }
    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON);
}
