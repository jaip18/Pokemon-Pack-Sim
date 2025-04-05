const API_KEY = '8f467b82-4c4a-4846-bd0b-791c22e210cf'
const BASE_URL = 'https://api.pokemontcg.io/v2'

export const fetchAllSets = async (page = 1, pageSize = 20) =>{
    try{
        const response = await fetch (`${BASE_URL}/sets`, 
        {headers: { "X-Api-Key": API_KEY },})
        const data = await response.json()
        return data.data || []
    }
    catch (error){
        console.log('Error fetching sets:', error)
        return []
    }
}

export const fetchPokedex = async () => {
    try{
        const response = await fetch(`${BASE_URL}/cards?q=supertype:Pokémon&select=id,name,types,hp,images`, {
            headers: { "X-Api-Key": API_KEY },
        }) 
        const data = await response.json()   

        return data.data || []
    }
    catch (error) {
        console.error('Error fetching Pokédex:', error)
        return []
    }
}

export const fetchSet = async (setId) =>{
    try {
        const response = await fetch(`${BASE_URL}/cards?q=set.id:${setId}`, {
        headers: { "X-Api-Key": API_KEY },
    })

    const data = await response.json()
    return data.data || []}
    catch (error) {
        console.error('Error fetching cards:', error)
        return []
    }
} 

export const fetchPack = async (setId) => {
    try{const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&select=id,name,images`, {
        headers: { "X-Api-Key": API_KEY },
    })
    const data = await response.json()

    return data.data.sort(() => Math.random() - 0.5).slice(0, 10);}
    catch (error) {
        console.error('Error fetching packs:', error)
        return []
    }
}

export const searchCard = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/cards?q=supertype:Pokémon name:*${query}*&select=id,name,types,hp,images`,
            {
                headers: { "X-Api-Key": API_KEY },
            }
        );
        const data = await response.json();
        
        return data.data.filter(card => card.images && card.images.small && !card.images.small.includes("back"));
        
    } catch (error) {
        console.error("Error searching for Pokémon:", error);
        return [];
    }
};



