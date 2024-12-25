import React, {useEffect, useState} from 'react'
import { renderToString } from 'react-dom/server'
import parse from 'html-react-parser';  
import '../css/main.css'
import { useGetNoteMutation} from '../services/notes'
import { connected } from 'process';

const Main:React.FC<any> = (selectedContent,setSelectedContent) => {
    
    const [GetNote, {data, error,isLoading,isSuccess,isError} ] = useGetNoteMutation()
    const [ message, setMessage] = useState<string>('');

    useEffect(() => {
        console.log(selectedContent.selectedContent)
        GetNote('' + selectedContent.selectedContent)
    }, [selectedContent]) 
    
    useEffect(()=> {

        if (isLoading == false)
        {
            if (data)
            {
                console.log(data.codebox)
                /*
                    Note: Support multi-codeboxes 
                */
                let newData = data.message[0].txt

                newData = newData.replace(/<[^>]*>/g, '')

                
                if (data.codebox)
                {
                    if (data.codebox.length > 0)
                    {
                        var offset = data.codebox[0].offset;
                        var width = data.codebox[0].width;
                        var height = data.codebox[0].height

                        var part1 = newData.substring(1,offset)
                        var part2 = newData.substring(offset, (newData.length-offset))

                        newData = part1 + data.codebox[0].txt + part2;
                        newData =  newData.replace(/(\r\n|\n)/g, '<br />');
                    }
                } else {
                    newData =  newData.replace(/(\r\n|\n)/g, '<br />');
                }
                

                setMessage(newData);
            }
        }
    }, [isLoading])

    const xmlToHtml = (xmlString: string): string => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString,'text/xml');
        const htmlString = renderToString(parse(xmlDoc.documentElement.outerHTML));
        return htmlString;
    }


    return (
        <div>
            <div className="search">Search: <input type="input" ></input></div>
            <div className="main_css">
            <div dangerouslySetInnerHTML={{ __html: message }} />
            </div>
        </div>
    )
}

export default Main;