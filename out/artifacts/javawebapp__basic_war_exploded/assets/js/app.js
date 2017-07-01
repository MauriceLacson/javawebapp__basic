//DECLARE VARIABLES
    var $formData                 = $("form input");
    var $inputBtn                 = $("input[type=submit]");
    var $formMsg                  = $("#formMessage");
    var $formStyle2               = $("#formStyle2");
    var $localStorageNotSupported = "Local storage is not supported.";

//CHECK IF KEY "SUBMITTED" EXIST IN LOCAL STORAGE
    if(localStorage.getItem("submitted")){
        //HIDE IMAGE
            $("section img").hide('fast');

        //HIDE FORM , ADD TEXT AND DISPLAY MESSAGE
            $formStyle2.hide()
                .html('<p class="text-center"><b>You are registered.<br>Thank you!</b></p>')
                .fadeIn();

        //DISPLAY DATA
            $formMsg.html("Name: "   + localStorage.getItem("fullname") + "<br>" +
                          "Email: " + localStorage.getItem("email") + "<br>" +
                          "Birthday: "+ localStorage.getItem("Month") + " " +
                                        localStorage.getItem("Day") +  ", " +
                                        localStorage.getItem("Year"));

            //SHOW FORM MESSAGE
                $formMsg.show();
    }

//SUBMIT BUTTON CLICK
    $inputBtn.click(function (e) {
        //PREVENT DEFAULT ACTION or BEHAVIOR
            e.preventDefault();

        //GET INPUT DATA or VALUE
            var $fullname   = $("#fullname").val();
            var $email      = $("#email").val();
            var $birthMonth = $("#DOBMonth").val();
            var $dayOfBirth = $("#DOBDay").val();
            var $birthYear  = $("#DOBYear").val();
            var $regData    = $("#regForm").serialize();


        //Fire AJAX form submission
            $.ajax({
                method: 'post',
                url   : '/post',
                data  : $regData,
                dataType : "json",
                error: function () {
                     alert("Network error!");
                },
                success: function (response) {
                    //SHOW FORM MESSAGE
                        $formMsg.show();

                    //CHECK IF DATA ARE NOT EMPTY
                        if(response.fullname !== "" && response.email !== ""){
                                //CHECK IF LOCAL STORAGE IS SUPPORTED IN BROWSER
                                    if(typeof(localStorage) !== "undefined") {
                                        //HIDE IMAGE
                                            $("section img").hide('fast');

                                        //HIDE FORM , ADD TEXT AND DISPLAY MESSAGE
                                            $formStyle2.hide()
                                                .html('<p class="text-center"><b>You are registered.<br>Thank you!</b></p>')
                                                .fadeIn();

                                        //STORE DATA TO LOCAL STORAGE
                                            localStorage.setItem("submitted", true);
                                            localStorage.setItem("fullname", response.fullname);
                                            localStorage.setItem("email", response.email);
                                            localStorage.setItem("Day", response.DOBDay);
                                            localStorage.setItem("Month", response.DOBMonth);
                                            localStorage.setItem("Year", response.DOBYear);

                                        //DISPLAY DATA
                                        $formMsg.html("Name: "   + localStorage.getItem("fullname") + "<br>" +
                                            "Email: " + localStorage.getItem("email") + "<br>" +
                                            "Birthday: "+ localStorage.getItem("Month") + " " +
                                                          localStorage.getItem("Day") +  ", " +
                                                          localStorage.getItem("Year"));


                                    } else {
                                        //DISPLAY LOCAL STORAGE IS NOT EMPTY
                                            $formMsg.html($localStorageNotSupported);
                                    }
                        }
                        else {
                            //DISPLAY ERROR MESSAGE
                                $formMsg.html('<p style="color:red"><b>Name and email are required!</b></p>');
                        }

                }

            });
        //end of AJAX form submission
    });

