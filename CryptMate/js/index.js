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
var subscriptionended = false;
var params = {};
var passwordform = $("#password");
var loginforms = $("#loginforms");
var newpasswordform = $("#newpassword");
var confirmpasswordform = $("#confirmpassword");
var loginusernameform = $("#loginusername");
var loginpasswordform = $("#loginpassword");
var logoutbutton = $(".logout");
var reloadbutton = $(".reload");
var generatedpasswordform = $("#generatedpassword");
var createnewpassworddiv = $("#createnewpassword");
var generatepassworddiv = $("#generatepassword");
var showpassworddiv = $("#showpassword");
var maindiv = $("#main");
var copybutton = $("#copy");
var setupdiv = $("#setup");
var selectdiv = $("#selectdiv");
var domaininput = $("#domain");
var errordiv = $("#error");
var linkdomains = $("#linkdomains");
var storeddomains = $("#storeddomains");
var generatebutton = $("#generate");
var createbutton = $("#create");

window.onload = function() {

    $("input[type=text]").val("");
    token = window.localStorage.getItem("token");

    if (token == null)
    {
        errordiv.hide();
        maindiv.hide();
        setupdiv.show();
        loginforms.show();
        selectdiv.hide();
    }
    else
    {
        errordiv.hide();
        maindiv.hide();
        setupdiv.show();
        selectdiv.show();
        loginforms.hide();
    }

    generatebutton.click( function()
    {
        $("input[type=text]").val("");
        errordiv.hide();
        setupdiv.hide();
        maindiv.show();
        generatepassworddiv.show();
        createnewpassworddiv.hide();
        showpassworddiv.hide();
    });

    copybutton.click( function() {
        var copytext = generatedpasswordform.val();
        window.plugins.clipboard.copy(copytext);
        alert("Copied!");
    });

    createbutton.click( function()
    {
        $("input[type=text]").val("");
        errordiv.hide();
        setupdiv.hide();
        maindiv.show();
        generatepassworddiv.hide();
        createnewpassworddiv.show();
        showpassworddiv.hide();
    });

    logoutbutton.click( function()
    {
        $("input[type=text]").val("");
        errordiv.hide();
        maindiv.hide();
        setupdiv.show();
        loginforms.show();
        selectdiv.hide();
        window.localStorage.removeItem("token");
    });

    reloadbutton.click( function()
    {
        window.location.reload();
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
                    switch (returndata.returntype) {
                        case "error":
                            error(returndata.error);
                            break;
                        case "token":
                            $("input[type=text]").val("");
                            window.localStorage.setItem("token", returndata.token);
                            errordiv.hide();
                            maindiv.hide();
                            setupdiv.show();
                            loginforms.hide();
                            selectdiv.show();
                            break;
                        case "subscriptionended":
                            error("Subscription ended, please log onto cryptmate.com and extend your subscription");
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
                                $("input[type=text]").val("");
                                errordiv.hide();
                                setupdiv.hide();
                                maindiv.show();
                                generatepassworddiv.hide();
                                createnewpassworddiv.hide();
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
                            $("input[type=text]").val("");
                            errordiv.hide();
                            setupdiv.hide();
                            maindiv.show();
                            generatepassworddiv.hide();
                            createnewpassworddiv.hide();
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

function error(message)
{
    $("input[type=text]").val("");
    maindiv.hide();
    setupdiv.hide();
    errordiv.show();
    errordiv.html(message);
}