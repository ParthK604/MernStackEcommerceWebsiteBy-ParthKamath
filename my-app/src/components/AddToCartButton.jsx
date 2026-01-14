function AddToCartButton({ onAdd }) {
  return (
    <button
      className="bg-yellow-400 p-2 rounded font-bold cursor-pointer"
      onClick={onAdd}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
