var googleBooks = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAwpnTlCB_XLFsQfftXziK3rDq7m9vf6R0";
var omdb = "http://www.omdbapi.com/?i=tt3896198&apikey=56ad700b";
//   http://www.omdbapi.com/?apikey=[yourkey]&

var books = $("#books");

// Search Bar
$(".btn-primary").click(function (event) {
    event.preventDefault();
    var input = $("#textInput").val();
    var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + input;
    var movieURL = 'http://www.omdbapi.com/?apikey=56ad700b&t=' + input;

    // Book Results
    fetch(bookUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
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
                        
                        // Local Storage
                    var saveBookBtn = $('.btn-info');

                    $(saveBookBtn).click(function () {
                     console.log("book click");
                    })
                    }
                });
            } else {
                alert('Error: ' + response.statusText);
                // No alerts - redirect to error message
            }
        })
        .catch(function (error) {
            // No alerts - redirect to error message
            alert('No results found!');
        });

    // Movie Results
    fetch(movieURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    $("#movie-container").empty();
                    console.log(data);
                    var movieTitle = (data.Title);
                    var movieRating = (data.imdbRating);
                    var moviePoster = (data.Poster);

                    var movieCard = $('<div>').addClass('card');
                    var movieCardImg = $('<img>').addClass('card-img-top');
                    var movieCardBody = $('<div>').addClass('card-body');
                    var movieCardTitle = $('<h5>').addClass('card-title');
                    var movieCardParagraph = $('<p>').addClass('card-text');
                    var movieCardLink = $('<button>').addClass('btn btn-secondary');

                    movieCardBody
                        .append(movieCardTitle)
                        .append(movieCardParagraph)
                        .append(movieCardLink);

                    movieCard
                        .append(movieCardImg)
                        .append(movieCardBody);

                    movieCardTitle.text(movieTitle);
                    movieCardParagraph.text(movieRating + "/10");
                    movieCardImg.attr('src', moviePoster);

                    $("#movie-container").append(movieCard);
                    // generateCard(data.items[i].volumeInfo);

                    // Local Storage
                    var saveMovieBtn = $('.btn-secondary');

                    $(saveMovieBtn).click(function () {
                     console.log("click");
                    })
                }
                );
            } else {
                // no alert messages
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            // no alert messages
            alert('No results found!');
        });

// eb-005
})

// Local Storage
var saveBtn = $('.btn-secondary');

$(saveBtn).click(function () {
    var text = $(this).siblings(cardImg).val();
    console.log("click");
    localStorage.setItem(time, text);
})


// Home search redirect

// var searchButton = $('btn-primary');

// var goSearch = function (event) {
//     event.preventDefault();
//     var q = qInput.value.trim();
//     var format = formatInput.value;
//     if (q) {
//         if (location.href.includes('search-results.html')) {
//             fetchResults(q, format);
//         } else {
//             location.assign('./search-results.html');
//         }
//     }
// };

// searchButton = addEventListener('click', goSearch);
// =======
// })
// main
