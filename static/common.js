function chat_main(){

  $(".messages").animate({ scrollTop: $(document).height() }, "fast");

  $("#profile-img").click(function() {
    $("#status-options").toggleClass("active");
  });

  $(".expand-button").click(function() {
    $("#profile").toggleClass("expanded");
    $("#contacts").toggleClass("expanded");
  });

  $("#status-options ul li").click(function() {
    $("#profile-img").removeClass();
    $("#status-online").removeClass("active");
    $("#status-away").removeClass("active");
    $("#status-busy").removeClass("active");
    $("#status-offline").removeClass("active");
    $(this).addClass("active");
    
    if($("#status-online").hasClass("active")) {
      $("#profile-img").addClass("online");
    } else if ($("#status-away").hasClass("active")) {
      $("#profile-img").addClass("away");
    } else if ($("#status-busy").hasClass("active")) {
      $("#profile-img").addClass("busy");
    } else if ($("#status-offline").hasClass("active")) {
      $("#profile-img").addClass("offline");
    } else {
      $("#profile-img").removeClass();
    };
    
    $("#status-options").removeClass("active");
  });

  function newMessage() {
    message = $(".message-input input").val();
    console.log(message)
    if($.trim(message) == '') {
      return false;
    }
    $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
    $('.message-input input').val(null);
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
  };

  $('.submit').click(function() {
    newMessage();
    debugger
  });

  $(window).on('keydown', function(e) {
    if (e.which == 13) {
      newMessage();
      return false;
    }
  });
}
/* global firedb, device_info*/
function db_con(){
  conversation(firedb)
  // writeUserData('1234','som','som@gmail.com','uiop/io.png')
}


function writeUserData(userId, name, email, imageUrl) {
  var usersRef = firedb.ref("users/" + userId);
  usersRef.set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
    
function conversation(database){
  // 7008281981-9776135971
  usersRef = database.ref("conversation");
  // conversation
  sender = "7008281981"
  receiver = "9776135971" 
  target = "".concat(sender+"-"+receiver)
  // CHECK THE USERS EXIST OR NOT ........... WHILE THE CONVERSATION.....
  // usersRef.once('value', function(snapshot) {
  //   if (snapshot.hasChild(target)) {
  //     // alert('exists');
  //   }
  //   console.log(snapshot)
  // });
  var currentDate = new Date();
  var timeStamp = moment(currentDate).format('MM/DD/YYYY h:mm a');
  console.log(timeStamp); // 08/20/2014 3:30 pm
  var mac_id = $('#mac_id').attr('value')
  msg = "hello som."
  usersRef.child(target).push({
    'sender': sender,
    'receiver': receiver,
    'msg': msg,
    'device_info': device_info,
    'time': timeStamp,
    'mac_id': mac_id
  })
    
}

function login(){
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}