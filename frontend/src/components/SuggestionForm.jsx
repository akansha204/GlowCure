import { useState } from "react";
import { suggestedRemedy } from "../apis/RemedyApis";

export default function RemedySuggestionForm() {
  const [formData, setFormData] = useState({
    title: "",
    products: [{ name: "", quantity: "" }],
    benefits: "",
    directions: "",
    skipItem: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = formData.products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", quantity: "" }],
    });
  };

  const deleteProduct = () => {
    if (formData.products.length > 1) {
      setFormData({
        ...formData,
        products: formData.products.slice(0, -1),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the API to submit the suggestion
    try {
      const response = await suggestedRemedy(formData);
      if (response.success) {
        alert("Suggestion submitted successfully!");
        setFormData({
          title: "",
          products: [{ name: "", quantity: "" }],
          benefits: "",
          directions: "",
          skipItem: "",
          notes: "",
        });
      } else {
        alert(response.message || "Failed to submit suggestion.");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      alert("An error occurred while submitting the suggestion.");
    }
  };

  return (
    <>
      <div className="flex flex-col mx-auto items-center w-full max-w-4xl px-6 md:px-14 pb-3 mt-5 min-h-screen">
        <h1 className="font-bold text-3xl text-[#2AA831] text-center mb-4">
          🌿 Suggest remedies 🌿
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-6 bg-[#E1F1F7] rounded-2xl shadow-lg "
        >
          <h2 className="text-2xl font-bold mb-4 text-[#143117]">
            Suggest a Remedy
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Remedy Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded-lg border border-[#2AA831]"
          />

          <h3 className="font-semibold text-[#143117] mb-2">Products:</h3>
          {formData.products.map((product, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(index, "name", e.target.value)
                }
                className="flex-1 p-2 rounded-lg border border-[#2AA831]"
              />
              <input
                type="text"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", e.target.value)
                }
                className="flex-1 p-2 rounded-lg border border-[#2AA831]"
              />
            </div>
          ))}

          {/* Add & Delete Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={addProduct}
              className="bg-[#2AA831] text-white px-4 py-2 rounded-lg"
            >
              + Add Product
            </button>
            <button
              type="button"
              onClick={deleteProduct}
              className="bg-[#93A59A] text-white px-4 py-2 rounded-lg"
            >
              - Delete Product
            </button>
          </div>

          <textarea
            name="benefits"
            placeholder="Benefits"
            value={formData.benefits}
            onChange={handleChange}
            className="w-full p-2 mt-4 rounded-lg border border-[#2AA831]"
          />

          <textarea
            name="directions"
            placeholder="Directions"
            value={formData.directions}
            onChange={handleChange}
            className="w-full p-2 mt-4 rounded-lg border border-[#2AA831]"
          />

          <input
            type="text"
            name="skipItem"
            placeholder="Items that can be skipped"
            value={formData.skipItem}
            onChange={handleChange}
            className="w-full p-2 mt-4 rounded-lg border border-[#2AA831]"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 mt-4 rounded-lg border border-[#2AA831]"
          />

          <button
            type="submit"
            className="w-full bg-[#143117] text-white py-2 mt-6 rounded-lg hover:bg-[#2AA831]"
          >
            Submit Suggestion
          </button>
        </form>
      </div>
    </>
  );
}
