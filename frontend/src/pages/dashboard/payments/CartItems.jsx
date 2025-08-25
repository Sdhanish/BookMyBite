export default function CartItems({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.recipe._id}
          className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.recipe.image}
              alt={item.recipe.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{item.recipe.name}</h3>
              <p className="text-sm text-gray-500">
                ₹{item.recipe.price} x {item.quantity}
              </p>
            </div>
          </div>
          <span className="text-lg font-bold text-green-600">
            ₹{item.recipe.price * item.quantity}
          </span>
        </div>
      ))}
    </div>
  );
}
