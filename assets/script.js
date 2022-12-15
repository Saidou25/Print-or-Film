var googleBooks = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAwpnTlCB_XLFsQfftXziK3rDq7m9vf6R0";
var omdb = "http://www.omdbapi.com/?i=tt3896198&apikey=56ad700b";

var displayBooks = function (data) {
  $("#card-container").empty();
  data.items.forEach(item => item.volumeInfo.averageRating ? true : item.volumeInfo.averageRating = 0);
  data.items.forEach(item => item.volumeInfo.ratingsCount ? true : item.volumeInfo.ratingsCount = 0);
  var items = data.items;
  items.sort((a, b) => b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount);
  for (var i = 0; i < data.items.length; i++) {
    var title = (data.items[i].volumeInfo.title);
    var rating = (data.items[i].volumeInfo.averageRating);
    var img = (data.items[i].volumeInfo.imageLinks.smallThumbnail);
    var id = (data.items[i].id);

    var col = $('<div>').addClass('col-12 col-lg-2 col-md-3 col-sm-4 col-xs-12');
    var card = $('<div>').addClass('card');
    var cardImg = $('<img>').addClass('card-img-top');
    var cardBody = $('<div>').addClass('card-body');
    var cardTitle = $('<h5>').addClass('card-title');
    var cardParagraph = $('<p>').addClass('card-text');
    var cardLink = $('<button>').addClass('btn btn-info');

    cardTitle.text(title);
    cardParagraph.text(rating + "/5");
    cardImg.attr('src', img);
    cardLink.attr('id', id);
    cardLink.text('☆ Add to Reading List');

    cardBody
      .append(cardTitle)
      .append(cardParagraph)
      .append(cardLink);

    card
      .append(cardImg)
      .append(cardBody);

    col
      .append(card);


    $("#card-container").append(col);
  }
}

var displayMovie = function (data) {
  $("#movie-container").empty();
  var movieTitle = (data.Title);
  var movieRating = (data.imdbRating);
  var moviePoster = (data.Poster);
  var movieId = (data.imdbID);

  if (movieId === undefined) {
    console.log(nope);
}

  var movieCard = $('<div>').addClass('card mb-3');
  var movieCardRow = $('<div>').addClass('row g-0');
  var movieCardRowDiv = $('<div>').addClass('col-sm-4 col-xs-12');
  var movieCardImg = $('<img>').addClass('card-img-top');
  var movieCardBodyDiv = $('<div>').addClass('col-md-8');
  var movieCardBody = $('<div>').addClass('card-body');
  var movieCardTitle = $('<h5>').addClass('card-title');
  var movieCardParagraph = $('<p>').addClass('card-text');
  var movieCardLink = $('<button>').addClass('btn btn-secondary');

  movieCardLink.attr('id', movieId);
  movieCardLink.text('☆ Add to Watchlist');
  movieCardTitle.text(movieTitle);
  movieCardParagraph.text(movieRating + "/10");
  movieCardImg.attr('src', moviePoster);

  movieCardBody
    .append(movieCardTitle)
    .append(movieCardParagraph)
    .append(movieCardLink);

  movieCardBodyDiv.append(movieCardBody)
  movieCardRowDiv.append(movieCardImg)
  movieCardRow
    .append(movieCardRowDiv)
    .append(movieCardBodyDiv);

  movieCard.append(movieCardRow);


  $("#movie-container").append(movieCard);

}

var fetchBooks = function (q) {
  var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + q;
  // Book Results
  fetch(bookUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(displayBooks);
      }
    })
    .catch(function (error) {
      // No alerts - redirect to error message "modal"
      alert('No results found!');
    });
}

var fetchMovie = function (q) {
  var movieURL = 'https://www.omdbapi.com/?apikey=56ad700b&t=' + q;
  // Movie Results
  fetch(movieURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(displayMovie)
          .catch(function (error) {
            // no alert messages
        var noMovie = $("<5>").addClass("No-movie-results");
        console.log(noMovie);
var noMovieCol =$("<div").addClass("no-movie-col")
        var noMovieBody = $("<div>").addClass("no-movie-body");

        var noMovieCard = $("<div>").addClass("no-movie-card");

        noMovieBody
        .append(noMovie);
        
        noMovieCard
        .append(noMovieBody);

        noMovieCol
        .append(nnoMovieColMovieCard);

$("#movie-container").append(noMovieCol);
          });

      }
    });
}

var fetchResults = function (q) {
  fetchMovie(q);
  fetchBooks(q);
};


// Search Bar
$(document).on('click', '.btn-primary', function (event) {
  event.preventDefault();
  var q = $("#textInput").val();

  if (location.href.includes("index.html") || location.href.includes("watchlist.html") || location.href.includes("search-results.html")) {
    location.assign("./search-results.html?q=" + q)
  };
});

// Local Storage
$(document).on('click', '.btn-secondary', function () {
  var movieSave = $(this).attr('id');

  // get items from localStorage, or declare new one if not exist
  var movieItems = localStorage.getItem("movies") || '[]';
  movieItems = JSON.parse(movieItems);
  // declare and add the new item
  movieItems.push(movieSave);
  localStorage.setItem("movies", JSON.stringify(movieItems));
  console.log(movieItems);
  $(this).addClass('btn-danger');
  $(this).text("★ Added to Watchlist!")
});

