import React, { useState } from "react";

function PurchasePage() {
  const [amount, setAmount] = useState(1);

  const increaseAmount = () => setAmount(amount + 1);
  const decreaseAmount = () => setAmount(amount > 1 ? amount - 1 : 1);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Закупка продуктов</h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={decreaseAmount}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-xl">{amount}</span>
        <button
          onClick={increaseAmount}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default PurchasePage;
