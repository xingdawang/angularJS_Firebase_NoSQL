myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$location', '$firebaseObject', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $location, $firebaseObject, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser) {
    if(authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  var myObject = {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        //Angular service location, (re-direct)
        $location.path("/success");
      }).catch(function(error){
        $rootScope.message = error.message;
      });
    }, //login

    logout: function() {
      return auth.$unauth();
    }, //logout

    requireAuth: function() {
      return auth.$requireAuth();
    }, // requireAuth

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email:  user.email
        }); //user info

        //After registration, login then.
        myObject.login(user);
        
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    } // register
  };
  return myObject;
}]); //factory