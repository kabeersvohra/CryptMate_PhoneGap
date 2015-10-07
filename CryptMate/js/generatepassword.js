/**
 * Created by kv113 on 07/10/15.
 */

var keyeddomains = JSON.parse(window.localStorage.getItem("keyeddomains"));

for(var i = 0; i < keyeddomains.length; i++)
{
    var opt = document.createElement('option');
    opt.innerHTML = keyeddomains[i];
    opt.value = keyeddomains[i];
    document.getElementById('storeddomains').appendChild(opt);
}

$("form").on('submit', function (e)
{
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
        crossDomain: true,
        cache: false,
        async: false,
        success: function (data, status) {
            var returndata = JSON.parse(data);
            switch (returndata.returntype) {
                case "error":
                    window.localStorage.setItem("errormessage", returndata.error);
                    window.location = "error.html";
                    return false;
                    break;
                case "password":
                    window.localStorage.setItem("generatedpassword", returndata.hash);
                    window.location = "showpassword.html";
                    break;
            }
        },
        error: function () {
            window.localStorage.setItem("errormessage", "Internet connection failure, please try again when internet connection is active");
            window.location = "error.html";
            return false;
        }
    });

    return false;

});

