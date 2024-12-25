import React, { useEffect} from 'react'
import { TreeNode } from '../types/TreeNode.type'
import { useGetNodeMutation} from '../services/notes'


type TreeNodeProps = {
    node: TreeNode,
    addNode: (parentId: string, name: string, newId: string) => void;
    toggleExpand: (nodeId: string) => void;
    setSelectedContent: (setSelectedContent:any) => void; 
};



const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node,addNode,toggleExpand, setSelectedContent}) => {
    
    const [GetNode, {data, error,isLoading,isSuccess,isError} ] = useGetNodeMutation()

    /*
    const [newNodeName, setNewNodeName] = useState('');

    
    const handleAddNode = () => {
        if (newNodeName.trim())
        {
            addNode(node.id, newNodeName, '0');
            setNewNodeName('')
        }
    };
    */
    useEffect(() => { 
        if (isLoading === false) 
        { 
            if (data)
            {
                AddChildNodes(data)
            }
        }
 
    }, [isLoading])



    const AddChildNodes = (nodeStatus:any) =>
    {
        for (let i=0; i < nodeStatus.data.length; i++)
        {
            addNode('' +nodeStatus.id,nodeStatus.data[i].name,''+nodeStatus.data[i].node_id);
        }
    }

    const doExpansion = (childNode:TreeNode) => {
        if (childNode.isExpanded == false)
        {
            if (childNode.isPopulated == false)
            {
                GetNode(childNode.id)
            }
        }

        toggleExpand(childNode.id)
    }   

    const ShowText = () => {
        setSelectedContent(node.id);
    }

    return (
        <div style={{ marginLeft: '20px'}}>
            <div>
                <button onClick={() => doExpansion(node)}>
                    {node.isExpanded ? '-' : '+'}
                </button> 
                <a href="#" onClick={ShowText}>{node.name}</a>
            </div>

            {node.isExpanded && (
                <div>
                    {node.children.map((child) => (
                        <TreeNodeComponent
                        key={child.id}
                        node={child}
                        addNode={addNode}
                        toggleExpand={toggleExpand}
                        setSelectedContent={setSelectedContent}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default TreeNodeComponent;