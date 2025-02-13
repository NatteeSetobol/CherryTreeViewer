import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchNoteMutation} from '../services/notes'
import { TreeNode} from '../types/TreeNode.type'
import { addNodeToTree,  toggleNodeExpansion} from './TreeHelpers'
import {setBoolean} from '../slices/treevisibility'
import '../css/search.css'

interface SideBarProps {
    searchTree: TreeNode; 
    setSearchTree: React.Dispatch<React.SetStateAction<TreeNode>>;  // State setter for treea
    addSearchNode: (parentId: string, name: string, newTreeId: string) => void;
    addExpansion: (parentId: string, expaned: boolean) => void
    handleDeleteAll: () => void
  }


const Search:React.FC<SideBarProps> = ({handleDeleteAll,addExpansion,searchTree,setSearchTree,addSearchNode}) => 
{
    const [searchQuery, setSearchQuery] = useState<String | any>("");
    const [searchNotes,{data,error,isLoading,isSuccess, isError}] = useSearchNoteMutation()
    const treeVis = useSelector((state:any) => state.TreeVisibility.value)
	const dispatch = useDispatch();

    useEffect(()=> {
    

    }, [searchTree])

    useEffect(()=> {
    

    }, [treeVis])


    useEffect(() => {
        if (isSuccess)
        {
            if (data)
            {
                data.map((items:any) => {
                    addSearchNode("0",items.name,items.node_id)
                } )
                addExpansion("0", true)
            }
        }
    }, [data])

    const searchOnClick = () => {
        handleDeleteAll()
        dispatch(setBoolean(true))
        searchNotes({ query: searchQuery})
        
    } 
    
    const searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const searchReset = () => {
        handleDeleteAll()
        setSearchQuery("")
        dispatch(setBoolean(false))
       
    }


    return (
        <>
            <div className="search">
                <div>
                    Search: 
                </div>
                <div>
                    <input type="input" onChange={searchOnChange} value={searchQuery} />
                    <button onClick={searchOnClick} className="searchButton">Search</button>
                    <button onClick={searchReset}>Reset</button>
                </div>
            </div>
        </>
    )
}

export default Search;