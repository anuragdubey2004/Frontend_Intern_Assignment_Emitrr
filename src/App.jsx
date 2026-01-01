import React, { useState } from 'react';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import { createNode, NodeType } from './Components/utils/nodeFactory';

function App() {

  const startNode = createNode(NodeType.START, 'Start');
  const [nodes, setNodes] = useState({ [startNode.id]: startNode });
  const [rootId] = useState(startNode.id);

  const addNode = (parentId, type, branch) => {
    const label = type === NodeType.ACTION ? 'New Action' :
                  type === NodeType.BRANCH ? 'New Condition' : 'End';
    
    const newNode = createNode(type, label, parentId);
    const parent = nodes[parentId];
    
    let updatedParent = { ...parent };
    if (parent.type === NodeType.BRANCH) {
      updatedParent.children = { ...parent.children, [branch]: newNode.id };
    } else {
      updatedParent.children = [...parent.children, newNode.id];
    }

    setNodes({
      ...nodes,
      [parentId]: updatedParent,
      [newNode.id]: newNode
    });
  };

  const deleteNode = (nodeId) => {
    const nodeToDelete = nodes[nodeId];
    const parent = nodes[nodeToDelete.parentId];
    const updatedNodes = { ...nodes };

    if (parent.type === NodeType.BRANCH) {
      const branchKey = parent.children.true === nodeId ? 'true' : 'false';
      const childId = nodeToDelete.children && nodeToDelete.children.length > 0 
        ? nodeToDelete.children[0] 
        : null;

      updatedNodes[parent.id] = {
        ...parent,
        children: { ...parent.children, [branchKey]: childId }
      };

      if (childId) {
        updatedNodes[childId] = { ...updatedNodes[childId], parentId: parent.id };
      }
    } 
    else {
      const index = parent.children.indexOf(nodeId);
      const childrenIds = nodeToDelete.children || [];
      
      const newChildren = [
        ...parent.children.slice(0, index),
        ...childrenIds,
        ...parent.children.slice(index + 1)
      ];

      updatedNodes[parent.id] = { ...parent, children: newChildren };
      childrenIds.forEach(childId => {
        if (updatedNodes[childId]) {
          updatedNodes[childId] = { ...updatedNodes[childId], parentId: parent.id };
        }
      });
    }
    delete updatedNodes[nodeId];
    setNodes(updatedNodes);
  };
  const editNode = (nodeId, newLabel) => {
    setNodes({
      ...nodes,
      [nodeId]: { ...nodes[nodeId], label: newLabel }
    });
  };
  const saveWorkflow = () => {
    console.log('Workflow Data:', JSON.stringify(nodes, null, 2));
    alert('Workflow saved! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSave={saveWorkflow} />
      <Canvas 
        rootNode={nodes[rootId]}
        nodes={nodes}
        onAddNode={addNode}
        onDeleteNode={deleteNode}
        onEditNode={editNode}
      />
    </div>
  );
}

export default App;