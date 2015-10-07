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
var errormessage = $("errormessage");
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

reloadbutton.click( function()
{
    window.location.reload();
    return false;
});