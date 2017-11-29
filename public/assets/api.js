// ajax call to populate resturant list
 
  var pos = "";
  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    pos = "&location=" + position.coords.latitude + ',' + position.coords.longitude;
}


 
   function setResturant(type,price)  {
        

          console.log(pos);
          
          // create query argument 
          var queryText = type + "+Restaurants+near" + pos + "&price_level=" + price;
          console.log(queryText);
            
          // CALL AJAX and get data
          $.ajax
          ({
            type: "GET",
            url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + queryText + "&key=AIzaSyBGxXK3pm9NbMHCeqa6TcdWJxzGfI2TwG4",
            dataType: 'json',
            
            success: function (data){
           
               // default is 10, adjust if result set has less than 10
                    var resultLen =10;
                    if (data.results.length < 10) {
                        resultLen = data.results.length;
                    }

               //  create drop down list for loacal resturants     
                    var create = '<select id="rest" class="text-center" >';
                    for (var i = 0; i < resultLen; i++) { 


                         $.ajax
                         ({
                           type: "GET",
                           url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + data.results[i].place_id + "&key=AIzaSyBGxXK3pm9NbMHCeqa6TcdWJxzGfI2TwG4",
                           dataType: 'json',
                           success: function (data){
                            console.log(data.result.name);
                            console.log(data.result.rating);
                            console.log(data.result.price_level);
                            console.log(data.result.formatted_address.replace(", USA", " "));
                            console.log(data.result.formatted_phone_number);
                            console.log(data.result.url);
                            console.log(data.result.website);
                           }
                          });
                         var rest = data.results[i].place_id + " " + data.results[i].name + " " + data.results[i].formatted_address;
                         rest = rest.replace(", United States", " ");
                         rest = rest.slice(0, rest.length - 11);
                         
                         create += '<option  value="'+rest+'">'+rest+'</option>';
                    }
                    create += '</select><br />';
                    console.log(create);
            
             }
          });
  };

  getLocation();
 