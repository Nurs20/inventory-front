// src/components/ProductListTable.jsx
import React, { useState, useEffect } from 'react';
import productService from "../../services/product.service";

const ProductPage = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product A', amount: 10, price: 150.5 },
        { id: 2, name: 'Product B', amount: 5, price: 200.0 },
        { id: 3, name: 'Product C', amount: 8, price: 350.75 },
        { id: 4, name: 'Product D', amount: 15, price: 120.0 },
    ]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedAmount, setEditedAmount] = useState(0);
    const [editedPrice, setEditedPrice] = useState(0);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setSelectedProduct(null); // Сброс выбранного продукта перед добавлением нового
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleSale = () => {
        // Здесь можно добавить логику для обработки продажи продукта
        console.log(`Продажа продукта ${selectedProduct.name}`);
        closeModal();
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditedName(product.name);
        setEditedAmount(product.amount);
        setEditedPrice(product.price);
        setIsModalOpen(true);
    };

    const handleSaveEdit = () => {
        const updatedProducts = products.map((product) => {
            if (product.id === selectedProduct.id) {
                return {
                    ...product,
                    name: editedName,
                    amount: editedAmount,
                    price: editedPrice,
                };
            }
            return product;
        });
        setProducts(updatedProducts);
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleAddProduct = async () => {
        const newProduct = {
            name: editedName,
            amount: Number(editedAmount),
            price: Number(editedPrice),
        };
        setProducts([...products, newProduct]);
        try {
            const response = await productService.create(newProduct);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        setIsModalOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setEditedName(value);
                break;
            case 'amount':
                setEditedAmount(parseInt(value, 10));
                break;
            case 'price':
                setEditedPrice(parseFloat(value));
                break;
            default:
                break;
        }
    };

    const getProduct = async () => {
        try {
            const res = await productService.get();
            setProducts(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Product List</h1>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                        onClick={openAddModal}
                    >
                        Add Product
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} onClick={() => openModal(product)} className="cursor-pointer">
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{product.amount}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Остановить всплытие, чтобы не вызывалось открытие модального окна
                                                    handleEdit(product);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none ml-2"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Остановить всплытие, чтобы не вызывалось открытие модального окна
                                                    handleDelete(product.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Модальное окно для добавления и редактирования продукта */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white rounded-lg p-8">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedProduct ? `Edit ${selectedProduct.name}` : 'Add Product'}
                        </h2>
                        <div className="mb-4">
                            <label htmlFor="editName" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="editName"
                                name="name"
                                value={editedName}
                                onChange={handleChange}
                                className="border-gray-300 bg-white text-gray-900 appearance-none rounded-md px-4 py-2 focus:outline-none w-full mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editAmount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <input
                                type="number"
                                id="editAmount"
                                name="amount"
                                value={editedAmount}
                                onChange={handleChange}
                                className="border-gray-300 bg-white text-gray-900 appearance-none rounded-md px-4 py-2 focus:outline-none w-full mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editPrice" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                id="editPrice"
                                name="price"
                                step="0.01"
                                value={editedPrice}
                                onChange={handleChange}
                                className="border-gray-300 bg-white text-gray-900 appearance-none rounded-md px-4 py-2 focus:outline-none w-full mt-1"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none mr-2"
                                onClick={selectedProduct ? handleSaveEdit : handleAddProduct}
                            >
                                {selectedProduct ? 'Save' : 'Add'}
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage