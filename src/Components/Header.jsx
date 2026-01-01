import React from 'react';

function Header({ onSave }) {
  return (
    <div className="bg-white border-b-2 border-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-6">
         <div className="flex justify-between items-center">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">
              Workflow Builder
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage your workflow
            </p>
           </div>
          
          <button
            onClick={onSave}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
          >
            Save Workflow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;