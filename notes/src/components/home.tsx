import React, {useState} from 'react'
import '../css/Home.css'
import SideBar from './SideBar'
import Main from './main'

const Home:React.FC<unknown> = () => {
    const [selectedContent, setSelectedContent] = useState<string>('');

    return (
        <div className="grid-container">
            <div className="item1">
                <SideBar setSelectedContent={setSelectedContent} />
            </div>
            <div className="item2">
                <Main selectedContent={selectedContent} setSelectedContent={setSelectedContent}  />
            </div>
        </div>
    );
}

export default Home;