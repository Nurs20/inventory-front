import React, { useEffect, useState } from "react";
import productService from "../../services/product.service";
import { useNavigate } from "react-router-dom";
import saleHistoryService from "../../services/saleHistory.service";

function SalePage() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleDateChange = (e) => setDate(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const navigate = useNavigate();

  const handleChangeProduct = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedProduct(selectedValue);
  };

  const getProduct = async () => {
    const res = await productService.get();
    setProduct(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDate = date + "T00:00:00Z";
    const data = {
      date: newDate,
      sale_amount: Number(amount),
      product: selectedProduct,
    };
    try {
      await saleHistoryService.create(data);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    console.log(date); // Это будет логировать обновлённое значение editedDate
  }, [date]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Форма продаж</h2>
        <form onSubmit={handleSubmit}>
          {/* Поле ввода для даты */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Дата
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Выберите дату"
              required
            />
          </div>

          {/* Поле ввода для amount */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите сумму"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product</label>
            <select
              name="product"
              value={selectedProduct}
              onChange={handleChangeProduct}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a product</option>
              {product.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопка отправки формы */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Создать продажу
          </button>
        </form>
      </div>
    </div>
  );
}

export default SalePage;
