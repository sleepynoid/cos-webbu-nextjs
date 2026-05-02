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
    name: "Hutao Genshin Impact",
    series: "Genshin Impact",
    character: "Hutao",
    price: 130000,
    image: "/mock/hutao.jpg",
    type: "rental",
    isHijabFriendly: true,
    isCrossplayFriendly: true,
    size: ["S", "M", "L"],
  },
  {
    id: "2",
    name: "Raiden Shogun",
    series: "Genshin Impact",
    character: "Raiden Shogun",
    price: 150000,
    image: "/mock/raiden.jpg",
    type: "rental",
    isHijabFriendly: false,
    isCrossplayFriendly: true,
    size: ["M", "L", "XL"],
  },
];
