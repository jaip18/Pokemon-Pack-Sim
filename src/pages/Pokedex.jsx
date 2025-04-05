import React, { useState, useEffect } from "react";
import { fetchAllSets, fetchPack, fetchSet } from "../assets/api"; 
import Card from "../components/Card";
import "../css/pokedex.css"
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import Set from "../components/Set";

const Pokedex = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openedSet, setOpenedSet] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [setName, setSetName] = useState("");
  const [filteredList, setfilteredList] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);


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
    setSetName(selectedPack.name);
    
    try {
      const pack = await fetchSet(selectedPack.id);
      setOpenedSet(pack);
      
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
  
  if (loading && setName) return <Loading text={setName}/>;
  if (loading) return <Loading text="Set"/>;

  return (
    <div className="pokedex-container">
      {/* Add this separate header fade element */}
      <div className="pokedex-header-fade"></div>
      
      <div className="pokedex-header">
        <h1> Pokedex </h1>
        <SearchBar 
          onSearch={handleSearch} 
          onReset={resetSearch} 
          isSearching={isSearching} 
          searchtype="Sets"
        />
      </div>
      
      <div className={`pokedex-set-container ${(openedSet || selectedPack) ? "pokedex-blur-background" : ""}`}>
        {!isSearching 
          ? sets.slice().reverse().map((set) => (
              <Set 
                key={set.id} 
                set={set} 
                onOpen={() => selectPack(set)}
              /> 
            ))
          : filteredList.slice().reverse().map((set) => (
              <Set 
                key={set.id} 
                set={set} 
                onOpen={() => selectPack(set)}
              /> 
            ))
        }
      </div>

      {selectedPack && (
        <div className="pokedex-set-overlay" onClick={closeSelectedPack}>
          <Set 
            set={selectedPack}
            onOpen={openSelectedPack}
            isCentered={true}
          />
        </div>
      )}

      {openedSet && (
        <div className="pokedex-set-opening-overlay">
          <div className="pokedex-set-opening">
          <button onClick={() => setOpenedSet(null)}>
          <span className="material-symbols-outlined">undo</span>
          </button>
              <div className="pokedex-cards-container">
                {openedSet.map((card) => (
                  <Card 
                    key={card.id} 
                    card={card} 
                    style={{ 
                      display: 'flex',
                      flex: '0 0 auto'   
                    }}
                    flipped={false}/>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;