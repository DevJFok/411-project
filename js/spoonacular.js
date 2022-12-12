var ingredients_list =[];
var api_key = "be4ca83f4d75409787cc48362089f71a";
var recipe_id = "";
const host = "http://localhost:3000/";

function search_recipe(){
    var input = document.getElementById("recipe_url").value;
    input = input.split('/')[4];
    input = input.split('-');
    input_length = input.length - 1;
    input = input[input_length];
    recipe_id = input;
}

function getIngredients(){
    search_recipe();
    $.get("https://api.spoonacular.com/recipes/" + recipe_id + "/information?apiKey=" + api_key+ "&includeNutrition=true", 
        function(data){
            reset_ingredients_list();
            document.getElementById('output_title').innerHTML = "Title: " + data['title'];
            for (let i = 0; i < data['extendedIngredients'].length; i++){
                if (data['extendedIngredients'][i]['name'] != ""){
                    ingredients_list.push(data['extendedIngredients'][i]['name'].replace(/\"/g, ""));
                    document.getElementById('output_ingredients').innerHTML = "Ingredients: " + ingredients_list;
                    
                }
            }
            getUrl(ingredients_list);
            
    });
}

function reset_ingredients_list(){
    ingredients_list = [];
}

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

function getUrl(ingredients_list){
  document.getElementById('link').innerHTML = "Please wait...";
  console.log(ingredients_list);
  $.ajax({
    type:"POST",
    url: host+"getUrl",
    contentType: "application/json",        
    data: JSON.stringify({ "items": ingredients_list}), 
    timeout: 40000, 
    success: function(result) {
      if (result.statusCode == 500){
        console.log('Request failed. Retrying...');
      } else {
        document.getElementById('link').innerHTML = "<a href=" + result + " target='_blank'> <button>Click to Add to Your Cart</button></a>";
        console.log(result);
      }
    },
    error: function() {
      console.log('Request failed. Retrying...');
      //alert('error');
      setTimeout(() => console.log(), 5000);
      getUrl(ingredients_list);
    }
    
})};



