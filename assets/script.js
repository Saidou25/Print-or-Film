var googleBooks = "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAwpnTlCB_XLFsQfftXziK3rDq7m9vf6R0";
var omdb = "http://www.omdbapi.com/?i=tt3896198&apikey=56ad700b";
//   http://www.omdbapi.com/?apikey=[yourkey]&

var books = $("#books");

$(".btn-primary").click(function (event) {
    event.preventDefault();
    var input = $("#textInput").val();
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + input;
    console.log(url);

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    for (let i = 0; i < data.items.length; i++) {
                      var title = (data.items[i].volumeInfo.title);

                      var card = $('<div>').addClass('card');
                      var cardImg = $('<img>').addClass('card-img-top');
                      var cardBody = $('<div>').addClass('card-body');
                      var cardTitle = $('<h5>').addClass('card-title');
                      var cardParagraph = $('<p>').addClass('card-text');
                      var cardLink = $('<a>').addClass('btn btn-primary');

                      cardBody
                        .append(cardTitle)
                        .append(cardParagraph)
                        .append(cardLink);
                      
                      card
                        .append(cardImg)
                        .append(cardBody);

                      cardTitle.text(title);

                      $("#card-container").append(card);
                        // generateCard(data.items[i].volumeInfo);
                    }
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('No results found!');
        });

})

function generateCard(cardData) {
    var books = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<div>").addClass("card-title").text(cardData.title);
    // date - card subttitle
    // info - card-text
    var cardText = $("<div>").addClass("card-text").text(cardData.title);
    // button
    cardBody.append(cardTitle);
    cardText.append(cardBody);
    books.append(cardBody);
    // cardContainer.append(books);
}


// fetch(omdb)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// fetch(googleBooks)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

