/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var token = "";
var domain = "";
var newpassword = "";
var subscriptionended = false;
var params = {};
var passwordform = $("#password");
var passwordforms = $("#passwordforms");
var loginforms = $("#loginforms");
var newpasswordform = $("#newpassword");
var confirmpasswordform = $("#confirmpassword");
var loginusernameform = $("#loginusername");
var loginpasswordform = $("#loginpassword");
var logoutbutton = $(".logout");
var generatedpasswordform = $("#generatedpassword");
var createnewpassworddiv = $("#createnewpassword");
var generatepassworddiv = $("#generatepassword");
var showpassworddiv = $("#showpassword");
var maindiv = $("#main");
var domaininput = $("#domain");
var errordiv = $("#error");
var formsdiv = $("#forms");
var linkdomains = $("#linkdomains");
var storeddomains = $("#storeddomains");
var generatebutton = $("#generate");
var createbutton = $("#create");


document.getElementById("copy").addEventListener("click", function ()
{
    var copyDiv = generatedpasswordform.val();
    copyDiv.focus();
    document.execCommand("SelectAll");
    document.execCommand("Copy", false, null);
});

window.onload = function() {

    var temptoken = window.localStorage.getItem("token");

    if (temptoken != null && token == null)
    {
        token = temptoken;
    }
    else if (temptoken == null && token != null)
    {
        token = null;
    }

    if (token == null)
    {
        loginforms.show();
        passwordforms.hide()
    }
    else
    {
        passwordforms.hide();
        loginforms.show();
    }

    generatebutton.click( function() {
        maindiv.show();
        generatepassworddiv.show();
    });

    createbutton.click( function() {
        maindiv.show();
        createnewpassworddiv.show();
    });

    logoutbutton.click( function() {
        window.localStorage.removeItem("token");
    });

    params =
    {
        token: token,
        keyeddomains: true
    };

    $.ajax({
        type: "POST",
        url: "https://www.cryptmate.com/processing/rest.php",
        data: params,
        crossDomain: true,
        cache: false,
        success: function (data, status) {
            var keyeddomains = JSON.parse(data);

            for(var i = 0; i < keyeddomains.length; i++)
            {
                var opt1 = document.createElement('option');
                opt1.innerHTML = keyeddomains[i];
                opt1.value = keyeddomains[i];
                document.getElementById('storeddomains').appendChild(opt1);
                var opt2 = document.createElement('option');
                opt2.innerHTML = keyeddomains[i];
                opt2.value = keyeddomains[i];
                document.getElementById('linkdomains').appendChild(opt2);
            }
        },
        error: function () {
            error("Internet connection failure, please try again when internet connection is active")
        }
    });

};

$("form").on('submit', function (e) {

    switch (e.target.id) {
        case "login":
            var loginusername = loginusernameform.val();
            var loginpassword = loginpasswordform.val();

            params =
            {
                username: loginusername,
                password: loginpassword
            };

            $.ajax({
                type: "POST",
                url: "https://www.cryptmate.com/processing/rest.php",
                data: params,
                success: function (data, status) {
                    var returndata = JSON.parse(data);
                    alert(data);
                    switch (returndata.returntype) {
                        case "error":
                            error(returndata.error);
                            break;
                        case "token":
                            window.localStorage.setItem("token", returndata.token);
                            passwordforms.show();
                            loginforms.hide();
                            break;
                    }
                },
                error: function () {
                    error("Internet connection failure, please try again when internet connection is active")
                }
            });

            break;
        case "createnewpassword":
            var newpassword = newpasswordform.val();
            var confirmpassword = confirmpasswordform.val();
            domain = domaininput.val();
            var linkeddomain = linkdomains.find("option:selected").text();

            if (newpassword == confirmpassword) {
                params =
                {
                    token: token,
                    password: newpassword,
                    domain: domain,
                    newpassword: 1,
                    linkeddomain: linkeddomain
                };

                $.ajax({
                    type: "POST",
                    url: "https://www.cryptmate.com/processing/rest.php",
                    data: params,
                    success: function (data, status) {
                        var returndata = JSON.parse(data);
                        switch (returndata.returntype) {
                            case "error":
                                error(returndata.error);
                                break;
                            case "password":
                                clearAll();
                                createnewpassworddiv.hide();
                                generatepassworddiv.hide();
                                showpassworddiv.show();
                                generatedpasswordform.val(returndata.hash);
                                break;
                        }
                    },
                    error: function () {
                        error("Internet connection failure, please try again when internet connection is active")
                    }
                });
            }
            else {
                error("Passwords do not match");
            }
            break;
        case "generatepassword":
            var password = passwordform.val();
            domain = storeddomains.find("option:selected").text();
            params =
            {
                token: token,
                password: password,
                domain: domain,
                newpassword: 0
            };

            $.ajax({
                type: "POST",
                url: "https://www.cryptmate.com/processing/rest.php",
                data: params,
                success: function (data, status) {
                    var returndata = JSON.parse(data);
                    switch (returndata.returntype) {
                        case "error":
                            error(returndata.error);
                            break;
                        case "password":
                            clearAll();
                            createnewpassworddiv.hide();
                            generatepassworddiv.hide();
                            showpassworddiv.show();
                            generatedpasswordform.val(returndata.hash);
                            break;
                    }
                },
                error: function () {
                    error("Internet connection failure, please try again when internet connection is active")
                }
            });

            break;
    }
    return false;
});

function clearAll()
{
    passwordform.value = "";
    newpasswordform.value = "";
    confirmpasswordform.value = "";
    generatedpasswordform.value = "";
    loginusernameform.value = "";
    loginpasswordform.value = "";
}

function error(message)
{
    clearAll();
    errordiv.html(message);
    formsdiv.hide();
    loginforms.hide();
    passwordforms.hide();
    maindiv.show();
    errordiv.show();
}