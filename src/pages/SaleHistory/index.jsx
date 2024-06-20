import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import saleHistoryService from "../../services/saleHistory.service";

function SaleHistoryPage() {
  const [salesData, setSalesData] = useState([
    { sale_amount: 150.5, date: "2024-06-01", product: "Product A" },
    { sale_amount: 200.0, date: "2024-06-02", product: "Product B" },
    { sale_amount: 350.75, date: "2024-06-03", product: "Product C" },
    { sale_amount: 120.0, date: "2024-06-04", product: "Product D" },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterClick = () => {
    console.log(salesData);
    if (selectedDate) {
      const date = new Date(selectedDate);
      const formattedDate = new Date(date.setUTCHours(0, 0, 0, 0)).toISOString(); // Форматирование даты в виде yyyy-mm-dd
      const filteredData = salesData.filter(
        (item) => item.date === formattedDate
      );
      setSalesData(filteredData);
    } else {
      // Если selectedDate === null, показываем все данные
      setSalesData([
        { sale_amount: 150.5, date: "2024-06-01", product: "Product A" },
        { sale_amount: 200.0, date: "2024-06-02", product: "Product B" },
        { sale_amount: 350.75, date: "2024-06-03", product: "Product C" },
        { sale_amount: 120.0, date: "2024-06-04", product: "Product D" },
      ]);
    }
  };

  const getSalesHistory = async () => {
    const res = await saleHistoryService.get();
    setSalesData(res);
  };

  const handleDelete = async (sale) => {
    try {
      await saleHistoryService.remove(sale.id);
      getSalesHistory();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSalesHistory();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="pl-[10px] w-[95%] flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Sales Table</h1>
          <div className="flex">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="border-gray-300 bg-white text-gray-900 appearance-none rounded-md px-4 py-2 focus:outline-none"
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd" // Формат даты в DatePicker
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleFilterClick}
            >
              Filter
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
                    Product
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sale Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {sale.date}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {sale.product.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {sale.sale_amount}
                      </p>
                    </td>
                    <button
                      className="mt-5 bg-green-700 text-white text-center p-3 rounded-sm"
                      onClick={() => handleDelete(sale)}
                    >
                      Delete
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleHistoryPage;
