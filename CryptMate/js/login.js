/**
 * Created by kv113 on 07/10/15.
 */

$("form").on('submit', function (e)
{
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
        crossDomain: true,
        cache: false,
        async: false,
        success: function (data, status) {
            alert(data);
            var returndata = JSON.parse(data);
            switch (returndata.returntype) {
                case "error":
                    window.localStorage.setItem("errormessage", returndata.error);
                    window.location = "error.html";
                    break;
                case "token":
                    window.localStorage.setItem("token", returndata.token);
                    window.location = "passwordprocessselect.html";
                    break;
                case "subscriptionended":
                    window.localStorage.setItem("errormessage", "Subscription ended, please log onto cryptmate.com and extend your subscription");
                    window.location = "error.html";
                    break;
            }
        },
        error: function () {
            window.localStorage.setItem("errormessage", "Internet connection failure, please try again when internet connection is active");
            window.location = "error.html";
        }
    });

    return false;
});