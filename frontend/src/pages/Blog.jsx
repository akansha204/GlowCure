import React from "react";

const blogData = [
  {
    id: 1,
    title: "Lemon: A Natural Skin Brightener",
    image: "./assets/lemon.jpg",
    description:
      "Lemon is packed with Vitamin C and antioxidants that help brighten your skin and reduce dark spots. It also has antibacterial properties, making it great for treating acne. However, always dilute lemon juice before applying it to avoid irritation.",
    benefits: [
      "Lightens dark spots and pigmentation",
      "Fights acne-causing bacteria",
      "Acts as a natural exfoliator",
      "Boosts collagen production for youthful skin",
    ],
  },
  {
    id: 2,
    title: "Aloe Vera: Nature's Soothing Gel",
    image: "./assets/aloevera.jpg",
    description:
      "Aloe Vera is renowned for its soothing and healing properties. It hydrates the skin deeply, reduces inflammation, and helps in the healing of small cuts, burns, and acne scars. Its cooling effect makes it ideal for sensitive or irritated skin.",
    benefits: [
      "Deeply hydrates and moisturizes the skin",
      "Soothes sunburn and skin irritation",
      "Promotes healing of wounds and acne scars",
      "Contains antioxidants and vitamins for healthy skin",
    ],
  },
  {
    id: 3,
    title: "Turmeric: Golden Glow Enhancer",
    image: "./assets/turmeric.jpg",
    description:
      "Turmeric is a powerful anti-inflammatory and antioxidant-rich spice that promotes a natural glow. It helps in reducing blemishes, calming skin conditions, and fighting signs of aging. A staple in traditional skincare remedies, turmeric leaves the skin looking radiant.",
    benefits: [
      "Fights inflammation and reduces redness",
      "Helps fade acne scars and dark spots",
      "Promotes a natural radiant glow",
      "Slows down signs of aging with antioxidants",
    ],
  },

  {
    id: 4,
    title: "Rice Water: Ancient Beauty Secret",
    image: "./assets/rice-water.jpg",
    description:
      "Rice water has been used for centuries in Asian skincare routines. It’s rich in vitamins, minerals, and amino acids that nourish the skin. Rice water brightens the complexion, reduces pore size, and promotes a soft, radiant glow.",
    benefits: [
      "Brightens and evens out skin tone",
      "Minimizes appearance of pores",
      "Improves skin texture and softness",
      "Rich in antioxidants that fight aging",
    ],
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#CFE6D0] py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-[#143117] mb-10">
        Welcome to blogs on Natural Ingredients
      </h1>

      <div className="max-w-4xl mx-auto ">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden mb-10"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-60 object-cover"
            />

            {/* Blog Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-[#2AA831] mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600">{blog.description}</p>

              {/* Benefits List */}
              <ul className="mt-4 list-disc list-inside text-gray-700">
                {blog.benefits.map((benefit, index) => (
                  <li key={index}>✅ {benefit}</li>
                ))}
              </ul>

              {/* Read More Button */}
              {/* <button className="mt-4 px-4 py-2 bg-[#2AA831] text-white font-medium rounded-lg hover:bg-[#143117] transition-all">
                Read More
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
