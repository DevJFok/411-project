const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req, res)
{
    res.writeHead(200, {'Content-Type' : 'text/html'})
    fs.readFile('index.html', function(error, data)
    {
        if(error)
        {
            res.writeHead(404)
            res.write('Error: U a dumbass, file not found')
        }
        else
        {
           res.write(data) 
        }
        res.end()
    })
})


server.listen(port, function(error)
{
    if(error)
    {
        console.log('Nah somethings wrong gang', error)
    }
    else
    {
        console.log('Server is listening on port ' + port)
    }
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").attr(profile.getImageUrl());
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have successfully signed out");
        $(".data").css("display", "none");
        $(".g-signin2").css("display", "block");
    });
  }