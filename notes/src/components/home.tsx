import React, {useState} from 'react'
import '../css/Home.css'
import SideBar from './SideBar'
import { TreeNode} from '../types/TreeNode.type'
import Main from './main'

const Home:React.FC<unknown> = () => {
    const [selectedContent, setSelectedContent] = useState<string>('');

    const [tree, setTree] = useState<TreeNode> ({
        id: '0',
        name: 'Root Node',
        children: [],
        isExpanded: false,
        text: "",
        isPopulated: true,
    });

    return (
        <div className="grid-container">
            <div className="item1">
                <SideBar tree={tree} setTree={setTree} setSelectedContent={setSelectedContent} />
            </div>
            <div className="item2">
                <Main selectedContent={selectedContent} setSelectedContent={setSelectedContent}  />
            </div>
        </div>
    );
}

export default Home;