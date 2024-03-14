// import { useLocation } from "react-router-dom";
function SendDone(props) {
    // const data = useLocation().state;
    return (
        <div className="flex flex-col text-black">
            <h1 className="text-2xl">Overall Stats:</h1>
            <h1 className="text-2xl">Time taken: {props.stat.timeTakenSeconds}</h1>
            <h1 className="text-2xl">Amount: {props.stat.totalAmountTransferred}</h1>
            <h1 className="text-2xl">Speed: {props.stat.averageSpeedMiB}</h1>
        </div>
    )
}
export default SendDone;
