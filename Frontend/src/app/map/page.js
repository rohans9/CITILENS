import Map from "../Components/Map"
import FetchData from "../Helpers/FetchData"
import Base from "../Components/Base";
export default async function Page() {
    const records = await FetchData();
    return (
        <>
            <Base>
                <Map records={records}/>
            </Base>

        </>
    )
}