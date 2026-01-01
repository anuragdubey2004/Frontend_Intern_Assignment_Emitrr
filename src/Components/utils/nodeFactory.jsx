export const NodeType = {
  START: 'start',
  ACTION: 'action',
  BRANCH: 'branch',
  END: 'end'
};

export function createNode(type, label, parentId) {
  const id = 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  let children = [];
  if (type === NodeType.BRANCH) {
    children = { true: null, false: null };
  } else if (type === NodeType.END) {
    children = null;
  }
  return {
    id: id,
    type: type,
    label: label,
    parentId: parentId || null,
    children: children
  };
}