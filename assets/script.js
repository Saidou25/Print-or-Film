var googleBooks = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAwpnTlCB_XLFsQfftXziK3rDq7m9vf6R0";
var omdb = "http://www.omdbapi.com/?i=tt3896198&apikey=56ad700b";

var displayBooks = function (data) {
  $("#card-container").empty();
  data.items.forEach(item => item.volumeInfo.averageRating ? true : item.volumeInfo.averageRating = 0);
  data.items.forEach(item => item.volumeInfo.ratingsCount ? true : item.volumeInfo.ratingsCount = 0);
  var items = data.items;
  items.sort((a, b) => b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount);
  for (let i = 0; i < data.items.length; i++) {
    var title = (data.items[i].volumeInfo.title);
    var rating = (data.items[i].volumeInfo.averageRating);
    var img = (data.items[i].volumeInfo.imageLinks.smallThumbnail);

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
    cardLink.text('Add to Reading List');

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
    // generateCard(data.items[i].volumeInfo);  
  }
}

var displayMovie = function (data) {
  $("#movie-container").empty();
  var movieTitle = (data.Title);
  var movieRating = (data.imdbRating);
  var moviePoster = (data.Poster);

  var movieCard = $('<div>').addClass('card mb-3');
  var movieCardRow = $('<div>').addClass('row g-0');
  var movieCardRowDiv = $('<div>').addClass('col-sm-4 col-xs-12');
  var movieCardImg = $('<img>').addClass('card-img-top');
  var movieCardBodyDiv = $('<div>').addClass('col-md-8');
  var movieCardBody = $('<div>').addClass('card-body');
  var movieCardTitle = $('<h5>').addClass('card-title');
  var movieCardParagraph = $('<p>').addClass('card-text');
  var movieCardLink = $('<button>').addClass('btn btn-secondary');
  
  movieCardLink.text('Add to Watchlist');
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
  var movieURL = 'http://www.omdbapi.com/?apikey=56ad700b&t=' + q;
  // Movie Results
  fetch(movieURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(displayMovie)
          .catch(function (error) {
            // no alert messages
            alert('No results found!');
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
  var movieSave = $(this).siblings('.card-title');  
  console.log(movieSave);
});
$(document).on('click', '.btn-info', function () {
  console.log("click");
  console.log($(this));
});

// var saveBtn = $('.btn-secondary');

// $(saveBtn).click(function () {
//   var text = $(this).siblings(cardImg).val();
//   console.log("click");
//   localStorage.setItem(time, text);
// });

if (location.href.includes('search-results.html') && location.search) {
  var params = new URLSearchParams(location.search);
  var q = params.get('q');
  if (q) fetchResults(q);
}
