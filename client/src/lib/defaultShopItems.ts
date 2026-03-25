import type { ShopItem } from "@/contexts/AppContext";

const clothingSVGs = {
  redTshirt: `<rect x="30" y="45" width="40" height="50" fill="#FF0000" rx="2"/>
             <rect x="20" y="45" width="15" height="30" fill="#FF0000" rx="2" transform="rotate(-5 27 60)"/>
             <rect x="65" y="45" width="15" height="30" fill="#FF0000" rx="2" transform="rotate(5 72 60)"/>`,
  blueTshirt: `<rect x="30" y="45" width="40" height="50" fill="#0066FF" rx="2"/>
              <rect x="20" y="45" width="15" height="30" fill="#0066FF" rx="2" transform="rotate(-5 27 60)"/>
              <rect x="65" y="45" width="15" height="30" fill="#0066FF" rx="2" transform="rotate(5 72 60)"/>`,
  blackPants: `<rect x="35" y="95" width="15" height="50" fill="#222222" rx="2"/>
              <rect x="50" y="95" width="15" height="50" fill="#222222" rx="2"/>
              <rect x="35" y="95" width="30" height="10" fill="#333333"/>`,
  bluePants: `<rect x="35" y="95" width="15" height="50" fill="#1E40AF" rx="2"/>
             <rect x="50" y="95" width="15" height="50" fill="#1E40AF" rx="2"/>
             <rect x="35" y="95" width="30" height="10" fill="#2563EB"/>`,
  redCap: `<ellipse cx="50" cy="12" rx="22" ry="8" fill="#FF0000"/>
          <rect x="28" y="8" width="44" height="10" fill="#FF0000" rx="2"/>
          <rect x="28" y="14" width="50" height="4" fill="#CC0000" rx="1"/>`,
  blackCap: `<ellipse cx="50" cy="12" rx="22" ry="8" fill="#222222"/>
            <rect x="28" y="8" width="44" height="10" fill="#222222" rx="2"/>
            <rect x="28" y="14" width="50" height="4" fill="#111111" rx="1"/>`,
  redShoes: `<ellipse cx="40" cy="140" rx="12" ry="5" fill="#FF0000"/>
            <ellipse cx="62" cy="140" rx="12" ry="5" fill="#FF0000"/>`,
  whiteShoes: `<ellipse cx="40" cy="140" rx="12" ry="5" fill="#FFFFFF"/>
              <ellipse cx="62" cy="140" rx="12" ry="5" fill="#FFFFFF"/>`,
  glasses: `<circle cx="38" cy="28" r="8" fill="none" stroke="#FFD700" stroke-width="2"/>
           <circle cx="62" cy="28" r="8" fill="none" stroke="#FFD700" stroke-width="2"/>
           <line x1="46" y1="28" x2="54" y2="28" stroke="#FFD700" stroke-width="2"/>`,
};

const backgroundSVGs = {
  smallHouse: `<rect x="20" y="70" width="60" height="50" fill="#8B4513"/>
              <polygon points="50,40 20,70 80,70" fill="#CC4444"/>
              <rect x="40" y="90" width="20" height="30" fill="#4444CC"/>
              <rect x="25" y="75" width="12" height="12" fill="#87CEEB"/>
              <rect x="63" y="75" width="12" height="12" fill="#87CEEB"/>`,
  bigHouse: `<rect x="15" y="65" width="70" height="55" fill="#A0522D"/>
            <polygon points="50,35 15,65 85,65" fill="#8B0000"/>
            <rect x="38" y="85" width="24" height="35" fill="#2244AA"/>
            <rect x="18" y="70" width="14" height="14" fill="#87CEEB"/>
            <rect x="68" y="70" width="14" height="14" fill="#87CEEB"/>
            <rect x="18" y="90" width="14" height="14" fill="#87CEEB"/>
            <rect x="68" y="90" width="14" height="14" fill="#87CEEB"/>`,
  apartment: `<rect x="20" y="30" width="60" height="90" fill="#708090"/>
             <rect x="28" y="40" width="8" height="8" fill="#87CEEB"/>
             <rect x="40" y="40" width="8" height="8" fill="#87CEEB"/>
             <rect x="52" y="40" width="8" height="8" fill="#87CEEB"/>
             <rect x="64" y="40" width="8" height="8" fill="#87CEEB"/>
             <rect x="28" y="55" width="8" height="8" fill="#87CEEB"/>
             <rect x="40" y="55" width="8" height="8" fill="#87CEEB"/>
             <rect x="52" y="55" width="8" height="8" fill="#87CEEB"/>
             <rect x="64" y="55" width="8" height="8" fill="#87CEEB"/>
             <rect x="28" y="65" width="8" height="8" fill="#87CEEB"/>
             <rect x="40" y="65" width="8" height="8" fill="#87CEEB"/>
             <rect x="52" y="65" width="8" height="8" fill="#87CEEB"/>
             <rect x="28" y="80" width="8" height="8" fill="#87CEEB"/>
             <rect x="40" y="80" width="8" height="8" fill="#87CEEB"/>
             <rect x="52" y="80" width="8" height="8" fill="#87CEEB"/>`,
};

