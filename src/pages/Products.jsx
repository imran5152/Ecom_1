import React from 'react';

const Products = () => {
  return (
    <div>
      
      <div className="w-full bg-slate-900 h-[40px] text-white flex items-center">
        <ul className="flex space-x-6 px-6 text-sm font-medium">
          <li className="hover:text-indigo-400 cursor-pointer">Products</li>
          <li className="hover:text-indigo-400 cursor-pointer">Mobile</li>
          <li className="hover:text-indigo-400 cursor-pointer">Phone</li>
          <li className="hover:text-indigo-400 cursor-pointer">Electronics</li>
          <li className="hover:text-indigo-400 cursor-pointer">Accessories</li>
        </ul>
      </div>

      <div className='flex w-full'>
        <div className='h-[500px] w-[20%] bg-slate-400'> 
        
        </div>
        <div className='ml-5 bg-indigo-400 w-[75%]'>

        </div>
      </div>
    </div>
  );
};

export default Products;
