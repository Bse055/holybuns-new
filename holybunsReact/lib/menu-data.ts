export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
  image?: string
}

export const menuItems: MenuItem[] = [
  // ---------------- PREMIUM BEEF BURGERS ----------------
  {
    id: "p1",
    name: "Saint Stack",
    description: "Smashed beef with cheese, mozzarella sticks, bologna slice & caramelised onions",
    price: 920,
    category: "Premium Beef Burgers",
    image: "/images/saintstack.jpg",
  },
  {
    id: "p2",
    name: "The Confession",
    description: "Smashed beef with Swiss cheese & caramelised mushrooms",
    price: 840,
    category: "Premium Beef Burgers",
    image: "/images/confession.jpg",
  },
  {
    id: "p3",
    name: "Holy Moly!",
    description: "Smashed beef with cheese, jalapeños & lettuce",
    price: 840,
    category: "Premium Beef Burgers",
    image: "/images/holymoly.jpg",

  },
  {
    id: "p4",
    name: "The Ascension",
    description: "Smashed beef with cheese, sundried tomatoes, rocket leaves & pickled red onions",
    price: 890,
    category: "Premium Beef Burgers",
    image: "/images/ascension.jpg",
  },

  // ---------------- CLASSIC BEEF BURGERS ----------------
  {
    id: "c1",
    name: "Divine & Mine",
    description: "Smashed beef with cheese & dill pickles",
    price: 740,
    category: "Classic Beef Burgers",
    image: "/images/divineandmine.jpg",
  },
  {
    id: "c2",
    name: "Blessed Bun",
    description: "Smashed beef with cheese, raw tomato, raw onion & lettuce",
    price: 780,
    category: "Classic Beef Burgers",
    image: "/images/blessedbun.jpg",
  },

  // ---------------- CHICKEN BURGERS ----------------
  {
    id: "ch1",
    name: "Chicky TAA!",
    description: "Spicy crispy chicken thigh with cheese, lettuce & dill pickles",
    price: 750,
    category: "Chicken Burgers",
  },
  {
    id: "ch2",
    name: "Chicky BAA!",
    description: "Spicy crispy chicken breast fillet with cheese, lettuce & dill pickles",
    price: 750,
    category: "Chicken Burgers",
    image: "/images/chickybaa.jpg",
  },
  {
    id: "ch3",
    name: "Chicky PAA!",
    description: "Classic crispy coated chicken patty with cheese, lettuce & comes with complimentary fries",
    price: 550,
    category: "Chicken Burgers",
  },

  // ---------------- LOADED FRIES ----------------
  {
    id: "f1",
    name: "Double Beef Bomb!",
    description: "Double smashed beef with special cheese sauce, onion relish, pickles & secret sauce",
    price: 1070,
    category: "Loaded Fries",
  },
  {
    id: "f2",
    name: "Double Chicken Blast",
    description: "Double chicken fillet with special cheese sauce, onion relish, pickles & secret sauce",
    price: 1040,
    category: "Loaded Fries",
  },

  // ---------------- ADD ONS ----------------
  {
    id: "a1",
    name: "2x Thick!",
    description: "Double thick patty add-on",
    price: 320,
    category: "Add-ons",
  },
  {
    id: "a2",
    name: "3x Thick!",
    description: "Triple thick patty add-on",
    price: 500,
    category: "Add-ons",
  },
  {
    id: "a3",
    name: "Mozzarella Sticks",
    description: "Crispy mozzarella cheese sticks",
    price: 330,
    category: "Add-ons",
  },

  // ---------------- DRINKS ----------------
  {
    id: "d1",
    name: "Soft Soda Drink Regular",
    description: "Available: Pepsi, 7Up, Fanta, Sprite, CocaCola",
    price: 90,
    category: "Drinks",
  },
  {
    id: "d2",
    name: "Soft Soda Drink Large",
    description: "Available: Pepsi, 7Up, Fanta, Sprite, CocaCola",
    price: 160,
    category: "Drinks",
  },
]

export interface MenuCategory {
  id: string
  title: string
  subtitle?: string
  items: MenuItem[]
}

export const MENU: MenuCategory[] = [
  {
    id: "premium-beef",
    title: "Premium Beef Burgers",
    subtitle: "Our signature premium smashed beef burgers with gourmet toppings",
    items: menuItems.filter((item) => item.category === "Premium Beef Burgers"),
  },
  {
    id: "classic-beef",
    title: "Classic Beef Burgers",
    subtitle: "Traditional favorites that never disappoint",
    items: menuItems.filter((item) => item.category === "Classic Beef Burgers"),
  },
  {
    id: "chicken",
    title: "Chicken Burgers",
    subtitle: "Crispy, juicy chicken burgers for poultry lovers",
    items: menuItems.filter((item) => item.category === "Chicken Burgers"),
  },
  {
    id: "loaded-fries",
    title: "Loaded Fries",
    subtitle: "Fries loaded with meat, cheese sauce & toppings",
    items: menuItems.filter((item) => item.category === "Loaded Fries"),
  },
  {
    id: "add-ons",
    title: "Add-ons",
    subtitle: "Extra patties and sides to level up your meal",
    items: menuItems.filter((item) => item.category === "Add-ons"),
  },
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Refreshing beverages to complete your meal",
    items: menuItems.filter((item) => item.category === "Drinks"),
  },
]

export function getFeaturedItems(): MenuItem[] {
  // Return a selection of featured items from different categories
  return [
    menuItems.find((item) => item.id === "p1")!, // Saint Stack
    menuItems.find((item) => item.id === "p3")!, // Holy Moly!
    menuItems.find((item) => item.id === "ch1")!, // Chicky TAA!
    menuItems.find((item) => item.id === "f1")!, // Double Beef Bomb!
    menuItems.find((item) => item.id === "p2")!, // The Confession
    menuItems.find((item) => item.id === "ch2")!, // Chicky BAA!
  ]
}
