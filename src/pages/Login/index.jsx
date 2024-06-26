import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Логика обработки формы
    const data = {
      login: login,
      password: password,
    };
    const res = await authService.auth(data);
    if (res) {
      navigate("/product");
      localStorage.setItem('auth', JSON.stringify(res));
    }
    console.log("Login:", login);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="login">
              Логин
            </label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={handleLoginChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите логин"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите пароль"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Войти
          </button>
        </form>
        <div className="flex items-center justify-center">
          <p>У вас нет аккаунта?{""}</p>
          <Link to={"/register"}>Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
