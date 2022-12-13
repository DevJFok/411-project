import requests
import json
import sys
import copy

def getUrl(ingredientsList):
  url = "https://www.amazon.com/afx/ingredients/landing"
  params = {"tag":"kbscart-20"}
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  }
  JsonList = []
  item = {
      "name": "item",
      "brand": "",
      "asinOverrides": [
        ""
      ],
      "componentIndex": 0,
      "quantityList": [
        {
          "unit": "COUNT",
          "amount": 1
        }
      ],
      "exclusiveOverride": False
  }
  for i in ingredientsList:
    item['asinOverrides'] = [i]
    JsonList.append(copy.deepcopy(item))

  ingredients = {"ingredients": JsonList}
  response = requests.request(
    'POST', 
    url, 
    data={"ingredients": json.dumps(ingredients, ensure_ascii=False)}, 
    headers=headers,
    params=params)
  
  for line in response.text.split("\n"):
    if line.find("data-encoded-recipe-url") >= 0:
        print("https://www.amazon.com/"+line[31:-1])
        sys.stdout.flush()
        break
      
def main():
    getUrl(json.loads(sys.argv[1]))

if __name__ == '__main__':
    main()
        
  