const vehicleSVGs = {
  sportsCar: `<ellipse cx="50" cy="110" rx="35" ry="12" fill="#FFD700"/>
             <rect x="30" y="105" width="40" height="8" fill="#FFD700" rx="2"/>
             <circle cx="35" cy="122" r="4" fill="#333333"/>
             <circle cx="65" cy="122" r="4" fill="#333333"/>
             <rect x="45" y="100" width="10" height="6" fill="#87CEEB"/>`,
  suv: `<rect x="25" y="105" width="50" height="15" fill="#228B22" rx="2"/>
       <rect x="30" y="100" width="40" height="6" fill="#228B22" rx="1"/>
       <circle cx="35" cy="120" r="5" fill="#333333"/>
       <circle cx="65" cy="120" r="5" fill="#333333"/>
       <rect x="50" y="102" width="8" height="5" fill="#87CEEB"/>`,
  motorcycle: `<circle cx="35" cy="120" r="6" fill="#333333"/>
              <circle cx="65" cy="120" r="6" fill="#333333"/>
              <rect x="40" y="105" width="20" height="12" fill="#DC143C" rx="2"/>
              <polygon points="50,100 55,95 50,98" fill="#DC143C"/>`,
};

export const defaultShopItems: ShopItem[] = [
  // --- CLOTHING (formerly Character) ---
  {
    id: "cloth-red-tshirt",
    name: "Red T-Shirt",
    emoji: "👕",
    price: 20,
    category: "clothing",
    slot: "body",
    folder: "default",
    purchased: false,
    assetPath: clothingSVGs.redTshirt,
  },
  {
    id: "cloth-blue-tshirt",
    name: "Blue T-Shirt",
    emoji: "👕",
    price: 20,
    category: "clothing",
    slot: "body",
    folder: "default",
    purchased: false,
    assetPath: clothingSVGs.blueTshirt,
  },
  {
    id: "cloth-cyber-suit",
    name: "Cyberpunk Suit",
    emoji: "🦾",
    price: 300,
    category: "clothing",
    slot: "body",
    folder: "default",
    purchased: false,
    // Will use emoji/default for now, but mark as premium
  },
  {
    id: "cloth-astronaut",
    name: "Astronaut Suit",
    emoji: "👨‍🚀",
    price: 500,
    category: "clothing",
    slot: "body",
    folder: "default",
    purchased: false,
  },
  {
    id: "cloth-royal",
    name: "Royal Robe",
    emoji: "🤴",
    price: 1000,
    category: "clothing",
    slot: "body",
    folder: "default",
    purchased: false,
  },
  {
    id: "cloth-stealth",
    name: "Stealth Outfit",
    emoji: "🥷",
    price: 450,
    category: "clothing",
    slot: "body",
    folder: "default",
    purchased: false,
  },
  {
    id: "cloth-black-pants",
    name: "Black Pants",
    emoji: "👖",
    price: 25,
    category: "clothing",
    slot: "hands",
    folder: "default",
    purchased: false,
    assetPath: clothingSVGs.blackPants,
  },
  {
    id: "cloth-red-cap",
    name: "Red Cap",
    emoji: "🧢",
    price: 15,
    category: "clothing",
    slot: "head",
    folder: "default",
    purchased: false,
    assetPath: clothingSVGs.redCap,
  },
  {
    id: "cloth-sunglasses",
    name: "Sunglasses",
    emoji: "😎",
    price: 12,
    category: "clothing",
    slot: "accessory",
    folder: "default",
    purchased: false,
    assetPath: clothingSVGs.glasses,
  },

  // --- HOUSES (Backgrounds) ---
  {
    id: "house-modern-villa",
    name: "Modern Villa",
    emoji: "🏘️",
    price: 2500,
    category: "background",
    slot: "background",
    folder: "default",
    purchased: false,
    assetPath: "/shop/modern_villa.png",
  },
  {
    id: "house-cyber-apartment",
    name: "Cyber Apartment",
    emoji: "🏢",
    price: 1800,
    category: "background",
    slot: "background",
    folder: "default",
    purchased: false,
    assetPath: "/shop/cyberpunk_apartment.png",
  },
  {
    id: "house-cozy-cottage",
    name: "Cozy Cottage",
    emoji: "🏡",
    price: 1200,
    category: "background",
    slot: "background",
    folder: "default",
    purchased: false,
    assetPath: "/shop/cozy_cottage.png",
  },
  {
    id: "house-castle",
    name: "Medieval Castle",
    emoji: "🏰",
    price: 5000,
    category: "background",
    slot: "background",
    folder: "default",
    purchased: false,
  },
  {
    id: "house-temple",
    name: "Japanese Temple",
    emoji: "⛩️",
    price: 3500,
    category: "background",
    slot: "background",
    folder: "default",
    purchased: false,
  },
  {
    id: "house-underwater",
    name: "Underwater Base",
    emoji: "🌊",
    price: 4000,
    category: "background",
    slot: "background",
    folder: "default",
    purchased: false,
  },

  // --- TRANSPORT (Vehicles) ---
  {
    id: "trans-supercar",
    name: "Supercar",
    emoji: "🏎️",
    price: 3000,
    category: "vehicle",
    slot: "vehicle",
    folder: "default",
    purchased: false,
    assetPath: "/shop/supercar.png",
  },
  {
    id: "trans-helicopter",
    name: "Helicopter",
    emoji: "🚁",
    price: 4500,
    category: "vehicle",
    slot: "vehicle",
    folder: "default",
    purchased: false,
    assetPath: "/shop/helicopter.png",
  },
  {
    id: "trans-jet",
    name: "Private Jet",
    emoji: "🛩️",
    price: 10000,
    category: "vehicle",
    slot: "vehicle",
    folder: "default",
    purchased: false,
  },
  {
    id: "trans-moto",
    name: "Motorcycle",
    emoji: "🏍️",
    price: 800,
    category: "vehicle",
    slot: "vehicle",
    folder: "default",
    purchased: false,
    assetPath: vehicleSVGs.motorcycle,
  },
  {
    id: "trans-ebike",
    name: "Electric Bike",
    emoji: "🚲",
    price: 400,
    category: "vehicle",
    slot: "vehicle",
    folder: "default",
    purchased: false,
  },

  // --- PETS ---
  {
    id: "pet-robot-dog",
    name: "Robot Dog",
    emoji: "🤖",
    price: 1500,
    category: "pets",
    slot: "pet",
    folder: "default",
    purchased: false,
  },
  {
    id: "pet-galaxy-cat",
    name: "Galaxy Cat",
    emoji: "🌌",
    price: 2000,
    category: "pets",
    slot: "pet",
    folder: "default",
    purchased: false,
  },
  {
    id: "pet-phoenix",
    name: "Phoenix",
    emoji: "🔥",
    price: 5000,
    category: "pets",
    slot: "pet",
    folder: "default",
    purchased: false,
  },
  {
    id: "pet-dragon",
    name: "Dragon",
    emoji: "🐲",
    price: 8000,
    category: "pets",
    slot: "pet",
    folder: "default",
    purchased: false,
  },
  {
    id: "pet-unicorn",
    name: "Unicorn",
    emoji: "🦄",
    price: 6000,
    category: "pets",
    slot: "pet",
    folder: "default",
    purchased: false,
  },
  {
    id: "pet-slime",
    name: "Golden Slime",
    emoji: "💧",
    price: 1000,
    category: "pets",
    slot: "pet",
    folder: "default",
    purchased: false,
  },
];
