import React, { useEffect} from 'react'
import { TreeNode } from '../types/TreeNode.type'
import { useGetNodeMutation} from '../services/notes'
import '../css/TreeNodeComponent.css'
import { notEqual } from 'assert';

type TreeNodeProps = {
    node: TreeNode,
    addNode: (parentId: string, name: string, newId: string, isParent: number) => void;
    toggleExpand: (nodeId: string) => void;
    setExpand: (nodeId: string, expaned:boolean) => void;
    setSelectedContent: (setSelectedContent:any) => void; 
};



const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node,addNode,setExpand,toggleExpand, setSelectedContent}) => {
    
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
            addNode('' +nodeStatus.id,nodeStatus.data[i].name,''+nodeStatus.data[i].node_id, nodeStatus.data[i].isParent);
        }
    }

    const doExpansion = (childNode:TreeNode) => {
        if (childNode.isExpanded == false)
        {
            if (childNode.isPopulated == false)
            {
                GetNode(childNode.id)
                childNode.isPopulated = true;
            }
        }

        toggleExpand(childNode.id)
    }   

    const ShowText = () => {
        setSelectedContent(node.id);
    }
    const handleKeyDown = (event:React.KeyboardEvent<HTMLAnchorElement>) => {
        if (event.key === 'Enter') {
            doExpansion(node)
        }
      };


    return (
        <div style={{ marginLeft: '20px'}}>
            <div>

                { node.isParent == 1 ? (
                    <>
                        <button onClick={() => doExpansion(node)} className='expansionButton'>
                            {node.isExpanded ? '-' : '+'}
                        </button> 
                    </>
                ): (
                    <>
                    </>

                )
                }
                <a href='' onClick={ShowText} onKeyDown={handleKeyDown}> 
                    <span className="dot"></span>
                    {node.name}
                </a>
            </div>

            {node.isExpanded && (
                <div>
                    {node.children.map((child) => (
                        <TreeNodeComponent
                        key={child.id}
                        node={child}
                        addNode={addNode}
                        toggleExpand={toggleExpand}
                        setExpand={setExpand}
                        setSelectedContent={setSelectedContent}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default TreeNodeComponent;