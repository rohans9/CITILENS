import FilterFrom from "./FilterForm"
import Buttons from "./Buttons"
export default function Base({ children }) {
    return (
        <>
            <div className="grid gap-2 p-1 lg:grid-cols-12" style={{
                backgroundImage: "radial-gradient(circle at right 1000px,rgba(119, 90, 250, 0.2) 20%, black 80%,black 100%)",
            }}>
                <div className="min-h-[7vh]   lg:col-span-12"><span></span></div>
                <div className="min-h-[70vh] rounded-lg border-4 border-purple-500 lg:col-span-8">
                    {children}
                </div>
                <div className="min-h-[25vh] rounded-lg bg-gray-500 backdrop-filter backdrop-blur-md bg-opacity-20 lg:col-span-4 p-5 flex flex-col justify-around gap-3">
                    <FilterFrom />
                </div>
                <div className="min-h-[18vh] rounded-lg  lg:col-span-12 grid gap-2 lg:grid-cols-12 p-4">
                    <div className="bg-gray-500 lg:col-span-3 rounded-lg min-h-[100px]">
                        <Buttons title='Graphs and Charts' />
                    </div>
                    <div className="bg-gray-500 lg:col-span-3 rounded-lg min-h-[100px]">
                        <Buttons title='AI based Deployment' />
                    </div>
                    <div className="bg-gray-500 lg:col-span-3 rounded-lg min-h-[100px]">
                        <Buttons title='AI based Prediction' />
                    </div>
                    <div className="bg-gray-500 lg:col-span-3 rounded-lg min-h-[100px]">
                        <Buttons title='Import/Export Data' />
                    </div>
                </div>
            </div>
        </>
    )
}