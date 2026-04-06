export interface Review {
  name: string;
  stars: number;
  text: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
}

export const allReviews: Review[] = [
  {
    name: "Sidhu Sid",
    stars: 5,
    text: "Today ordered chicken boneless pickle from nakshatra pickles best packing and excellent quality and superb taste is maintained",
    isLocalGuide: true,
    reviewCount: 17,
  },
  {
    name: "Vishali Daramapuri",
    stars: 5,
    text: "I recently had the pleasure of trying the pickle from them, and it was absolutely fantastic! The flavors were perfectly balanced, and the pickle had a delightful crunch. I was blown away by the attention to detail and the quality of the pickle.",
    reviewCount: 3,
  },
  {
    name: "Neha Musthafa",
    stars: 5,
    text: "As a non-veg lover, I have tasted so many other pickles in the market but when I have ordered pickles from Nakshatra's... THEY ARE DELICIOUS.. I was wondered with the packing they provide and quality, they are simply superb... Good job Nakshatra's...",
    reviewCount: 3,
  },
  {
    name: "Kumar Katabathuni",
    stars: 5,
    text: "Taste is good but spicy levels are medium only and gravy quantity is high for commercial and little bit more salty overall 7/10",
    isLocalGuide: true,
    reviewCount: 11,
  },
  {
    name: "77 chandu priya Kopani",
    stars: 5,
    text: "It was good, taste was better than expected. Quality was also fine. I will try to buy frequently..",
    reviewCount: 4,
  },
  {
    name: "shaik roshan",
    stars: 5,
    text: "They couriered it to Nellore, the taste was more than what I expected, on-time delivery, packaging was really good pickle was on point.",
  },
  {
    name: "Chilla Pramila",
    stars: 5,
    text: "It was sooo tasty and yummy, fantastic, I will try to buy frequently..",
    reviewCount: 4,
  },
  {
    name: "kotesh pk 111",
    stars: 5,
    text: "Pieces are nice, spicy when mixed in white rice, very tasty.. I liked it so much.",
    reviewCount: 4,
  },
  {
    name: "Alekhya Gumpula",
    stars: 5,
    text: "Mouth watering pickles, So Tasty and yummy... Have to taste it for once. Sure you gonna liked it",
    reviewCount: 6,
  },
  {
    name: "Mudhiraj SP",
    stars: 5,
    text: "Taste is really nice. And the quality is also good.. loved it",
    reviewCount: 3,
  },
  {
    name: "DIVYA PILLI",
    stars: 5,
    text: "Tastiest pickles I have never tasted still now. Simply superb and tasty. Recommended",
    reviewCount: 1,
  },
  {
    name: "sirisha ch",
    stars: 5,
    text: "Awesome taste, fresh and flavourful. The packaging was outstanding and the parcel arrived on time.",
    reviewCount: 4,
  },
  {
    name: "Himaja Rao",
    stars: 5,
    text: "Admire pickles because there is no one moment that makes a pickle a pickle. So tasty and delicious",
    reviewCount: 12,
  },
  {
    name: "I. Prashanthi Chinni",
    stars: 5,
    text: "Very tasty pickle, like my mother made in home thank you Nakshatra's chicken pickles",
    reviewCount: 1,
  },
  {
    name: "pavani sony",
    stars: 5,
    text: "Tastes really good. Must try... Genuine people.",
    reviewCount: 1,
  },
  {
    name: "kavitha Ganesh",
    stars: 5,
    text: "Super taste... Every one should try this recipe...",
    reviewCount: 1,
  },
  {
    name: "Monika Anil",
    stars: 5,
    text: "It's very tasty and awesome delivery was soon and good thanks to Nakshatra's.",
    reviewCount: 1,
  },
  {
    name: "vyjayanthi surepalli",
    stars: 5,
    text: "The chicken pickle bone and boneless was soo good... I'll suggest to everyone need to try chicken pickle boneless... thank you",
    reviewCount: 2,
  },
  {
    name: "Pradeep kumar Amarlapudi",
    stars: 5,
    text: "Worth every penny, reminds me of homely food. Thank Nakshatra.",
    isLocalGuide: true,
    reviewCount: 25,
  },
  {
    name: "Gowtham Lucky",
    stars: 5,
    text: "Taste of pickles was super awesome... Must try",
    reviewCount: 2,
  },
  {
    name: "ch mahesh",
    stars: 5,
    text: "Recently ordered fish pickle I felt home made taste",
    reviewCount: 6,
  },
  {
    name: "harikishan Ramagiri",
    stars: 5,
    text: "Very good taste and I really like it",
    reviewCount: 3,
  },
  {
    name: "Anil Suriya",
    stars: 5,
    text: "Very tasty and decent amount of pieces.",
    reviewCount: 2,
  },
  {
    name: "Narayan Raj",
    stars: 5,
    text: "I bought yesterday in Vijayawada taste is delicious thankyou",
    reviewCount: 7,
  },
  {
    name: "Akila Thayalan",
    stars: 5,
    text: "I liked the taste... it was toooo goood",
    isLocalGuide: true,
    reviewCount: 5,
  },
  {
    name: "Pranay Teja Kalangi",
    stars: 5,
    text: "Very Good taste and I really like it.",
    isLocalGuide: true,
    reviewCount: 8,
  },
  {
    name: "Sudhakar",
    stars: 5,
    text: "Super tasty food, it's feel like home made food.",
    reviewCount: 3,
  },
  {
    name: "Mercy Mercy",
    stars: 5,
    text: "Taste was so Good...",
    reviewCount: 3,
  },
  {
    name: "Raghavendra Bandaru",
    stars: 5,
    text: "Thank you serve and taste maintain",
    isLocalGuide: true,
    reviewCount: 16,
  },
];

export const featuredReviewIndices = [1, 2, 11, 18]; // Vishali, Neha, sirisha, Pradeep
export const featuredReviews = featuredReviewIndices.map((i) => allReviews[i]);
