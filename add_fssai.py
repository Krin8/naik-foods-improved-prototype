import re

with open("data/products.js", "r") as f:
    content = f.read()

def replacer(match):
    return """
    fssai: "11521036000123",
    ingredients: "Traditional regional ingredients, spices, edible oil (where applicable)",
    nutrition: "Energy: 450 kcal, Protein: 10g, Carbohydrates: 60g, Fat: 15g (Approximate per 100g)",
    allergens: "May contain traces of peanuts, sesame, or gluten",
    shelfLife: "6 Months from date of manufacture",
    isVegetarian: true,""" + match.group(0)

new_content = re.sub(r'(\s+inStock:\s+)', replacer, content)

with open("data/products.js", "w") as f:
    f.write(new_content)

