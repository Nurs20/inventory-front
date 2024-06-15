import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ForecastPage = () => {
    const [forecastData, setForecastData] = useState([
        { date: '2024-06-01', forecast_amount: 500, sale_id: 1, product_id: 1 },
        { date: '2024-06-02', forecast_amount: 600, sale_id: 2, product_id: 2 },
        { date: '2024-06-03', forecast_amount: 700, sale_id: 3, product_id: 3 },
        { date: '2024-06-04', forecast_amount: 800, sale_id: 4, product_id: 4 },
    ]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Фильтрация данных по выбранной дате
        const filteredData = forecastData.filter(forecast => forecast.date === formatDate(date));
        setForecastData(filteredData);
    };

    // Функция для форматирования даты в нужный формат 'yyyy-MM-dd'
    const formatDate = (date) => {
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    };

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Forecast Table</h1>
                    <div className="flex">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="border-gray-300 bg-white text-gray-900 appearance-none rounded-md px-4 py-2 focus:outline-none"
                            placeholderText="Select date"
                        />
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
                                            <p className="text-gray-900 whitespace-no-wrap">{forecast.date}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{forecast.forecast_amount}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{forecast.sale_id}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{forecast.product_id}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForecastPage;
