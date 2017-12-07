$(document).ready(function () {
    setHotel("Las+vegas+nv", 4);
});

function setHotel(location, price) {
    var queryText = location + "&type=lodging" + "&maxprice=" + price + "&rankby=prominence";
    $.ajax({
        method: "GET",
        url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + queryText + "&key=AIzaSyBGxXK3pm9NbMHCeqa6TcdWJxzGfI2TwG4",
        dataType: 'json',
    }).done(function (response) {
        var resultLen = 4;
        if (response.results.length < 4) {
            resultLen = response.results.length;
        }
        console.log(response.results);
        console.log(queryText);
        var links = []
        var names = []
        var ratings = []
        var websites = []
        var reviews = []
        for (var i = 0; i < resultLen; i++) {
            (function (count) {
                var mountPoint = document.querySelector("[data-id=a" + count + "]")
                var mountPoint1 = document.querySelector("[data-id=b" + count + "]")
                var mountPoint2 = document.querySelector("[data-id=c" + count + "]")
                var mountPoint3 = document.querySelector("[data-id=d" + count + "]")
                var mountPoint4 = document.querySelector("[data-id=e" + count + "]")
                $.ajax({
                    method: "GET",
                    url: "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + response.results[i].place_id + "&key=AIzaSyBGxXK3pm9NbMHCeqa6TcdWJxzGfI2TwG4",
                    dataType: 'json',
                }).done(function (responseId) {
                    var photoArr = []
                    console.log(responseId);
                    
                    var name = responseId.result.name;
                    console.log(name);
                    var h4 = document.createElement("P");
                    var nameText = document.createTextNode(name);
                    h4.appendChild(nameText);
                    names.push(name)
                    mountPoint1.appendChild(h4);
 
                   
                    
                    var rating = responseId.result.rating;
                    console.log(rating);
                    var h5 = document.createElement("P");
                    var ratingText = document.createTextNode("Rating: " + rating);
                    h5.appendChild(ratingText);
                    ratings.push(rating)
                    mountPoint2.appendChild(h5);
                    
                    var review = responseId.result.reviews[0].text;
                    console.log(review);
                    var h6 = document.createElement("P");
                    var reviewText = document.createTextNode(review);
                    h6.appendChild(reviewText);
                    reviews.push(review)
                    mountPoint3.appendChild(h6);

                    var website = responseId.result.website;
                    console.log(website);
                    var a = $('<a />');
                    a.attr('href', website);
                    a.text('Visit their Website');
                    websites.push(website)
                    $(mountPoint4).append(a);
                    
                    var photo = responseId.result.photos[0].photo_reference;
                    console.log(photo);
                    var url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=254&maxheight=200&photoreference=" + photo + "&key=AIzaSyBGxXK3pm9NbMHCeqa6TcdWJxzGfI2TwG4"
                    var img = document.createElement("IMG");
                    img.src = url;
                    img.style = "height: 175px; width: 225px;"
                    links.push(url)
                    mountPoint.appendChild(img);
                    console.log('update')


                })
            })(i)
        }
    })
}