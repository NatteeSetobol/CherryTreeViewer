import React, {useState, useEffect} from 'react'
import { useSearchNoteMutation} from '../services/notes'

const Search:React.FC<any> = () =>
{
    const [searchQuery, setSearchQuery] = useState<String | any>("");
    const [searchNotes,{error,isLoading,isSuccess, isError}] = useSearchNoteMutation()

    const searchOnClick = () => {
        searchNotes({ query: searchQuery})
    } 
    
    const searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    return (
        <>
            <div className="search">
                <div>
                    Search: 
                </div>
                <div>
                    <input type="input" onChange={searchOnChange} value={searchQuery} />
                    <button onClick={searchOnClick}>Search</button>
                </div>
            </div>
        </>
    )
}

export default Search;