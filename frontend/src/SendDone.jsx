function SendDone(props) {
    return (
        <div className="flex flex-col text-black">
            <h1 className="text-2xl">Overall Stats:</h1>
            <h1 className="text-2xl">Time taken: {props.stat.timeTakenSeconds}</h1>
            <h1 className="text-2xl">Total Amount: {props.stat.totalAmountTransferred}</h1>
            <h1 className="text-2xl">Average Speed: {props.stat.averageSpeedMiB}</h1>
        </div>
    )
}
export default SendDone;
