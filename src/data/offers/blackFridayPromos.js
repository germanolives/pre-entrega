import promo01 from "../../assets/images/hero/blackFriday_1.webp";
import promo02 from "../../assets/images/hero/blackFriday_2.webp";
import promo03 from "../../assets/images/hero/blackFriday_3.webp";
import promo04 from "../../assets/images/hero/blackFriday_4.webp";

export const blackFridayPromos = [
  {
    id: 1,
    title: "Promo 01",
    description: "45% discount and 18 installments on selected products",
    appliesTo: [5, 6, 7],
    discount: 45,
    image: promo01,
  },
  {
    id: 2,
    title: "Promo 02",
    description: "35% discount and 18 installments on electronics excepto en monitores",
    appliesTo: [9, 10, 11, 12],
    discount: 35,
    image: promo02,
  },
  {
    id: 3,
    title: "Promo 03",
    description: "40% discount and 18 installments on full-HD monitors",
    appliesTo: [13, 14],
    discount: 40,
    image: promo03,
  },
  {
    id: 4,
    title: "Promo 04",
    description: "40% discount and 18 installments on women's and men's clothing",
    appliesTo: [1, 2, 3, 4, 15, 16, 17, 18, 19, 20],
    discount: 40,
    image: promo04,
  },
];