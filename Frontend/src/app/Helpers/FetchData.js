const FetchData = async () => {
    try {
        const response = await fetch('http://localhost:3030/data?district=bengaluru', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error;
        }
        const records = response.json();
        return records
    } catch (error) {
        console.log(error)
    }
}

export default FetchData;