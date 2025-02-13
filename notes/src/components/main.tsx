import React, {useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'
import parse from 'html-react-parser';  
import '../css/main.css'
import { useGetNoteMutation} from '../services/notes'
import { connected } from 'process';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Add a theme
import Search from '../components/Search'
import { TreeNode} from '../types/TreeNode.type'
import { setBoolean } from '../slices/treevisibility';

interface SideBarProps {
    searchTree: TreeNode; 
    setSearchTree: React.Dispatch<React.SetStateAction<TreeNode>>;  // State setter for tree
    setSelectedContent: React.Dispatch<React.SetStateAction<any>>; 
    selectedContent: String;
    addSearchNode: (parentId: string, name: string, newTreeId: string) => void;
    addExpansion: (parentId: string, expaned: boolean) => void
    handleDeleteAll: () => void

  }

const Main:React.FC<SideBarProps> = ({handleDeleteAll, addExpansion,addSearchNode,searchTree,setSearchTree ,selectedContent,setSelectedContent}) => 
{
    const [GetNote, {data, error,isLoading,isSuccess,isError} ] = useGetNoteMutation()
    const [ message, setMessage] = useState<string>('');
    const [elements, setElements] = useState<JSX.Element[]>([]);

    useEffect(() => {
        GetNote('' +selectedContent)
    }, [selectedContent]) 

    useEffect(() => {
        Prism.highlightAll();
      }, []);
 
    useEffect(() => {
    }, [elements]) 

    const renderTextWithLineBreaks = (text: string) => {
        return text.split(/\r?\n/).map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    useEffect(()=> {

        if (isLoading == false)
        {
            if (data)
            {
                let newData = data.message[0].txt

                newData = newData.replace(/<[^>]*>/g, '')
                
                if (data.codebox)
                {
                    if (data.codebox.length > 0)
                    {
                        const newElements: JSX.Element[] = [];
                        let start = 0

                        for (let i=0; i < data.codebox.length; i++)
                        {
                            var offset = data.codebox[i].offset;
                            var width = data.codebox[i].width;
                            var height = data.codebox[i].height;

                            var part1 = newData.substring(start,offset)
                            const part1WithLineBreaks = renderTextWithLineBreaks(part1);

                            let codeBoxCode = data.codebox[i].txt;

                            newElements.push(
                                <div key={`text-${i}`} className="dynamic-element" > 
                                  {part1WithLineBreaks}
                                </div>
                            );
                          
                            // Add a div for the code box
                            newElements.push(
                                <div key={`codebox-${i}`} className="dynamic-codebox">
                                    <code className={`language-${data.codebox[i].syntax}`}>
                                        {codeBoxCode}
                                    </code>
                                </div>
                            );

                            start = offset
                        }

                        if (start != newData.length)
                        {
                            var ending = newData.substring(start,newData.length)
                            newElements.push(
                                <div key={`text-${999}`} className="dynamic-element" > 
                                  {ending}
                                </div>
                            );
                        }
                        setElements(newElements);
                    }
                } else {
                    //newData =  newData.replace(/(\r\n|\n)/g, '<br />');

                    const part1WithLineBreaks = renderTextWithLineBreaks(newData);
                    const newElements: JSX.Element[] = [];
                    newElements.push(
                                <div key={`text-${999}`} className="dynamic-element" > 
                                  { part1WithLineBreaks}
                                </div>
                            );
                        
                    setElements(newElements);
                }
                

                setMessage(newData);
            }
        }
    }, [isLoading])

    return (
        <div>
                <Search handleDeleteAll={handleDeleteAll} addSearchNode={addSearchNode} searchTree={searchTree} setSearchTree={setSearchTree} addExpansion={addExpansion}/>
                <div className="main_css">
                    {elements}
                <div/>
            </div>
        </div>
    )
}

export default Main;