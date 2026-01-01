import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { NodeType } from './utils/nodeFactory';
import AddButton from './AddButton';

function Node({ node, nodes, onAddNode, onDeleteNode, onEditNode, branch, renderNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label);

  const handleEdit = () => {
    onEditNode(node.id, editLabel);
    setIsEditing(false);
  };

  const getNodeStyle = () => {
    switch (node.type) {
      case NodeType.START:
        return 'bg-green-500 text-white';
      case NodeType.ACTION:
        return 'bg-blue-500 text-white';
      case NodeType.BRANCH:
        return 'bg-yellow-500 text-white';
      case NodeType.END:
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const renderChildren = () => {
    if (node.type === NodeType.BRANCH) {
      const trueChild = node.children.true;
      const falseChild = node.children.false;

      return (
        <div className="flex gap-16 mt-8">
          <div className="flex flex-col items-center">
            <div className="text-sm font-semibold text-green-600 mb-2">True</div>
            <div className="w-px h-8 bg-gray-400"></div>
            {trueChild ? (
              renderNode(trueChild, 'true')
            ) : (
              <AddButton node={node} onAddNode={onAddNode} branch="true" />
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-semibold text-red-600 mb-2">False</div>
            <div className="w-px h-8 bg-gray-400"></div>
            {falseChild ? (
              renderNode(falseChild, 'false')
            ) : (
              <AddButton node={node} onAddNode={onAddNode} branch="false" />
            )}
          </div>
        </div>
      );
    } else if (node.type !== NodeType.END && node.children) {
      return (
        <div className="flex flex-col items-center mt-8">
          <div className="w-px h-8 bg-gray-400"></div>
          {node.children.length > 0 ? (
            node.children.map(childId => renderNode(childId))
          ) : (
            <AddButton node={node} onAddNode={onAddNode} />
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative rounded-lg p-4 shadow-lg min-w-[200px] ${getNodeStyle()}`}>
        <div className="text-xs font-bold uppercase mb-2 opacity-75">
          {node.type}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="px-2 py-1 text-black rounded"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-white text-black rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditLabel(node.label);
                }}
                className="px-3 py-1 bg-gray-300 text-black rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="font-semibold text-lg">{node.label}</div>
        )}

        {node.type !== NodeType.START && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDeleteNode(node.id)}
              className="p-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      {renderChildren()}
    </div>
  );
}

export default Node;