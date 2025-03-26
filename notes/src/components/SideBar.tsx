import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TreeNode} from '../types/TreeNode.type'
import { addNodeToTree,  toggleNodeExpansion} from './TreeHelpers'
import TreeNodeComponent from './TreeNodeComponent'
import '../css/SideBar.css'
import { useGetMainNodesQuery} from '../services/notes'
import { toggleBoolean} from '../slices/treevisibility'

interface SideBarProps {
    tree: TreeNode;
    searchTree: TreeNode; 
    setSearchTree: React.Dispatch<React.SetStateAction<TreeNode>>;  // State setter for tree
    setTree: React.Dispatch<React.SetStateAction<TreeNode>>;  // State setter for tree
    setSelectedContent: React.Dispatch<React.SetStateAction<any>>;  // Type it as `any` or adjust to the actual content type
    setSelectedSearchContent: React.Dispatch<React.SetStateAction<any>>;  // Type it as `any` or adjust to the actual content type
    addSearchNode: (parentId: string, name: string, newTreeId: string) => void;
    addExpansion: (parentId: string) => void
  }

const SideBar:React.FC<SideBarProps> = ({addExpansion,searchTree,setSearchTree,tree, setTree,setSelectedContent,setSelectedSearchContent,addSearchNode}) => {
    const {data,error,isLoading,isSuccess, isError} = useGetMainNodesQuery("") 
    const [searchTreeVisible,setSearchTreeVisible ] = useState(false);
    const treeVis = useSelector((state:any) => state.TreeVisibility.value)
	const dispatch = useDispatch();


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

    useEffect(() => { 
    }, [treeVis])

    useEffect(() => {

    }, [searchTree])

    const AddParentNodes = (parentNodes:any) =>
    {
        for (let i=0; i < parentNodes.length; i++)
        {
            addNode('0',parentNodes[i].name,'' + parentNodes[i].node_id,parentNodes[i].isParent);
        }
    }

    const addNode = (parentId:string, name: string, newTreeId: string, isParent: number) => {
        setTree(prevTree => addNodeToTree(prevTree, parentId,name, newTreeId, isParent))
    };


    const toggleExpand = (nodeId: string) => {

        setTree(prevTree => toggleNodeExpansion(prevTree, nodeId))
    }

    return (
        <div>   
                {treeVis ? (
                    <>
                        <TreeNodeComponent node={searchTree} addNode={addSearchNode} toggleExpand={addExpansion} setExpand={addExpansion} setSelectedContent={setSelectedContent} />
                    </>
                ):
                (
                    <>
                    <TreeNodeComponent  setExpand={addExpansion} node={tree} addNode={addNode} toggleExpand={toggleExpand} setSelectedContent={setSelectedContent} />
                    {
                        data ? (
                            <></>
                        ): isError ? (
                            <>Error has occured </>
                        ): isLoading ? (
                            <>Loading data</>
                        ): null

                        }
                    </>
                )
                }
                

            
        </div>
    )
}

export default SideBar;