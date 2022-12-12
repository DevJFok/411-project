var ingredients_list =[];
var api_key = "be4ca83f4d75409787cc48362089f71a";
var recipe_id = "";

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

function getUrl(ingredients_list){
  document.getElementById('link').innerHTML = "Please wait";
  $.ajax({
    type:"POST",
    url: "http://localhost:8088/getUrl",
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
      setTimeout(() => console.log(), 3000);
      post(ingredients_list);
    }
    
})};



