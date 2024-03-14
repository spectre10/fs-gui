import { useEffect, useState } from "react";
import ProgressLine from "./ProgressBar"
import { GetIncrementalStats, GetStats, GetFiles } from "../wailsjs/go/main/App";
import { useNavigate, useLocation } from "react-router-dom";
import SendDone from "./SendDone";

function Progress() {
    const [arr, setArr] = useState([]);
    const [start, setStart] = useState(false);
    const [done, setDone] = useState(false);
    const [stats, setStats] = useState({})
    const [files, setFiles] = useState(useLocation().state);
    GetFiles(files).then((data) => {
        setFiles(data);
    })
    let navigate = useNavigate();

    function handleHome() {
        navigate("/");
    }

    function getStats() {
        GetIncrementalStats().then((data) => {
            if (data.length === 0) {
                setStart((s) => {
                    if (s == true) {
                        let temparr = [{ sent: 1, total: 1 }]
                        for (let i = 0; i < files.length - 1; i++) {
                            temparr.push({ sent: 1, total: 1 })
                        }
                        setArr(temparr);
                        setDone(true);
                        GetStats().then((s) => {
                            setStats(s);
                        })
                    }
                    return s
                })
                return
            }
            setArr(data);
            setStart(true);
        })
    }

    useEffect(() => {
        const interval = setInterval(getStats, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="bg-white h-[100vh] text-black">
            <div className="pt-10 flex">
                <h1 className="text-3xl ml-10 mb-7">Status:
                    {
                        done ? " Disconnected" : " Connected"
                    }
                </h1>
            </div>
            {
                arr.map((file, i) => {
                    return (
                        <div className="flex flex-col justify-center items-center">
                            {
                                (file.sent / 1048576.0).toFixed(2) === (file.total / 1048576.0).toFixed(2) ?
                                    <p className='text-2xl'>Sending {files[i]}: Done!</p> :
                                    <p className='text-2xl'>Sending {files[i]}: {(file.sent / 1048576.0).toFixed(2)} / {(file.total / 1048576.0).toFixed(2)} MiB</p>
                            }
                            <ProgressLine animate={file} key={i} />
                        </div>
                    )
                })
            }
            {
                done && <SendDone stat={stats} />
            }
            <button onClick={handleHome} className="bg-cyan-100">
                Home
            </button>
        </div>
    )
}

export default Progress;
