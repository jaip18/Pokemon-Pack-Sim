import React, { useState, useEffect } from "react";
import { fetchAllSets, fetchPack } from "../assets/api"; 
import Pack from "../components/Pack"; 
import Card from "../components/Card";
import "../css/packs.css"
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

const Packs = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openedPack, setOpenedPack] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [packName, setNameOfPack] = useState("");
  const [filteredList, setfilteredList] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);
  const [myList, setMyList] = useState(() => {
    return JSON.parse(localStorage.getItem("myList")) || []
  });

  useEffect(() => {
    const getSets = async () => {
      const allSets = await fetchAllSets();
      setSets(allSets);
      setLoading(false);
    };
    getSets();
  }, []);

  // First step: Select a pack and center it as overlay
  const selectPack = (set) => {
    setSelectedPack(set);
  };

  // Second step: Open the selected pack
  const openSelectedPack = async () => {
    if (!selectedPack) return;
    
    setLoading(true);
    setNameOfPack(selectedPack.name);
    
    try {
      const pack = await fetchPack(selectedPack.id);
      setOpenedPack(pack);
      
      const updatedList = [...myList, ...pack];
      setMyList(updatedList);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      
      // Close the selected pack overlay
      setSelectedPack(null);
    } catch (error) {
      console.error("Error opening pack:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close the selected pack view without opening
  const closeSelectedPack = (e) => {
    // Only close if clicking the backdrop, not the pack itself
    if (e.target === e.currentTarget) {
      setSelectedPack(null);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setIsSearching(true);
    try {
      const searchResults = sets.filter(set => 
        set.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilteredList(searchResults);
    } catch (error) {
      console.error("Error searching for Pack:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    setLoading(true);
    setIsSearching(false);
    setfilteredList(sets);
    setLoading(false);
  };
  
  if (loading && packName) return <Loading text={packName}/>;
  if (loading) return <Loading text="Packs"/>;

  return (
    <div>
      {/* Add this separate header fade element */}
      <div className="header-fade"></div>
      
      <div className="header">
        <h1> Packs </h1>
        <SearchBar 
          onSearch={handleSearch} 
          onReset={resetSearch} 
          isSearching={isSearching} 
          searchtype="Packs"
        />
      </div>
      
      <div className={`pack-container ${(openedPack || selectedPack) ? "blur-background" : ""}`}>
        {!isSearching 
          ? sets.slice().reverse().map((set) => (
              <Pack 
                key={set.id} 
                set={set} 
                onOpen={() => selectPack(set)}
              /> 
            ))
          : filteredList.slice().reverse().map((set) => (
              <Pack 
                key={set.id} 
                set={set} 
                onOpen={() => selectPack(set)}
              /> 
            ))
        }
      </div>

      {selectedPack && (
        <div className="pack-overlay" onClick={closeSelectedPack}>
          <Pack 
            set={selectedPack}
            onOpen={openSelectedPack}
            isCentered={true}
          />
        </div>
      )}

      {openedPack && (
        <div className="pack-opening-overlay">
          <div className="pack-opening">
            <div className="openedCard-container">
              {openedPack.map((card) => (
                <Card 
                  key={card.id} 
                  card={card} 
                  style={{ 
                    margin: '0 40px',
                    minWidth: '220px', /* Fixed minimum width */
                    width: '220px',    /* Fixed width */
                    height: '300px',   /* Fixed height */
                    flex: '0 0 auto'   /* Prevent flexbox from shrinking the cards */
                  }}
                  flipped={true} 
                />
              ))}
            </div>
            <button onClick={() => setOpenedPack(null)}>Open Another Pack</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packs;