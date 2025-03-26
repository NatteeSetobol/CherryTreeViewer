import { TreeNode} from '../types/TreeNode.type'
import { getTreeid, increaseid} from '../slices/treeid'
import { useDispatch } from "react-redux"

export const addNodeToTree = (node: TreeNode, parentId: string, name: string, newID: string): TreeNode => {
    // If the current node is the parent, add the new child
    //var newNumber:number = getTreeid();
    //newNumber = newNumber + 1;
    if (node.id === parentId) {
      return {
        ...node,
        children: [...node.children, { id: newID, name, children: [], isExpanded: false,text: "", isPopulated: false, isParent: 0 }],
      };
    }
  
    // If not, recursively check and update the children, but only where necessary
    return {
      ...node,
      children: node.children.map(child => addNodeToTree(child, parentId, name, newID)), // Update only the branch where the parent exists
    };
  };

  export const deleteAll = (node: TreeNode):TreeNode =>
  {
    return {
        ...node,
        children: [],
    }
  }

export const toggleNodeExpansion = (node: TreeNode, nodeId: string): TreeNode => {
    if (node.id == nodeId)
    {
        return { ...node, isExpanded: !node.isExpanded}
    }
    return {
        ...node,
        children: node.children.map(child => toggleNodeExpansion(child, nodeId))
    };
};
export const setExpansion = (node: TreeNode, nodeId: string, expanded: boolean): TreeNode => {
    if (node.id == nodeId)
    {
        return { ...node, isExpanded: expanded}
    }

    return {
    
        ...node,
        children: node.children.map(child => setExpansion(child, nodeId, expanded))
        
    };
};

export const toggleNodePopulated = (node: TreeNode, nodeId: string): TreeNode => {
    if (node.id == nodeId)
    {
        return { ...node, isPopulated: !node.isPopulated}
    }
    return {
        ...node,
        children: node.children.map(child => toggleNodePopulated(child, nodeId))
    };
};

export const FindNodeById = (node: TreeNode, nodeId: string): TreeNode | null => {
  if (node.id === nodeId) {
      return node;
  }

  for (let child of node.children) {
      const found = FindNodeById(child, nodeId);
      if (found) {
          return found;
      }
  }

  return null;
};