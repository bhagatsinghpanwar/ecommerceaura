
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  features: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  arModel?: string; // URL to 3D model for AR view
  rating: number;
  reviewCount: number;
  stock: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    description: "A sleek, adjustable desk lamp with touch controls and wireless charging base.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2668&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2574&auto=format&fit=crop"
    ],
    category: "lighting",
    tags: ["desk lamp", "led", "modern", "office"],
    features: [
      "Touch-sensitive controls",
      "5 brightness levels",
      "Color temperature adjustment",
      "Wireless charging pad",
      "USB-C port"
    ],
    colors: [
      { name: "Matte Black", hex: "#2A2A2A" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "White", hex: "#FFFFFF" }
    ],
    arModel: "/models/lamp.glb",
    rating: 4.8,
    reviewCount: 124,
    stock: 42
  },
  {
    id: "2",
    name: "Modern Lounge Chair",
    description: "An ergonomic lounge chair with premium fabric upholstery and solid oak legs.",
    price: 549.99,
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2665&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592078615290-033ee584dd43?q=80&w=2160&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=2574&auto=format&fit=crop"
    ],
    category: "furniture",
    tags: ["chair", "lounge", "living room", "comfort"],
    features: [
      "Ergonomic design",
      "Premium fabric upholstery",
      "Solid oak legs",
      "High-density foam cushion",
      "360° swivel base"
    ],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Forest Green", hex: "#228B22" }
    ],
    arModel: "/models/chair.glb",
    rating: 4.7,
    reviewCount: 89,
    stock: 17
  },
  {
    id: "3",
    name: "Ceramic Pour-Over Coffee Set",
    description: "A handcrafted ceramic pour-over coffee maker with matching cups and stand.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595803928851-d222bc5d13a9?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=2574&auto=format&fit=crop"
    ],
    category: "kitchenware",
    tags: ["coffee", "ceramic", "pourover", "handcrafted"],
    features: [
      "Handcrafted ceramic design",
      "Includes stand, dripper, and two cups",
      "Stainless steel mesh filter included",
      "Heat-resistant handle",
      "Dishwasher safe"
    ],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Navy Blue", hex: "#000080" }
    ],
    arModel: "/models/coffee.glb",
    rating: 4.9,
    reviewCount: 56,
    stock: 23
  },
  {
    id: "4",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling over-ear headphones with 30-hour battery life.",
    price: 279.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2684&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2646&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["headphones", "wireless", "audio", "noise-cancelling"],
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Premium sound quality",
      "Comfortable over-ear design",
      "Fast charging (5 min = 3 hours playback)"
    ],
    colors: [
      { name: "Midnight Black", hex: "#191970" },
      { name: "Ivory White", hex: "#FFFFF0" },
      { name: "Rose Gold", hex: "#B76E79" }
    ],
    arModel: "/models/headphones.glb",
    rating: 4.6,
    reviewCount: 212,
    stock: 38
  },
  {
    id: "5",
    name: "Minimalist Wall Clock",
    description: "A silent, battery-operated wall clock with Scandinavian-inspired design.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586900178151-e2fb06f89fcc?q=80&w=2574&auto=format&fit=crop"
    ],
    category: "home decor",
    tags: ["clock", "wall", "minimal", "silent"],
    features: [
      "Silent quartz movement",
      "12\" diameter",
      "Easy wall mounting",
      "Requires 1 AA battery (included)",
      "Durable metal frame"
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Brass", hex: "#B5A642" }
    ],
    arModel: "/models/clock.glb",
    rating: 4.5,
    reviewCount: 78,
    stock: 51
  },
  {
    id: "6",
    name: "Smart Plant Pot",
    description: "Self-watering plant pot with soil sensors and app connectivity.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2572&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631699407088-0feda9a3c6c5?q=80&w=2668&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600411833114-10d5bf4d24c9?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "smart home",
    tags: ["planter", "self-watering", "smart", "IoT"],
    features: [
      "Self-watering system",
      "Soil moisture sensors",
      "Smartphone app connectivity",
      "Plant health monitoring",
      "2-week water reservoir"
    ],
    colors: [
      { name: "Stone Gray", hex: "#808080" },
      { name: "Sage Green", hex: "#9CAF88" },
      { name: "Terracotta", hex: "#E2725B" }
    ],
    arModel: "/models/plantpot.glb",
    rating: 4.4,
    reviewCount: 63,
    stock: 29
  }
];

export const categories: Category[] = [
  {
    id: "lighting",
    name: "Lighting",
    description: "Modern and elegant lighting solutions for every room",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2670&auto=format&fit=crop",
    productCount: 18
  },
  {
    id: "furniture",
    name: "Furniture",
    description: "Timeless and comfortable furniture pieces",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2574&auto=format&fit=crop",
    productCount: 24
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    description: "Functional and beautiful kitchen essentials",
    image: "https://images.unsplash.com/photo-1590794056223-7c9b09895537?q=80&w=2574&auto=format&fit=crop",
    productCount: 15
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Premium audio and smart electronics",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2670&auto=format&fit=crop",
    productCount: 22
  },
  {
    id: "home-decor",
    name: "Home Decor",
    description: "Elegant touches to personalize your space",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2574&auto=format&fit=crop",
    productCount: 31
  },
  {
    id: "smart-home",
    name: "Smart Home",
    description: "Connected devices for the modern home",
    image: "https://images.unsplash.com/photo-1558002038-1055e2dae1c9?q=80&w=2574&auto=format&fit=crop",
    productCount: 12
  }
];

// Shopping cart state
export type CartItem = {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

// User type
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};
