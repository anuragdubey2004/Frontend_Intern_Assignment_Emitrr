import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NodeType } from './utils/nodeFactory';

function AddButton({ node, onAddNode }) {
  const [showMenu, setShowMenu] = useState(false);

  function addNode(type, branch) {
    onAddNode(node.id, type, branch);
    setShowMenu(false);
  }

  if (node.type === NodeType.BRANCH) {
    return (
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <button
            onClick={() => addNode(NodeType.ACTION, 'true')}
            className="p-2 bg-white border-2 border-gray-800 rounded-full hover:bg-gray-100"
            title="Add to True branch"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => addNode(NodeType.ACTION, 'false')}
            className="p-2 bg-white border-2 border-gray-800 rounded-full hover:bg-gray-100"
            title="Add to False branch"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 bg-white border-2 border-gray-800 rounded-full hover:bg-gray-100"
        title="Add node"
      >
        <Plus size={20} />
      </button>

      {showMenu && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-800 rounded-lg p-2 z-10 min-w-[150px]">
          <button
            onClick={() => addNode(NodeType.ACTION)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
          >
            Action
          </button>
          
          <button
            onClick={() => addNode(NodeType.BRANCH)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
          >
            Branch
          </button>
          
          <button
            onClick={() => addNode(NodeType.END)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
          >
            End
          </button>
        </div>
      )}
    </div>
  );
}

export default AddButton;