$(document).on('click', '.btn-info', function () {
  var bookSave = $(this).attr('id');

  // get items from localStorage, or declare new one if not exist
  var bookItems = localStorage.getItem("books") || '[]';
  bookItems = JSON.parse(bookItems);
  // declare and add the new item
  bookItems.push(bookSave);
  localStorage.setItem("books", JSON.stringify(bookItems));
  console.log(bookItems);
  $(this).addClass('btn-danger');
  $(this).text("★ Added to Reading List!")
});

if (location.href.includes('search-results.html') && location.search) {
  var params = new URLSearchParams(location.search);
  var q = params.get('q');
  if (q) fetchResults(q);
}

if (location.href.includes('watchlist.html')) {
  // Book Results
  var bookItems = localStorage.getItem("books") || '[]';
  bookItems = JSON.parse(bookItems);
  console.log(bookItems);
  if (bookItems.length) $("#watch-book-container").empty();
  for (var i = 0; i < bookItems.length; i++) {
    var q = bookItems[i];
    console.log(q);
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + q;
    // Book Results
    fetch(bookUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(data => watchBooks(data, false));
        }
      })
      .catch(function (error) {
        // No alerts - redirect to error message "modal"
        alert('No results found!');
      });

    // Movie Results
  }
  var movieItems = localStorage.getItem("movies") || '[]';
  movieItems = JSON.parse(movieItems);
  console.log(movieItems);
  if (movieItems.length) $("#watch-movie-container").empty();
  for (var i = 0; i < movieItems.length; i++) {
    var q = movieItems[i];
    var movieURL = 'https://www.omdbapi.com/?apikey=56ad700b&i=' + q;
    fetch(movieURL)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(data => watchMovie(data, false));
        }
      })
  }
}

// Watchlist Movie Card Generation
var watchMovie = function (data, clear) {
  clear && $("#watch-movie-container").empty();
  var wMovieTitle = (data.Title);
  var wMovieRating = (data.imdbRating);
  var wMoviePoster = (data.Poster);
  var wMovieId = (data.imdbID);


  var wMovieCol = $('<div>').addClass("col-12 col-lg-11 col-md-11 col-sm-12 bg-secondary rounded pt-2");
  var wMovieCard = $('<div>').addClass('card mb-3');
  var wMovieCardRow = $('<div>').addClass('row g-0');
  var wMovieCardRowDiv = $('<div>').addClass('col-sm-4 col-xs-12');
  var wMovieCardImg = $('<img>').addClass('card-img-top');
  var wMovieCardBodyDiv = $('<div>').addClass('col-md-8');
  var wMovieCardBody = $('<div>').addClass('card-body');
  var wMovieCardTitle = $('<h5>').addClass('card-title');
  var wMovieCardParagraph = $('<p>').addClass('card-text');
  var wMovieCardLink = $('<button>').addClass('btn btn-secondary');

  wMovieCardLink.attr('id', wMovieId);
  wMovieCardLink.text('★ Remove from Watchlist');
  wMovieCardTitle.text(wMovieTitle);
  wMovieCardParagraph.text(wMovieRating + "/10");
  wMovieCardImg.attr('src', wMoviePoster);

  wMovieCardBody
    .append(wMovieCardTitle)
    .append(wMovieCardParagraph)
    .append(wMovieCardLink);

  wMovieCardBodyDiv.append(wMovieCardBody)
  wMovieCardRowDiv.append(wMovieCardImg)
  wMovieCardRow
    .append(wMovieCardRowDiv)
    .append(wMovieCardBodyDiv);

  wMovieCard.append(wMovieCardRow);
  wMovieCol.append(wMovieCard);


  $("#watch-movie-container").append(wMovieCol);

}

// Watchlist Book Card Generation
var watchBooks = function (data, clear) {
  clear && $("#watch-book-container").empty();
  var items = data.items;
  items.sort((a, b) => b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount);
  for (var i = 0; i < data.items.length; i++) {
    var title = (data.items[i].volumeInfo.title);
    var rating = (data.items[i].volumeInfo.averageRating);
    var img = (data.items[i].volumeInfo.imageLinks.smallThumbnail);
    var id = (data.items[i].id);


    var col = $('<div>').addClass('col-12 col-lg-2 col-md-3 col-sm-4 col-xs-12 pt-2');
    var card = $('<div>').addClass('card');
    var cardImg = $('<img>').addClass('card-img-top');
    var cardBody = $('<div>').addClass('card-body');
    var cardTitle = $('<h5>').addClass('card-title');
    var cardParagraph = $('<p>').addClass('card-text');
    var cardLink = $('<button>').addClass('btn btn-info');

    cardTitle.text(title);
    cardParagraph.text(rating + "/5");
    cardImg.attr('src', img);
    cardLink.attr('id', id);
    cardLink.text('Remove from Reading List');

    var movieItems = localStorage.getItem("movies") || '[]';
    movieItems = JSON.parse(movieItems);
    if(id == movieItems)
    console.log('match')

    cardBody
      .append(cardTitle)
      .append(cardParagraph)
      .append(cardLink);

    card
      .append(cardImg)
      .append(cardBody);

    col
      .append(card);


    $("#watch-book-container").append(col);
  }
}


var buttonEl = $('.btn');
console.log(buttonEl.id)
var movieItems = localStorage.getItem("movies") || '[]';
  movieItems = JSON.parse(movieItems);
  console.log(movieItems);