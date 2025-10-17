import React from 'react'
import Logo from '~/assets/Logo.png'
function Narbar() {
  return (
    <div>
      {/* upper Navbar */}
      <div className = " bg-orange-300 py-2" >
        <div className="container flex justify-between items-center">
          <div >

            <a href="#" className="font-bold text-2xl sm:text-2xl flex items-center gap-1">
              <img src={Logo} alt="Logo" className = "w-20 h-20 uppercase"  />
              LACUMART
            </a>
          </div>
          {/* Search bar */}
          <div>
            <div className="group">
              <input type="text" placeholder="search" className="
              w-[200px] sm:w-[200px] group-hover:w-[300px] 
              transition-all duration-300 rounded-full border
             border-gray-300 px-2 py-1 focus:outline-none focus:border-1
             focus:border-orange-600
             " />
            </div>
          </div>
        </div>
      </div>


      {/* lower Narbar */}
    </div>
  )
}

export default Narbar