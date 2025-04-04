import React from "react";

const blogData = [
  {
    id: 1,
    title: "Lemon: A Natural Skin Brightener",
    image: "https://source.unsplash.com/600x400/?lemon",
    description:
      "Lemon is packed with Vitamin C and antioxidants that help brighten your skin and reduce dark spots. It also has antibacterial properties, making it great for treating acne. However, always dilute lemon juice before applying it to avoid irritation.",
    benefits: [
      "Lightens dark spots and pigmentation",
      "Fights acne-causing bacteria",
      "Acts as a natural exfoliator",
      "Boosts collagen production for youthful skin",
    ],
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#CFE6D0] py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-[#143117] mb-10">
        Welcome to blogs on Natural Ingredients
      </h1>

      <div className="max-w-4xl mx-auto">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all hover:scale-105 duration-300"
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
