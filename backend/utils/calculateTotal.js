export const calculateTotalPrice = (items) => {
  if (!items || items.length === 0) return 0;
  return items.reduce((total, item) => {
    if (!item.recipe || !item.recipe.price) return total; // safety check
    return total + item.recipe.price * item.quantity;
  }, 0);
};
