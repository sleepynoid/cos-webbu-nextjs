export interface Costume {
  id: string;
  name: string;
  series: string;
  character: string;
  price: number;
  image: string;
  type: "rental" | "sale";
  isHijabFriendly: boolean;
  isCrossplayFriendly: boolean;
  size: string[];
}

export const MOCK_COSTUMES: Costume[] = [
  {
    id: "1",
    name: "Qingque Honkai Star Rail - Kostum",
    series: "Honkai Star Rail",
    character: "Qingque",
    price: 150000,
    image: "/products_1773161117815-d748b057-migrated.webp",
    type: "rental",
    isHijabFriendly: true,
    isCrossplayFriendly: true,
    size: ["S", "M", "L"],
  },
  {
    id: "2",
    name: "Hutao Genshin Impact - Kostum & Wig",
    series: "Genshin Impact",
    character: "Hutao",
    price: 130000,
    image: "/products_1773161232921-213c9131-migrated.webp",
    type: "rental",
    isHijabFriendly: false,
    isCrossplayFriendly: true,
    size: ["M", "L", "XL"],
  },
  {
    id: "3",
    name: "Nilou Genshin Impact - Kostum",
    series: "Genshin Impact",
    character: "Nilou",
    price: 180000,
    image: "/products_product-image_1774696640658-NGRK58JW.webp",
    type: "rental",
    isHijabFriendly: false,
    isCrossplayFriendly: true,
    size: ["S", "M"],
  },
  {
    id: "4",
    name: "Katheryne Genshin Impact - Kostum",
    series: "Genshin Impact",
    character: "Katheryne",
    price: 120000,
    image: "/products_product-image_1774704231110-ARixxDMf.webp",
    type: "rental",
    isHijabFriendly: true,
    isCrossplayFriendly: true,
    size: ["M", "L"],
  },
  {
    id: "5",
    name: "Jabami Yumeko Kakegurui",
    series: "Kakegurui",
    character: "Jabami Yumeko",
    price: 90000,
    image: "/products_product-image_1775031005269-rrLx86x7.webp",
    type: "rental",
    isHijabFriendly: false,
    isCrossplayFriendly: false,
    size: ["L"],
  },
];
