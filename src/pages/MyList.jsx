import { useEffect, useState } from "react"
import Card from "../components/Card"
import "../css/mylist.css"
import SearchBar from "../components/SearchBar"
import Loading from "../components/Loading"

function MyList(){
    const [myList, setMyList] = useState(() => {
        return JSON.parse(localStorage.getItem("myList")) || []
    })

    const [filteredList, setfilteredList] = useState([])
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        localStorage.setItem("myList", JSON.stringify(myList))
        setLoading(false)
    }, [myList])

    const uniqueList = Array.from(
        new Map(myList.map(card => [card.id, card])).values()
    )

    const handleSearch = async (query) => {
        setLoading(true);
        setIsSearching(true);
        try {
            const searchResults = uniqueList.filter(card => card.name.toLowerCase().includes(query.toLowerCase()))
            setfilteredList(searchResults);
        } catch (error) {
            console.error("Error searching for Pokémon:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = async () => {
        setLoading(true)
        setIsSearching(false)
        setfilteredList(uniqueList)
        setLoading(false)
    }


    if (loading) return <Loading text={"My List"}/>

    

    return(
        <div>
            <div className="header-fade"></div>
            <div className="header">
            <h1> My List </h1>
            <SearchBar onSearch={handleSearch} onReset={resetSearch} isSearching={isSearching} searchtype="Pokémon" />
            </div>
            {uniqueList.length > 0 ? (
                <div className="myCards-container">
                    {!isSearching ? (uniqueList.map((card) => (
                        <Card key={card.id} card = {card}></Card>
                    ))) : 
                    (filteredList.map((card) => (
                        <Card key={card.id} card = {card}></Card>
                    )))}
                </div>
            ) : (
                <h2 className="placeholder-text"> Your List is empty </h2>
            )}
        </div>
    )
}

export default MyList
