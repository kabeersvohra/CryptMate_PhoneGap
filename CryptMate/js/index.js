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



window.onload = function() {

    token = window.localStorage.getItem("token");

    if (token == null)
    {
        window.location = "login.html";
    }
    else
    {
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
            async: false,
            success: function (data, status) {
                window.localStorage.setItem("keyeddomains", data);
            },
            error: function () {
                window.localStorage.setItem("errormessage", "Internet connection failure, please try again when internet connection is active");
                window.location = "error.html";
            }
        });
        window.location = "passwordprocessselect.html";
    }


};
