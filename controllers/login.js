//Login and Sign Up

//Parse Keys 
Parse.initialize("IOoSACRRCTKmrzo0Lxrq3tLJuGV1Zf4s5zmifOI9","zqE3SrtBitsrjhkcuMgVtyjOWi7bhrZ7gQHfbg5h");

//App initialization 
angular.module('AuthApp',['ui.bootstrap'])
.run(['$rootScope',function($scope) {

    $scope.scenario='Log in'; //intial ng-show scenario
   
   // To save current user for later login
   $scope.currentUser=Parse.User.current();

   // Login Scenario 
    $scope.logIn=function(form){
        Parse.User.logIn(form.email,
            form.password,{
                success: function(user){
                $scope.currentUser=user;          
                //var usrTyp = user.get('userType'); // Variable to store userType
                window.location.replace("index.html");
                console.log('Logged in as');
                

                    
                   $scope.$apply(); 
                },
               error: function(user, error) {
                 alert("Unable to log in: " + error.code + " " + error.message);
                }



            });
    }
    // Sign Up Scenario 
    $scope.signUp = function(form) {
        var user = new Parse.User();
        user.set("username", form.email); // Setting the username as the email provided 
        user.set("firstName",form.firstName);
        user.set("lastName",form.lastName);
        user.set("email", form.email);
        user.set("userType","customer"); // Setting the default user type as "customer"
    
        //Confirming password
        if(form.password==form.cpassword){

        user.set("password",form.password);
        }
        else{
            alert("Password and Confirm Password dont match.");
        }
        user.signUp(null, {
          success: function(user) {
           
            $scope.currentUser = user;
            window.location.replace("index.html");
            $scope.$apply();
          },
         error: function(user, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });    
  };

  // LoadingCustomer orders
  $scope.loadOrders=function(form){
     $scope.currentUser=user; 
     var childQuery = new Parse.Query("Orders");
     var pointers = _.map(childIdArray, function(item_id){
     var pointer =new Parse.Object("customerInfo");
      pointer.id=item_id;
      console.log(pointer);
      return pointer;

     });
     childQuery.containedIn('customerInfo',pointers);
     childQuery.find({
      success: childrenSuccessCallback,
      error: failureCallback
     })
  }


$scope.TabsDemoCtrl=function($scope,$window){
  $scope.tabs = [
    
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
}

$scope.CommentCtrl=function($scope){

  

  // Connecting to database
  var AllComments = Parse.Object.extend("Comments");
  var commentsQuery = new Parse.Query(AllComments);

  // Including Users
  commentsQuery.include("commentator");
  // Query Constraints 

  commentsQuery.ascending("createdAt");

  $scope.commentsArray=[];

  commentsQuery.find({
    success: function(data){
      for(var i=0; i<data.length; i++){
        data[i].set("commentator",data[i].get("commentator").toJSON());
        $scope.commentsArray.push(data[i].toJSON());
      }
        $scope.$apply();
    },
    error: function(){
      alert(error);
    }
  
  })



}

  //Logout 
  $scope.logOut=function(form){
    Parse.User.logOut();
    $scope.chkUser= false;
    window.location.replace("index.html");
    console.log($scope.chkUser);

     }

}]);













