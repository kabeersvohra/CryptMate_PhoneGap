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

var url = "";
var domain = "";
var token = "";
var newpassword = "";
var subscriptionended = false;
var params = {};
var passwordform = $("#password");
var newpasswordform = $("#newpassword");
var confirmpasswordform = $("#confirmpassword");
var generatedpasswordform = $("#generatedpassword");
var createnewpassworddiv = $("#createnewpassword");
var generatepassworddiv = $("#generatepassword");
var showpassworddiv = $("#showpassword");
var maindiv = $("#main");

var errordiv = $("#error");
var formsdiv = $("#forms");
var linkdomains = $("#linkdomains");


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $("form").on('submit', function (e) {
            switch (e.target.id) {
                case "selectform":
                    alert(e.target.value);
                    break;
                case "createnewpassword":
                    var newpassword = newpasswordform.val();
                    var confirmpassword = confirmpasswordform.val();
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
    }
};

document.getElementById("copy").addEventListener("click", function ()
{
    var copyDiv = generatedpasswordform.val();
    copyDiv.focus();
    document.execCommand("SelectAll");
    document.execCommand("Copy", false, null);
});

function generate() {
    alert("reached");
    maindiv.show();
    generatepassworddiv.show();
}

function create() {
    alert("reached");
    maindiv.show();
    generatepassworddiv.show();
}