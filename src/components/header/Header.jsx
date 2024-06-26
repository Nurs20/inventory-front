import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const res = localStorage.getItem('auth');
    if(res) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [])

  return (
    <div className='w-full h-[50px]'>
        <div className='w-[80%] h-[100%] m-auto flex justify-between items-center'>
            <div className='bg-[#C3E] text-white p-1 rounded-[5px]'>Nursultan</div>
            <div className='flex flex-row gap-10 items-center justify-center'>
                <div><Link to={"/product"}>Product</Link></div>
                <div><Link to={"/sale-history"}>Sale History</Link></div>
                <div><Link to={"/forecast"}>Forecast</Link></div>
                <div><Link to={"/"}>{isAuth ? "Выйти" : "Войти"}</Link></div>
            </div>
        </div>
    </div>
  )
}

export default Header