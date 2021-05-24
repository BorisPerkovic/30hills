
/* person function activating on click search button  */
function person() {

  /*
    -reference to input field
    -reference to HTML element where to store users datas
  */
  var input = document.querySelector("#usersId").value;
  var div = document.getElementById("response");
  var html = "";

  /* including data.json file and parse data argument */
  fetch("./data.json")
    .then(response => response.json())
    .then(data => {

      var json = data;

      /* check if input field is an empty string, if it is show message to user */
      if (input !== "") {

        /* check if input field is number or string, if it is string show message to user */
        if (isFinite(parseInt(input))) {

          /* check if users id exists, if it doesn't show message to user */
          if (input <= json.length) {

            /* create constructor function User */
            function User(input, json) {
              this.firstname = json[input - 1].firstName;
              this.lastname = json[input - 1].surname;
              this.usersID = json[input - 1].id;
              this.usersFriends = json[input - 1].friends;
              this.friendsOfFriends = [];
              this.removeDuplicates = [];

              /* creating users friends od friends  */
              this.usersFriends.forEach((num) => {
                this.friendsOfFriends.push(...json[num - 1].friends);
              });

              /* removing duplicates from users friends od friends  */
              this.friendsOfFriends.forEach((num, index) => {
                if (!this.usersFriends.includes(num) && this.usersID !== this.friendsOfFriends[index]) {
                  if (!this.removeDuplicates.includes(num)) {
                    this.removeDuplicates.push(num);
                  }
                }
              });

              /* getting users friends using method, HTML */
              this.getUsersFriends = function (data) {
                this.usersFriends.forEach(function (value) {
                  html += "<p>" + data[value - 1].firstName + " " + data[value - 1].surname + "</p>";
                });
              };

              /* getting users friends of friends using method, HTML */
              this.getUsersFriendsOfFriends = function (data) {
                this.removeDuplicates.forEach(function (value) {
                  html += "<p>" + data[value - 1].firstName + " " + data[value - 1].surname + "</p>";
                });
              };

              /* getting suggested friends for user using method, HTML */
              this.getSuggestedFriends = function (json) {
                this.counter = 0;
                this.max = 0;
                this.nextToMax = 0;
                this.indexOfMax;
                for (var i = 0; i < this.friendsOfFriends.length; i++) {
                  this.counter = 0;
                  if (this.friendsOfFriends[i] !== this.usersID) {
                    for (var j = 0; j < this.friendsOfFriends.length; j++) {
                      if (this.friendsOfFriends[i] === this.friendsOfFriends[j] && this.friendsOfFriends[j] !== this.usersID) {
                        this.counter++;
                      }
                      if (this.max < this.counter) {
                        this.nextToMax = this.max;
                        this.max = this.counter;
                        this.indexOfMax = this.friendsOfFriends[i];
                      }
                    }
                  }
                }
                for (var i in data) {
                  if (this.indexOfMax === json[i].id) {
                    html += "<p>" + json[i].firstName + " " + json[i].surname + "</p>";
                  }
                }
                
              };
            };

            /* creating object User */
            var user = new User(input, json);

            /*====================================
              showing information on screen 
            =====================================*/
            html += "<h4 class='text-center'>You choose: </h4>";
            html += "<h4 class='text-center display-3'>" + user.firstname + " " + user.lastname + "</h4>";

            /* HTML for users friends */
            html += "<div class='col-md-4 mt-3 py-5'>";
            html += "<h3>" + user.firstname + "'s friends:</h3>";
            user.getUsersFriends(json);
            html += "</div>";

            /* HTML for users friends of friends */
            html += "<div class='col-md-4 mt-3 py-5'>";
            html += "<h3>" + user.firstname + "'s friends of friends:</h3>";
            user.getUsersFriendsOfFriends(json);
            html += "</div>";

            /* HTML for users suggested friends */
            html += "<div class='col-md-4 mt-3 py-5'>";
            html += "<h3>Suggested friend for " + user.firstname + ":</h3>";
            user.getSuggestedFriends(json);
            html += "</div>";
          } else {
            html += "<p class='text-danger'>No User with " + input + ". Type ID from 1 to " + json.length + "</p>";
          }

        } else {
          html += "<p class='text-danger'>Only numbers are allowed!!</p>";
        }

      } else {
        html += "<p class='text-danger'>Empty fields. Please, type Users ID!!</p>";
      }
      return div.innerHTML = html;
    });

};