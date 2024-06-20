import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import forecastService from "../../services/forecast.service";
import productService from "../../services/product.service";
import saleHistoryService from "../../services/saleHistory.service";

const ForecastPage = () => {
  const [forecastData, setForecastData] = useState([
    { date: "2024-06-01", forecast_amount: 500, sale_id: 1, product_id: 1 },
    { date: "2024-06-02", forecast_amount: 600, sale_id: 2, product_id: 2 },
    { date: "2024-06-03", forecast_amount: 700, sale_id: 3, product_id: 3 },
    { date: "2024-06-04", forecast_amount: 800, sale_id: 4, product_id: 4 },
  ]);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [product, setProduct] = useState();
  const [sale, setSale] = useState();

  const [selecteFilterdDate, setSelectedFilterDate] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSale, setSelectedSale] = useState("");

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);

  //   // Фильтрация данных по выбранной дате
  //   const filteredData = forecastData.filter(
  //     (forecast) => forecast.date === formatDate(date)
  //   );
  //   setForecastData(filteredData);
  // };

  // Функция для форматирования даты в нужный формат 'yyyy-MM-dd'
  const formatDate = (date) => {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  };

  const handleChangeProduct = (event) => {
    const selectedValue = event.target.value;
    setSelectedProduct(selectedValue);
  };

  const handleChangeSale = (event) => {
    const selectedValue = event.target.value;
    setSelectedSale(selectedValue);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log("Selected date:", event.target.value); // Выводит выбранную дату в консоль
  };

  const handleFilterDateChange = (event) => {
    setSelectedFilterDate(event);
    console.log("Selected date:", event); // Выводит выбранную дату в консоль
  };

  const handleFilterClick = () => {
    console.log(forecastData);
    if (selecteFilterdDate) {
      const date = new Date(selecteFilterdDate);
      const formattedDate = new Date(
        date.setUTCHours(0, 0, 0, 0)
      ).toISOString(); // Форматирование даты в виде yyyy-mm-dd
      const filteredData = forecastData.filter(
        (item) => item.date === formattedDate
      );
      setForecastData(filteredData);
    } else {
      // Если selectedDate === null, показываем все данные
      setForecastData([
        { sale_amount: 150.5, date: "2024-06-01", product: "Product A" },
        { sale_amount: 200.0, date: "2024-06-02", product: "Product B" },
        { sale_amount: 350.75, date: "2024-06-03", product: "Product C" },
        { sale_amount: 120.0, date: "2024-06-04", product: "Product D" },
      ]);
    }
  };

  const getForecast = async () => {
    const res = await forecastService.get();
    setForecastData(res);
  };

  const getProduct = async () => {
    const res = await productService.get();
    setProduct(res);
  };

  const getSale = async () => {
    const res = await saleHistoryService.get();
    setSale(res);
  };

  const onForecast = async () => {
    const date = selectedDate + "T00:00:00Z";
    const data = {
      date: date,
      product: selectedProduct,
      sale: selectedSale,
    };
    const res = await forecastService.create(data);
    console.log(res);
    setSelectedDate("");
    setSelectedProduct("");
    setSelectedSale("");
    setIsModal(false);
    getForecast();
  };

  useEffect(() => {
    getForecast();
    getProduct();
    getSale();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Forecast Table</h1>
          <div className="flex">
            <DatePicker
              selected={selecteFilterdDate}
              onChange={handleFilterDateChange}
              className="border-gray-300 bg-white text-gray-900 appearance-none rounded-md px-4 py-2 focus:outline-none"
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleFilterClick}
            >
              Filter
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsModal(true)}
              className="rounded-[10px] p-2 bg-[#C5E] text-white"
            >
              Создать прогноз
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Forecast Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sale ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((forecast, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {forecast.date}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {forecast.forecast_amount}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {forecast?.sale?.id}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {forecast?.product?.name}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <button
              onClick={() => setIsModal(false)}
              className="relative left-[220px] lg:left-[390px] m-4 text-gray-700"
            >
              &times;
            </button>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-2 border rounded"
                placeholder="2024-01-01"
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

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sale history</label>
              <select
                name="sale"
                value={selectedSale}
                onChange={handleChangeSale}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a sale</option>
                {sale.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onForecast}
              className="bg-green-500 text-white p-3 rounded-[10px] mt-[15px] w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
