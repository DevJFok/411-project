function getIngredients(){
    $.get("https://api.spoonacular.com/recipes/716429/information?apiKey=6b0d206bfbc741b988444b1317773317&includeNutrition=true", function(data, status){
        alert("Data: " + JSON.stringify(data));
    
    }
    );
}

function test() {
    alert("hi");
}
function test2() {
    alert("hi");
}
