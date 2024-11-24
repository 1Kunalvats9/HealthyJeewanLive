import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Coffee, Cookie, Soup, Cake, Salad, Trash2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import RecipeCard from './components/RecipeCard';
import Loader from './components/Loader';

const categories = [
  { name: "All", icon: ChefHat },
  { name: "Breakfast", icon: Coffee },
  { name: "Snacks", icon: Cookie },
  { name: "Lunch", icon: Soup },
  { name: "Desserts", icon: Cake },
  { name: "Healthy", icon: Salad }
];

const initialRecipes = [
  {
    id: 1,
    title: "बची हुई रोटी से बनेगी बच्चों की सबसे favourite snack मार्केट से लाना भूल जायेंगे",
    category: "Snacks",
    description: "Roti Pizza is a delicious and quick fusion dish that combines the comforting flavors of traditional pizza with the soft, warm texture of roti (Indian flatbread)",
    recipe: "Quick Roti Pizza Recipe\n        Ingredients-\n        - 2-3 roti\n        - 1/2 cup pizza sauce (or ketchup)\n        - 1/2 cup shredded mozzarella cheese\n        - Chopped veggies (bell peppers, onions, etc.)\n        - Cooked chicken or paneer (optional)\n        - Oregano, basil, chili flakes (optional)\n        - Salt to taste\n\n        Instructions:\n        1. Prepare the base:** Warm the roti slightly.\n        2. Assemble pizza:** Spread sauce on roti, top with cheese, veggies, and optional toppings.\n        3. Cook:\n                - Stovetop:** Heat on tawa, cover, and cook for 5-7 minutes until cheese melts.\n                - **Oven:** Bake at 375°F (190°C) for 8-10 minutes until cheese is bubbly and edges are crispy.\n        4. Garnish & serve:Add fresh herbs and slice. Enjoy!",
    imageUrl: "https://i.ytimg.com/vi/zr4Q8_kvOdU/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBLFmySYrqUYP0Q6kg_27guDtH3cw",
    youtubeLink: "https://youtu.be/zr4Q8_kvOdU?si=KBws3SyFw6_gG0iC",
    embedLink: "https://www.youtube.com/embed/zr4Q8_kvOdU?si=ajM5bVLQmr63EiUx"
  },
  {
    id: 2,
    title: "हलवाई जैसे खस्ता समोसे घर पे बनेंगे सिर्फ 2 आसान टिप्स के साथ।।market से नही लाने पड़ेंगे अब।",
    category: "Snacks",
    description: "Whether enjoyed as a tea-time treat or at a festive gathering, these homemade samosas are sure to be a crowd-pleaser!",
    recipe: "Khasta Crispy Samosa Recipe\n\n    Ingredients:\n    - Dough: 2 cups flour, 4 tbsp semolina, 1/4 cup oil, carom seeds, salt, water\n    - Filling: 2 boiled potatoes, peas, 1 onion, ginger-garlic paste, cumin, garam masala, chili powder, cilantro, lemon juice\n    - For Frying: Oil\n\n    Instructions:\n    1. Make Dough: Mix flour, semolina, carom seeds, salt, oil. Add water to form a stiff dough. Rest for 30 mins.\n    2. Prepare Filling: Sauté onion, spices, then add potatoes, peas, cilantro, and lemon juice. Cool.\n    3. Shape: Roll dough into cones, stuff with filling, and seal.\n    4. Fry: Deep fry on medium-low heat until golden and crispy.\n    5. Serve: Enjoy with chutney!\n\n    Done! Crispy, khasta samosas ready in no time!",
    imageUrl: "https://i.ytimg.com/vi/6HSug0693Ug/hqdefault.jpg?s…j0AgKJDeAE=&rs=AOn4CLCJDt7_Gf7LP8G9RD8B2J_ztLFuFQ",
    youtubeLink: "https://youtu.be/6HSug0693Ug?si=EGK0fYMxNgFGmFG7",
    embedLink: "https://www.youtube.com/embed/6HSug0693Ug?si=yP892uIq8J1spGyD"
  },
  {
    id: 3,
    title: "ये गुजराती नाश्ता सिर्फ 10 मिनट बनकर तैयार होगा। एकदम पौष्टिक भी है",
    category: "Breakfast",
    description: "Often served with chutney or yogurt, white dhokla is not only delicious but also a wholesome and nutritious treat that's easy to prepare at home!",
    recipe:"Homemade White Dhokla Recipe\n\n    Ingredients:\n    - Batter: 1 cup rice, 1/2 cup moong dal, 1/4 cup besan, 1/2 tsp ginger paste, 1/4 tsp turmeric, salt, water\n    - Tempering: 1 tbsp oil, 1 tsp mustard seeds, 1-2 green chilies, 10-12 curry leaves, 1/2 tsp sugar (optional), 2 tbsp water\n    - Garnish: Fresh coriander, grated coconut (optional)\n\n    Instructions:\n    1. Prepare Batter: Soak rice and moong dal for 4-6 hours, then grind into a smooth batter. Add besan, ginger, turmeric, and salt. Let rest for 30-45 minutes.\n    2. Steam Dhokla: Grease a tray, add Eno fruit salt to the batter, pour into the tray, and steam for 12-15 minutes until cooked through.\n    3. Tempering: Heat oil, add mustard seeds, curry leaves, chilies, sugar, and water. Cook for 1-2 minutes.\n    4. Garnish & Serve: Pour tempering over dhokla, garnish with coriander and coconut. Serve with chutney.\n\n    Enjoy your soft, fluffy white dhokla!",
    imageUrl: "https://i.ytimg.com/vi/hGtKXrf_kzM/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLAs8h5Wf3ZWaXI0er-9giyUO6_aFA",
    youtubeLink: "https://youtu.be/hGtKXrf_kzM?si=tiR6UMEi70gGPA6i",
    embedLink: "https://www.youtube.com/embed/hGtKXrf_kzM?si=dGoCZD3cZpcZpOQF"
  },
  {
    id: 4,
    title: "दही बड़े बनेंगे एकदम रूई जैसे सॉफ्ट और spongy.आसान ट्रिक से😱साथ complete रेसिपी के साथ",
    category: "Snacks",
    description: "Dahi Bhalla is a delightful combination of savory, sweet, and tangy flavors that is loved by all!",
    recipe:"Homemade Dahi Bhalla Recipe\n\nIngredients:\nFor Bhallas: 1 cup urad dal, 1/4 cup moong dal (optional), cumin seeds, asafoetida, salt, oil (for frying)\nFor Topping: 2 cups yogurt, 1 tbsp sugar, salt\nChutneys: Tamarind chutney (tamarind paste, jaggery, cumin powder, salt) & Green chutney (cilantro, green chilies, lemon juice, salt)\nGarnish: Roasted cumin powder, chaat masala, coriander, pomegranate seeds (optional)\n\nInstructions:\n1. Prepare Bhallas: Soak urad dal (and moong dal) for 4-6 hours. Grind into a thick batter, add cumin, asafoetida, and salt. Fry small balls until golden brown. Soak in warm water for 20-30 minutes.\n2. Prepare Yogurt: Whisk yogurt with sugar and salt.\n3. Make Chutneys: Mix tamarind, jaggery, and cumin for tamarind chutney. Blend cilantro, green chilies, and lemon juice for green chutney.\n4. Assemble: Place soaked bhallas on a plate, pour yogurt over them, drizzle chutneys, and garnish with spices and coriander.\n\nServe your Dahi Bhalla chilled or at room temperature for a refreshing, tangy snack!"
,
    imageUrl: "https://i.ytimg.com/vi/ggyz7VL6ieg/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLDw7U7otZmlrPRiD0LfGX9Hc_FG0Q",
    youtubeLink: "https://youtu.be/ggyz7VL6ieg?si=r6CSnnTpkXdr9LDT",
    embedLink: "https://www.youtube.com/embed/ggyz7VL6ieg?si=X-vwZyEoZM-X35tx"
  },
  {
    id: 5,
    title: "जब lunch या dinner में कुछ समझ न आए के क्या बनाया जाए।तो ये बूंदी की नई रेसिपी ट्राई करे",
    category: "Lunch",
    description: "Paalak Aur Boondi Ki Sabji is a flavorful and nutritious Indian dish made with fresh spinach (paalak) and crispy, fried boondi (small chickpea flour balls)",
    recipe:"Paalak Aur Boondi Ki Sabji Recipe\n\nIngredients:\n2 cups chopped spinach (paalak)\n1/2 cup boondi (soaked)\n1 onion, chopped\n1 tomato, chopped\n1 tsp ginger-garlic paste\n1/2 tsp cumin seeds, mustard seeds, asafoetida\n1/2 tsp turmeric, coriander powder, garam masala\nSalt to taste\n2 tbsp oil\n\nInstructions:\n1. Cook the Base: Heat oil, add cumin, mustard seeds, and asafoetida. Sauté onions, ginger-garlic paste, then tomatoes with spices until soft.\n2. Add Spinach: Stir in spinach, cook until wilted.\n3. Add Boondi: Mix in soaked boondi, cook for 2-3 minutes.\n4. Finish: Sprinkle garam masala, mix well, and cook for 1-2 more minutes.\n\nServe hot with roti, paratha, or rice. Enjoy!"
,
    imageUrl: "https://i.ytimg.com/vi/IcA-PcW7LTY/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBvgeAAoAPigIMCAAQARh_IFooEzAP&rs=AOn4CLDnBhChbZ5YADjQaJctf8LiSxeB0Q",
    youtubeLink: "https://youtu.be/IcA-PcW7LTY?si=ZMkOMohoC817-398",
    embedLink: "https://www.youtube.com/embed/IcA-PcW7LTY?si=XwdYArBA_kKSbZ2Y"
  },
  {
    id: 6,
    title: "ab ghar pe itne shiny silky aur tasty momos bana sakte hain to bahar ka momos kyun khana",
    category: "Snacks",
    description: "These delightful homemade momos are easy to make at home and are sure to impress with their taste and texture!",
    recipe:"Homemade Momos Recipe\n\nIngredients:\nDough: 2 cups flour, 1/4 tsp salt, 1 tbsp oil, water\nFilling: 1 1/2 cups chopped veggies (or minced meat), 1 tbsp oil, 1 tsp ginger-garlic paste, 2 tbsp soy sauce, salt, pepper, cilantro\n\nInstructions:\n1. Make the Dough: Mix flour, salt, and oil. Add water to knead into a smooth dough. Let rest for 20-30 mins.\n2. Prepare Filling: Sauté ginger-garlic paste, then cook veggies or meat with soy sauce, salt, and spices. Cool and add cilantro.\n3. Shape Momos: Roll dough into small circles, add filling, and seal into pleats or a half-moon shape.\n4. Steam: Steam momos for 10-12 minutes (vegetables) or 12-15 minutes (meat) until cooked.\n5. Serve: Enjoy with chutney!\n\nDelicious Homemade Momos ready to enjoy!"
,
    imageUrl: "https://i.ytimg.com/vi/SouVI5-LGPU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDNE7YXXLfwhadWuBxDjhAqdoyprQ",
    youtubeLink: "https://youtu.be/SouVI5-LGPU?si=0hJlBMskmYNwR4YT",
    embedLink: "https://www.youtube.com/embed/SouVI5-LGPU?si=1HF06GXY2MXYU2Pz"
  },
  {
    id: 7,
    title: "5 minutes में tasty पिज्जा घर पे ही बनाए। आज से ही बाहर से लाना बंद कर दोगे😱 ",
    category: "Snacks",
    description: "Whether you prefer a classic Margherita or a more adventurous combination, homemade pizza allows you to control the flavors and ingredients to suit your taste. ",
    recipe:"Homemade Pizza Recipe\n\nIngredients:\nDough: 2 1/4 tsp yeast, 1 1/2 cups warm water, 3 1/2 cups flour, 1 tsp sugar, 1 tsp salt, 2 tbsp olive oil\nTopping: 1/2 cup pizza sauce, 2 cups shredded mozzarella, desired toppings (veggies, meats), olive oil\n\nInstructions:\n1. Make Dough: Mix yeast, sugar, and warm water. Let sit for 5-10 mins. Combine with flour, salt, and olive oil. Knead until smooth, then let rise for 1-1.5 hours.\n2. Prepare Pizza: Preheat oven to 475°F (245°C). Roll out dough, add sauce, cheese, and toppings.\n3. Bake: Bake for 10-15 minutes, until crust is golden and cheese is bubbly.\n4. Serve: Slice and enjoy!\n\nCustomize with your favorite toppings for the perfect homemade pizza!"
,
    imageUrl: "https://i.ytimg.com/vi/JIW3R3EOHc4/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEgCEk3Pf839HMpJr2qyei_BfRXQ",
    youtubeLink: "https://youtu.be/JIW3R3EOHc4?si=l9G8RKl-7iS8CD_c",
    embedLink: "https://www.youtube.com/embed/JIW3R3EOHc4?si=ery8YFw6P2ZFgm-q"
  },
  {
    id: 8,
    title: "बाजरे की रोटी खाना पसंद नही तो एक बार ये बाजरे की कचौड़ी बनाए।बार बार मांग कर खायेंगे👌 ",
    category: "Snacks",
    description: "Homemade Bajra Kachori is a crispy, savory snack made with bajra (pearl millet) flour, stuffed with a flavorful spiced filling",
    recipe:"Bajra Ki Kachori Recipe\n\n### Ingredients:\n•⁠  ⁠*Dough:* 1 1/2 cups bajra flour, 1/4 cup wheat flour (optional), ajwain, salt, 1 tbsp oil/ghee, water\n•⁠  ⁠*Filling:* 1/2 cup mashed potatoes, 1/4 cup peas/boiled moong dal, cumin, fennel, coriander, garam masala, chili powder, salt, cilantro, lemon juice (optional)\n•⁠  ⁠*For Frying:* Oil\n\n### Instructions:\n1.⁠ ⁠*Make the Dough:* Mix bajra flour, wheat flour, ajwain, salt, and oil. Add water to form a firm dough. Rest for 15-20 minutes.\n2.⁠ ⁠*Prepare the Filling:* Sauté cumin, fennel, and asafoetida. Add mashed potatoes, peas/dal, and spices. Cook for a few minutes, then mix in cilantro and lemon juice.\n3.⁠ ⁠*Shape the Kachoris:* Roll dough into small balls, flatten into circles, place filling in the center, seal, and flatten slightly.\n4.⁠ ⁠*Fry:* Heat oil and fry kachoris until golden and crisp. Drain on paper towels.\n5.⁠ ⁠*Serve:* Enjoy with chutney or yogurt.\n\nDelicious *Bajra Ki Kachori* is ready!"
,
    imageUrl: "https://i.ytimg.com/vi/3sm83KWaopo/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLDNLcB9S1FLRIwy8H8J3gmxzvZfng",
    youtubeLink: "https://youtu.be/JIW3R3EOHc4?si=l9G8RKl-7iS8CD_c",
    embedLink: "https://youtu.be/3sm83KWaopo?si=gdV_GSb68Dtkpaqh"
  },
  {
    id: 9,
    title: "बेसन भाकरवाडी की easy recipe। महीनों तक स्टोर करें। healthy भी tasty भी। बिल्कुल नई रेसिपी।",
    category: "Snacks",
    description: "Homemade Besan Ki Bakhadvadi is a traditional, crispy snack made from chickpea flour (besan), seasoned with spices, and deep-fried until golden and crunchy",
    recipe:"Homemade Besan Ki Bakhadvadi Recipe\n\n### Ingredients:\n•⁠  ⁠*Dough:* 1 cup besan, 1/4 cup rice flour, 1 tbsp semolina, cumin seeds, ajwain, turmeric, chili powder, garam masala, salt, 1 tbsp oil, water\n•⁠  ⁠*Filling (optional):* 2 tbsp besan, cumin seeds, ajwain, coriander powder, chili powder, salt, oil\n•⁠  ⁠*For Frying:* Oil\n\n### Instructions:\n1.⁠ ⁠*Make Dough:* Mix besan, rice flour, semolina, and spices. Add oil, then gradually add water to form a stiff dough. Let rest for 15-20 mins.\n2.⁠ ⁠*Prepare Filling (optional):* Roast besan with cumin, ajwain, and spices until golden. Let cool.\n3.⁠ ⁠*Shape Bakhadvadi:* Roll dough into balls or logs. Stuff with filling (optional) and seal.\n4.⁠ ⁠*Fry:* Heat oil and deep fry bakhadvadi until golden and crispy.\n5.⁠ ⁠*Serve:* Enjoy hot with chutney or yogurt.\n\nCrunchy and savory *Besan Ki Bakhadvadi* is ready to enjoy!"
,
    imageUrl: "https://i.ytimg.com/vi/ew_4Yy9hPbo/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLDQtyxAhVYKPtpbROQIbRoEcomA1Q",
    youtubeLink: "https://youtu.be/ew_4Yy9hPbo?si=FQhY74vR43_VU7r_",
    embedLink: "https://www.youtube.com/embed/ew_4Yy9hPbo?si=oHbdAA88BPSUXYVO"
  },
];

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : initialRecipes;
  });

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRecipes = selectedCategory === "All" 
    ? recipes 
    : recipes.filter(recipe => recipe.category.toLowerCase() === selectedCategory.toLowerCase());

  const addRecipe = (newRecipe: any) => {
    const recipeWithId = { 
      ...newRecipe, 
      id: Date.now()
    };
    setRecipes(prevRecipes => [...prevRecipes, recipeWithId]);
  };

  const deleteRecipe = (id: number) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
    }
  };

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <Hero />

      <main id="recipes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Explore Our <span className="cursive text-primary-600">Recipes</span>
        </h2>

        <div className="flex overflow-x-auto space-x-4 mb-8 pb-4">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-primary-100'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="relative">
              <RecipeCard recipe={recipe} />
              {isAuthenticated && (
                <button
                  onClick={() => deleteRecipe(recipe.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                  aria-label="Delete recipe"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {showAdmin && (
        <AdminPortal 
          onClose={() => setShowAdmin(false)} 
          onAddRecipe={addRecipe}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
