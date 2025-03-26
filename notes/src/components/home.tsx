import React, {useState, useEffect} from 'react'
import '../css/Home.css'
import SideBar from './SideBar'
import { TreeNode} from '../types/TreeNode.type'
import Main from './main'
import { addNodeToTree,  toggleNodeExpansion,setExpansion,deleteAll} from './TreeHelpers'

const Home:React.FC<unknown> = () => {
    const [selectedContent, setSelectedContent] = useState<string>('');
    const [selectedSearchContent, setSelectedSearchContent] = useState<string>('');

    const [tree, setTree] = useState<TreeNode> ({
        id: '0',
        name: 'Root Node',
        children: [],
        isExpanded: false,
        text: "",
        isPopulated: true,
        isParent: 0
    });

    const [searchTree, setSearchTree] = useState<TreeNode> ({
        id: '0',
        name: 'Search Results',
        children: [],
        isExpanded: false,
        text: "",
        isPopulated: true,
        isParent: 0
    });

    useEffect(() => {

    }, [searchTree])

    const addSearchNode = (parentId:string, name: string, newTreeId: string) => {
        setSearchTree(prevTree => addNodeToTree(prevTree, parentId,name, newTreeId))
    };

    const toggleExpand = (nodeId: string) => {
        //setSearchTree(prevTree => setExpansion(prevTree, nodeId, expaned))
        setSearchTree(prevTree => toggleNodeExpansion(prevTree, nodeId))
    }



    const handleDeleteAll = () => {
        setSearchTree((prevTree) => {
            // Ensure the callback explicitly returns a TreeNode
            return deleteAll(prevTree);
        });
    };

    return (
        <div className="grid-container">
            <div className="item1">
                <SideBar setSearchTree={setSearchTree} addSearchNode={addSearchNode} searchTree={searchTree} tree={tree} setTree={setTree} setSelectedSearchContent={setSelectedSearchContent} setSelectedContent={setSelectedContent} addExpansion={toggleExpand}/>
            </div>
            <div className="item2">
                <Main handleDeleteAll={handleDeleteAll} addSearchNode={addSearchNode} setSearchTree={setSearchTree} searchTree={searchTree} selectedContent={selectedContent} setSelectedContent={setSelectedContent} addExpansion={toggleExpand}  />
            </div>
        </div>
    );
}

export default Home;