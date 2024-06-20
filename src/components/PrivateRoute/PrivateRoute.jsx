import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem('auth'));

  if (!user) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу логина
    return <Navigate to="/" />;
  }

  if (roles !== user.role) {
    // Если у пользователя нет нужной роли, перенаправляем на страницу "доступ запрещен"
    return <Navigate to="/" />;
  }

  // Если все проверки пройдены, рендерим дочерние компоненты
  return children;
}

export default PrivateRoute;
