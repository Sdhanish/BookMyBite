// backend/data/recipes.js
const recipes = [
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil.",
    price: 199.99,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7
  },
  
  {
    name: "Sushi Platter",
    description: "Assorted sushi rolls with fresh salmon, tuna, and veggies.",
    price: 350.50,
    image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9
  },
  {
    name: "Pasta Alfredo",
    description: "Creamy Alfredo pasta with parmesan and garlic.",
    price: 220.0,
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6
  },
  {
    name: "Veggie Burger",
    description: "Plant-based patty with lettuce, tomato, and vegan mayo.",
    price: 180.99,
    image: "https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5
  },
  {
    name: "Grilled Salmon",
    description: "Salmon fillet grilled with lemon butter sauce.",
    price: 450.0,
    image: "https://images.pexels.com/photos/3296270/pexels-photo-3296270.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8
  },
  {
    name: "French Fries",
    description: "Golden crispy fries served with ketchup and mayo.",
    price: 90.0,
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4
  },
  {
    name: "Paneer Butter Masala",
    description: "Paneer cubes in rich tomato butter gravy.",
    price: 210.0,
    image: "https://images.pexels.com/photos/960984/pexels-photo-960984.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9
  },
  {
    name: "Fried Chicken",
    description: "Crispy fried chicken with special spices.",
    price: 250.0,
    image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7
  },
  {
    name: "Chocolate Ice Cream",
    description: "Rich chocolate ice cream with fudge topping.",
    price: 120.0,
    image: "https://images.pexels.com/photos/377982/pexels-photo-377982.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8
  },
  {
    name: "Club Sandwich",
    description: "Triple layered sandwich with chicken, cheese, and lettuce.",
    price: 150.0,
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6
  },
  {
    name: "Shawarma Roll",
    description: "Middle Eastern chicken wrap with garlic sauce.",
    price: 130.0,
    image: "https://images.pexels.com/photos/616410/pexels-photo-616410.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7
  },
  {
    name: "Butter Naan",
    description: "Soft Indian bread topped with butter.",
    price: 40.0,
    image: "https://images.pexels.com/photos/64208/naan-bread-food-indian-64208.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5
  },
  {
    name: "Biryani",
    description: "Aromatic rice with chicken, spices, and fried onions.",
    price: 280.0,
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9
  },
  {
    name: "Pancakes",
    description: "Fluffy pancakes topped with syrup and berries.",
    price: 110.0,
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8
  },
  {
    name: "Greek Salad",
    description: "Fresh cucumbers, tomatoes, olives, and feta cheese.",
    price: 140.0,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7
  },
  {
    name: "Dosa",
    description: "Crispy South Indian dosa served with chutney and sambar.",
    price: 100.0,
    image: "https://images.pexels.com/photos/1437587/pexels-photo-1437587.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6
  },
  {
    name: "Samosa",
    description: "Crispy fried pastry stuffed with spicy potatoes.",
    price: 30.0,
    image: "https://images.pexels.com/photos/1448667/pexels-photo-1448667.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4
  },
  {
    name: "Falafel Wrap",
    description: "Falafel balls wrapped with hummus and veggies.",
    price: 170.0,
    image: "https://images.pexels.com/photos/1907248/pexels-photo-1907248.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6
  },
  {
    name: "Cheesecake",
    description: "Creamy cheesecake with a graham cracker crust.",
    price: 160.0,
    image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9
  },
  {
    name: "Tandoori Chicken",
    description: "Chicken marinated in yogurt and spices, roasted in a tandoor.",
    price: 300.0,
    image: "https://images.pexels.com/photos/1028710/pexels-photo-1028710.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8
  },
  {
    name: "Spring Rolls",
    description: "Crispy rolls stuffed with veggies and noodles.",
    price: 90.0,
    image: "https://images.pexels.com/photos/739458/pexels-photo-739458.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5
  },
  {
    name: "Coffee",
    description: "Freshly brewed coffee served hot.",
    price: 60.0,
    image: "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6
  }
];

export default recipes;