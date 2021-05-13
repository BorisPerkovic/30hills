
/* person function activating on click search button  */
function person() {

  /* including data.json file and parse data argument to users function  */
  fetch("./data.json")
    .then(response => response.json())
    .then(data => users(data));

  /*
    -reference to input field
    -reference to HTML element where to store users data
    -array variable for users friends of friends
    -one array variable for users friends of friends id
    -array with non duplicates users friends of friends
  */
  var input = document.querySelector("#usersId").value;
  var div = document.getElementById("response");
  var html = "";
  var friendsOfFriends = [];
  var friendsOfFriendsId = [];
  var array = [];
  

  

  function users(data) {

  /* function to get users friends and create users friends HTML  */
  function getUserFriendsHTML(data) {

    html += "<div class='col-md-4 mt-3 py-5'>";
    html += "<h3>" + user + "'s friends:</h3>";
    for (var i = 0; i < usersFriends.length; i++) {
      for (j in data) {
        if (usersFriends[i] === data[j].id) {

          /* creating array of users friends  */
          friendsOfFriends[friendsOfFriends.length] = data[j].friends;
          html += "<p>" + data[j].firstName + " " + data[j].surname + "</p>";

        }
      }
    }
    html += "</div>";

    return html;
  }

  /* function to create one array with friends of friends id  */
  function createFriendsOfFriendsIdList(friendsOfFriendsId) { 

    for (var i = 0; i < friendsOfFriends.length; i++) {
      for(j = 0; j < friendsOfFriends[i].length; j++){
        friendsOfFriendsId[friendsOfFriendsId.length] = friendsOfFriends[i][j];
      }
    }
  }

  /* function to get users friends of friends with non duplicates and create users friends of friends HTML  */
  function getFriendsOfFriendsHTML(usersFriends , friendsOfFriendsId) {
    html += "<div class='col-md-4 mt-3 py-5'>";
    html += "<h3>" + user + "'s friends of friends:</h3>";
    for (var i = 0; i < usersFriends.length; i++) {
        for(var j = 0; j < friendsOfFriendsId.length; j++) {
          if (usersFriends[i] !== friendsOfFriendsId[j] && usersId !== friendsOfFriendsId[j]) {
            if (!usersFriends.includes(friendsOfFriendsId[j])) {
              array[array.length] = friendsOfFriendsId[j];
            }
          
          }
      }
    }
  
    /* function to get and create non duplicates */ 
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    var newArray =  array.filter(onlyUnique);

    for(var i = 0; i < newArray.length; i++) {
      for(j in data) {
        if(newArray[i] === data[j].id) {
          html += "<p>" + data[j].firstName + " " + data[j].surname + "</p>";
        }
      }
      
    }
    html += "</div>";

    return html;
  }
    
  /* function to get suggested friends and create suggested friends HTML  */
  function getSuggestedFriendsHTML(array) {
    html += "<div class='col-md-4 mt-3 py-5'>";
    html += "<h3>Suggested friends for " + user + ":</h3>";
    function suggestedFriends (array) {
      var string = "";
      var counter = 0;
      var max = 0;
      var nextToMax = 0;
      var indexOfMax;
      var indexOfNextToMax;
      for (var i = 0; i < array.length; i++) {
        counter = 0;
        for(var j= 0; j < array.length; j++) {
          if(array[i] === array[j]) {
            counter++;
          }
          if(max < counter) {
            nextToMax = max;
            max = counter;
            indexOfMax = array[i];
          } else {
            indexOfNextToMax = array[i];
          }
        }
      }
      for(i in data) {
        if(indexOfMax === data[i].id || indexOfNextToMax === data[i].id) {
          string += "<p>" + data[i].firstName +  " " + data[i].surname + "</p>";
        }
      }
      return string;
    }
    html += "<p>" + suggestedFriends(array) + "</p>";
    html += "</div>";
  }

  /*============
   showing information on screen 
  =============*/

    /* check if input field is an empty string, if it is show message to user */
    if (input !== "") {

      var num = parseInt(input);

      /* check if input field is number or string, if it is string show message to user */
      if (isFinite(num)) {

        /* check if users id exists, if it doesn't show message to user */
        if (num <= data.length) {
          for (i in data) {
            if (data[i].id === num) {
              var usersFriends = data[i].friends;
              var user = data[i].firstName;
              var lastname = data[i].surname;
              var usersId = data[i].id;
              html += "<h4 class='text-center'>You choose: </h4>";
              html += "<h4 class='text-center display-3'>" + user + " " + lastname + "</h4>";
            }
          }

          getUserFriendsHTML(data);

          createFriendsOfFriendsIdList(friendsOfFriendsId);
          
          getFriendsOfFriendsHTML(usersFriends , friendsOfFriendsId);          

          getSuggestedFriendsHTML(array);

        } else {
          html += "<p class='text-danger'>No user with ID " + num + " !! Please type number from 1 to " + data.length +"</p>";
        }

      } else {
        html += "<p class='text-danger'>Only numbers are allowed!!</p>";
      }

    } else {
      html += "<p class='text-danger'>Empty field. Please, enter users id!!</p>";
    }


    return div.innerHTML = html;
  }

}