$(document).ready(function()
                  {
                  $("#form").submit(function(e){
                                    e.preventDefault();
                                    var usrname = document.getElementById("usrname").value;
                                    var pword = document.getElementById("pword").value;
                                    //Ajax Call
                                
                                Parse.initialize("pUfqw1mmmT62rj9giwokcuIyuKHbksA549VFVyIW", "sGRz031DfoEJIVHcuPxQG0W69kk3We5EixrjYCDr");
                                // Parse login ajax call
                                    Parse.User.logIn(usrname, pword, {
                                                     success: function(user) {
                                                     Parse.initialize("pUfqw1mmmT62rj9giwokcuIyuKHbksA549VFVyIW", "sGRz031DfoEJIVHcuPxQG0W69kk3We5EixrjYCDr");
                                                     var cuser = Parse.User.current(); //To get current user's objectId
                                                     var id1 = cuser.id;
                                                     var url_usrId = 'https://api.parse.com/1/users/' + id1;
                                                     //Ajax call to check if current user is admin or customer
                                                     $.ajax({
                                                            url : url_usrId,
                                                            type : 'GET',
                                                            dataType: 'JSON',
                                                            headers : {
                                                            'X-Parse-Application-Id' : 'pUfqw1mmmT62rj9giwokcuIyuKHbksA549VFVyIW',
                                                            'X-Parse-REST-API-Key' : 'RBsVFRualfNxKg2uVgjS8UycEhcR5eCw3XDmmn2N'},
                                                            timeout:20000,
                                                            async:false,
                                                            beforeSend :function(data) {},
                                                            success:function(data){
                                                            console.log(data);
                                                            userType1 = data.userType;
                                                            },
                                                            error:function(data){
                                                            alert("Wrong Customer Information");
                                                            },
                                                            complete: function(){
                                                            //Once logged in check for usertype and redirect accordingly
                                                            if (userType1 == "customer"){
                                                            localStorage.setItem("cusObjId", id1);
                                                            window.location.replace("customer_lobby.html");
                                                            }
                                                            if (userType1 == "admin"){
                                                            window.location.replace("employee_lobby.html");
                                                            }
                                                            }
                                                            });
                                                    // alert("login successful");
                                                     },
                                                     error: function(user, error) {
                                                     // The login failed. Check error to see why.
                                                     }
                                                     });
                                    });
                  });
