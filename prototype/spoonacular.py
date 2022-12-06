import requests
from requests.structures import CaseInsensitiveDict

api_key = '553ccd987dc6462084893dfb3c835fb7'

def return_ingredients(resp):

    ingredients_list = []
    for i in range(0, len(resp.json()['extendedIngredients'])):
        if resp.json()['extendedIngredients'][i]['name'] != "None": 
            ingredients_list = ingredients_list + [resp.json()['extendedIngredients'][i]['name']]

    return (ingredients_list)
def search_recipe(url):

    # url = "https://api.spoonacular.com/recipes/search?apiKey=" + api_key + "&number=1&query="

    recipe_id = url[-6:]
    url = "https://api.spoonacular.com/recipes/" + recipe_id + "/information?apiKey=" + api_key + "&includeNutrition=true"

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"


    resp = requests.get(url, headers=headers)
    # print(resp.json())
    return (return_ingredients(resp))

def parse_url(url):
    id = url.split('/')[4].split('-')[-1]

    return id


# print(resp.status_code)

ingredients_list = parse_url("https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429")
print(ingredients_list)

