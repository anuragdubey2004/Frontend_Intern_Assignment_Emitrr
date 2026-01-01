import React from 'react';
import Node from './Node';

function Canvas({ rootNode, nodes, onAddNode, onDeleteNode, onEditNode }) {
  const renderNode = (nodeId, branch = null) => {
    if (!nodeId || !nodes[nodeId]) return null;
    
    const node = nodes[nodeId];
    
    return (
      <Node
        key = {node.id}
        node = {node}
        nodes = {nodes}
        onAddNode = {onAddNode}
        onDeleteNode = {onDeleteNode}
        onEditNode = {onEditNode}
        branch = {branch}
        renderNode = {renderNode}
      />
    );
  };
  return (
    <div className="flex justify-center items-start p-8 min-h-screen">
      <div className="flex flex-col items-center">
        {rootNode && renderNode(rootNode.id)}
      </div>
    </div>
  );
}

export default Canvas;