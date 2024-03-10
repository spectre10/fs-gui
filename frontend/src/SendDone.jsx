import { useLocation } from "react-router-dom";
function SendDone() {
    const data = useLocation().state;
    return (
        <div className="flex flex-col text-black">
            <h1 className="text-2xl">Stats:</h1>
            <h1 className="text-2xl">Time taken: {data.timeTakenSeconds}</h1>
            <h1 className="text-2xl">Amount: {data.totalAmountTransferred}</h1>
            <h1 className="text-2xl">Speed: {data.averageSpeedMiB}</h1>
        </div>
    )
}
export default SendDone;
