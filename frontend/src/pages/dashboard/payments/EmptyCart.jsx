export default function EmptyCart({ navigate }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">No items selected</h1>
      <button
        onClick={() => navigate("/dashboard/cart")}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        Back to Cart
      </button>
    </div>
  );
}
