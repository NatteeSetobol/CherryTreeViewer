import React, {useState, useEffect } from 'react'
import { TreeNode} from '../types/TreeNode.type'
import { addNodeToTree,  toggleNodeExpansion} from './TreeHelpers'
import TreeNodeComponent from './TreeNodeComponent'
import '../css/SideBar.css'
import { useGetMainNodesQuery} from '../services/notes'

const SideBar:React.FC<any> = ({setSelectedContent}) => {
    const {data,error,isLoading,isSuccess, isError} = useGetMainNodesQuery("") 

    const [tree, setTree] = useState<TreeNode> ({
        id: '0',
        name: 'Root Node',
        children: [],
        isExpanded: false,
        text: "",
        isPopulated: true,
    });


    useEffect(() => { 
        if (isLoading === false) 
        { 
            if (data)
            {
                toggleExpand('0')
                AddParentNodes(data);
            }
        }
    }, [isLoading])



    const AddParentNodes = (parentNodes:any) =>
    {
        for (let i=0; i < parentNodes.length; i++)
        {
            addNode('0',parentNodes[i].name,'' + parentNodes[i].node_id);
        }
    }

    const addNode = (parentId:string, name: string, newTreeId: string) => {
        setTree(prevTree => addNodeToTree(prevTree, parentId,name, newTreeId))
    };


    const toggleExpand = (nodeId: string) => {

        setTree(prevTree => toggleNodeExpansion(prevTree, nodeId))
    }
    

    return (
        <div>
            <TreeNodeComponent node={tree} addNode={addNode} toggleExpand={toggleExpand} setSelectedContent={setSelectedContent} />
            {
            data ? (
                <></>
            ): isError ? (
                <>Error has occured </>
            ): isLoading ? (
                <></>
            ): null

            }
        </div>
    )
}

export default SideBar;