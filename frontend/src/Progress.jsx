import { useEffect, useState } from "react";
import ProgressLine from "./ProgressBar"
import { GetIncrementalStats, GetStats } from "../wailsjs/go/main/App";

function Progress() {
    const [progress, setProgress] = useState(0.0);
    const [sent, setSent] = useState(0);
    const [total, setTotal] = useState(0);
    const [start, setStart] = useState(false);

    function getStats() {
        GetIncrementalStats().then((data) => {
            if (data.length === 0) {
                console.log("no data")
                setStart((s) => {
                    if (s == true) {
                        setProgress(p => {
                            // GetStats().then((stats) => {
                            //     navigate("/send/senddone", { state: stats });
                            // })
                            return 1.0
                        })
                    }
                    return s
                })
                return
            } else {
                console.log(data)
            }
            setProgress(p => {
                if (p >= 1.0) {
                    GetStats().then((stats) => {
                        navigate("/send/senddone", { state: stats });
                    })
                    return 1.0
                }
                return data[0].sent / data[0].total
            })
            setStart(true)
        })
    }

    useEffect(() => {
        const interval = setInterval(getStats, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <h1 className="text-black text-3xl">here: {sent}/{total}</h1>
            <ProgressLine animate={progress} />
        </>
    )
}

export default Progress;
