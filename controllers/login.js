//Login and Sign Up

//Parse Keys 
Parse.initialize("9WJJ2iWhg4z1wmdJNL3pDvIgTMFBUPvJpj1Vs95M","3ceGKz096rbMxTfUSa99pqvSpi0gYxxhY5rbjdUu");

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
                var usrTyp = user.get('userType'); // Variable to store userType
                window.location.replace("index.html");
                console.log('Logged in as');
                $scope.fName= $scope.currentUser.get("firstName");
              //  console.log($scope.fName);

                
                  //Determining the user type    
                  if (usrTyp=="emp"){
                        window.location.replace("employee.html");
                  }
                  else if(usrTyp=="cust") {
                        window.location.replace("index.html");
                  }
                    
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
        user.set("userType","cust"); // Setting the default user type as "customer"
    
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
  var Comments = Parse.Object.extend("Comments");
  var commentsQuery = new Parse.Query(Comments);

  // Including Users
  commentsQuery.include("commentator");
  // Query Constraints 

  commentsQuery.descending("createdAt");
  commentsQuery.limit(10);

  $scope.commentsArray=[];

  commentsQuery.find({
    success: function(data){
      var j = data.length - 1;
      for(var i=0; i<data.length; i++){
        console.log(data.length);
        data[i].set("commentator",data[i].get("commentator").toJSON());
        $scope.commentsArray.push(data[j].toJSON());
        j--;
      }
        $scope.$apply();
    },
    error: function(){
      alert(error);
    }
  
  })




}
$scope.commentSubmit = function(){
  // Connecting to database
    var Comments = Parse.Object.extend("Comments");
    var newComment = new Comments();

//    $scope.newComment=null;
    newComment.set("commentator",$scope.currentUser);
    newComment.set("comment",$scope.newComment);

    newComment.save(null,{
      success : function(newComment){
        console.log("Comment saved");
        window.location.reload();
      },
      error: function(newComment,error){
        console.log(error);
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













