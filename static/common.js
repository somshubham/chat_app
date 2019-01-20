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
    conversation(message)
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
// function db_con(){
//   // conversation()
//   // writeUserData('1234','som','som@gmail.com','uiop/io.png')
// }


function writeUserData(userId, name, email, imageUrl) {
  var usersRef = firedb.ref("users/" + userId);
  usersRef.set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
/* global firedb, device_info*/
function conversation(msg){
  // 7008281981-9776135971
  console.log("comming to the conversation msg")
  usersRef = firedb.ref("conversation");
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


$(function(){
  // function test(){
    $('.google_auth').on("click",function(){
      console.log('test')
      // debugger
      googleSignin()
      // $.ajax({
      //   url : "/login",
      //   type: 'POST',
      //   dataType:"json",
      //   data: {user: "user"}
      // }).done(function(data){
      //   console.log(data)
      //   console.log("data")
      // })
      console.log("testing ,,,,,,,,,,,,,,,")
      // render_chat()
      // $.ajax({
      //   url: "login",
      //   type: 'POST',
      //   dataType:"json",
      //   // contentType: 'application/json;charset=UTF-8',
      //   data: {user: "user"}
      // }).done(function(){
      //  console.log(done)
      // }) 
    })  
  // }
  $('.test').on("click", function(){
    console.log("testing")
    $.ajax({
      url: "/login",
      type: 'POST',
      dataType:"json",
      // contentType: 'application/json;charset=UTF-8',
      data: {user: "firebase.auth()"}
    }).done(function(done){
      console.log(done)
    }) 
  })

})
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   .signInWithPopup(provider).then(function(result) {
  //  .signInWithRedirect(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
      console.log(user.uid)
      render_chat()
      // console.log(user.email)
      // console.log(user.displayName)
      // console.log(user.photoURL)
      // debugger
        // debugger
        // $.ajax({
        //   url: "/login",
        //   type: 'POST',
        //   dataType:"json",
        //   // contentType: 'application/json;charset=UTF-8',
        //   data: {user: user}
        // }).done(function(done){
        //   console.log(done)
        // }) 
        // render_chat(user);
        // var data = {
        //   uid: user.uid,
        //   email: user.email,
        //   displayName: user.displayName
        // }
        var d = ""+user.uid
        $.ajax({
          url : "/login",
          type: 'POST',
          dataType:"json",
          data: {
            user: user.uid,
            email: user.email,
            displayName: user.displayName,
            img: user.photoURL
          }
        }).done(function(data){
          console.log(data)
          console.log("data")
        })

   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}

// export firebase
function config_firebase(){
  var config = {
    apiKey: "AIzaSyCBGaNN2p36GNVznN5CJM3qTfYQz6U510A",
    authDomain: "chatio-a5bcd.firebaseapp.com",
    databaseURL: "https://chatio-a5bcd.firebaseio.com",
    projectId: "chatio-a5bcd",
    storageBucket: "chatio-a5bcd.appspot.com",
    messagingSenderId: "726615260743"
  };
  firebase.initializeApp(config);
  var firedb = firebase.database();
  console.log(firebase)
  console.log(firebase.auth())
  console.log(firebase.auth().getUid())
  return firedb
}

function render_chat(){

  console.log("firebase.auth()")
  console.log(firebase.auth())
  console.log("firebase.auth()")

  // $.ajax({
  //   url: "/login",
  //   type: 'POST',
  //   dataType:"json",
  //   // contentType: 'application/json;charset=UTF-8',
  //   data: {user: firebase.auth()}
  // }).done(function(done){
  //   console.log(done)

  // }) 
  firebase.auth().onAuthStateChanged(user => {
    console.log("user")
    console.log("user")
    console.log("user")
    console.log("user")
    console.log(user)
    if(user){
  console.log(firebase.auth()['currentUser']['displayName'])
      // window.location.href = "/chat";
    }
      // window.location.href = "/";
  });

}



function load_chat(){

}