const fetchProfiles = async (query) => {
    try {
        const response = await fetch(`/autocomplete?q=${query}`);
        console.log("response:", response);
        if (!response.ok) {
            throw new Error('Error fetching autocomplete data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export default fetchProfiles;
