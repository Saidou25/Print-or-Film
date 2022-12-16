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
        response.json().then(displayBooks);
      }
    })
    .catch(function (error) {    
    });
}

var fetchMovie = function (q) {
  var movieURL = 'https://www.omdbapi.com/?apikey=56ad700b&t=' + q;
  // Movie Results
  fetch(movieURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(displayMovie)
          .catch(function (error) {
            // no alert messages
            var noMovie = $("<h5>").addClass("No-movie-results");
            var noMovieCol = $("<div>").addClass("no-movie-col")
            var noMovieBody = $("<div>").addClass("no-movie-body");

            var noMovieCard = $("<div>").addClass("no-movie-card");
            noMovie.text("No movie found.");
            noMovieBody
              .append(noMovie);

            noMovieCard
              .append(noMovieBody);

            noMovieCol
              .append(noMovieCard);

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
  if ($(this).hasClass("btn-danger")) {
    var getmovies = localStorage.getItem("movies") || '[]';
    movieItems = JSON.parse(getmovies);
    var index = movieItems.indexOf(movieSave);
    if (index > -1) {
      movieItems.splice(index, 1);
      localStorage.setItem("movies", JSON.stringify(movieItems));
    }
    $(this).removeClass("btn-danger");
    $(this).text("☆ Add to Watchlist");
  } else {
    $(this).addClass("btn-danger");
    // get items from localStorage, or declare new one if not exist
    var getmovies = localStorage.getItem("movies") || '[]';
    movieItems = JSON.parse(getmovies);
    // declare and add the new item
    movieItems.push(movieSave);
    localStorage.setItem("movies", JSON.stringify(movieItems));
    $(this).text("★ Added to Watchlist!");
  }
});

$(document).on('click', '.btn-info', function () {
  var bookSave = $(this).attr('id');
  if ($(this).hasClass("btn-danger")) {
    var getBooks = localStorage.getItem("books") || '[]';
    bookItems = JSON.parse(getBooks);
    var index = bookItems.indexOf(bookSave);
    if (index > -1) {
      bookItems.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(bookItems));
    }
    $(this).removeClass("btn-danger");
    $(this).text("☆ Add to Reading list");
  } else {
    $(this).addClass("btn-danger");
    // get items from localStorage, or declare new one if not exist
    var getBooks = localStorage.getItem("books") || '[]';
    bookItems = JSON.parse(getBooks);
    // declare and add the new item
    bookItems.push(bookSave);
    localStorage.setItem("books", JSON.stringify(bookItems));
    $(this).text("★ Added to Reading list!");
  }
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
  if (bookItems.length) $("#watch-book-container").empty();
  for (var i = 0; i < bookItems.length; i++) {
    var q = bookItems[i];
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + q;
    // Book Results
    fetch(bookUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(data => watchBooks(data, false));
        }
      })
      .catch(function (error) {
      });

    // Movie Results
  }
  var movieItems = localStorage.getItem("movies") || '[]';
  movieItems = JSON.parse(movieItems);
  if (movieItems.length) $("#watch-movie-container").empty();
  for (var i = 0; i < movieItems.length; i++) {
    var q = movieItems[i];
    var movieURL = 'https://www.omdbapi.com/?apikey=56ad700b&i=' + q;
    fetch(movieURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(data => watchMovie(data, false));
        }
      })
  }
}

var watchMovie = function (data, clear) {
  clear && $("#watch-movie-container").empty();

  var wMovieTitle = (data.Title);
  var wMovieRating = (data.imdbRating);
  var wMoviePoster = (data.Poster);
  var wMovieId = (data.imdbID);

  var wMovieCol = $('<div>').addClass('col-12 col-lg-2 col-md-3 col-sm-4 col-xs-12 bg-secondary rounded m-1 p-2');
  var wMovieCard = $('<div>').addClass('card');
  var wMovieCardImg = $('<img>').addClass('card-img-top');
  var wMovieCardBody = $('<div>').addClass('card-body');
  var wMovieCardTitle = $('<h5>').addClass('card-title');
  var wMovieCardParagraph = $('<p>').addClass('card-text');
  var wMovieCardLink = $('<button>').addClass('btn btn-secondary btn-danger');

  wMovieCardLink.attr('id', wMovieId);
  wMovieCardLink.text('★ Remove from Watchlist');
  wMovieCardTitle.text(wMovieTitle);
  wMovieCardParagraph.text(wMovieRating + "/10");
  wMovieCardImg.attr('src', wMoviePoster);

  wMovieCardBody
    .append(wMovieCardTitle)
    .append(wMovieCardParagraph)
    .append(wMovieCardLink);

  wMovieCard
    .append(wMovieCardImg)
    .append(wMovieCardBody);

  wMovieCol.append(wMovieCard);


  $("#watch-movie-container").append(wMovieCol);

}

// Watchlist Book Card Generation
var watchBooks = function (data, clear) {
  clear && $("#watch-book-container").empty();
  data.items.forEach(item => item.volumeInfo.averageRating ? true : item.volumeInfo.averageRating = 0);
  data.items.forEach(item => item.volumeInfo.ratingsCount ? true : item.volumeInfo.ratingsCount = 0);
  var title = (data.items[0].volumeInfo.title);
  var rating = (data.items[0].volumeInfo.averageRating);
  var img = (data.items[0].volumeInfo.imageLinks.smallThumbnail);
  var id = (data.items[0].id);

  var col = $('<div>').addClass('col-12 col-lg-2 col-md-3 col-sm-4 col-xs-12 bg-secondary rounded m-1 p-2');
  var card = $('<div>').addClass('card');
  var cardImg = $('<img>').addClass('card-img-top');
  var cardBody = $('<div>').addClass('card-body');
  var cardTitle = $('<h5>').addClass('card-title');
  var cardParagraph = $('<p>').addClass('card-text');
  var cardLink = $('<button>').addClass('btn btn-info btn-danger');

  cardTitle.text(title);
  cardParagraph.text(rating + "/5");
  cardImg.attr('src', img);
  cardLink.attr('id', id);
  cardLink.text('★ Remove from Reading List');

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