/**
 * Created by kv113 on 07/10/15.
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
var homebutton = $(".home");
var reloaddomainbutton = $(".reloaddomain");
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
var errormessage = $("#errormessage");
var linkdomains = $("#linkdomains");
var storeddomains = $("#storeddomains");
var generatebutton = $("#generate");
var createbutton = $("#create");

copybutton.click( function() {
    var copytext = generatedpasswordform.val();
    window.plugins.clipboard.copy(copytext);
    alert("Copied!");
});

logoutbutton.click( function()
{
    window.localStorage.removeItem("token");
    window.location = "login.html";
    return false;
});

homebutton.click( function()
{
    window.location = "passwordprocessselect.html";
    return false;
});

reloaddomainbutton.click( function()
{
    token = window.localStorage.getItem("token");
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
    window.location.reload();
    return false;
});