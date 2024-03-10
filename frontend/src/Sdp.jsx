import { Connect, GetStats } from "../wailsjs/go/main/App";
import { useNavigate, useLocation } from "react-router-dom";

function Sdp() {
    let navigate = useNavigate();
    let data = useLocation().state;
    function submitSDP(e) {
        e.preventDefault();
        Connect(e.target.sdp.value).then(() => {
            GetStats().then((stats) => {
                navigate("/send/senddone", { state: stats });
            })
        })
    }

    function handleBack() {
        navigate("/Send");
    }
    return (
        <div className="flex flex-col bg-white h-[100vh] text-black">
            <button className="" onClick={handleBack}>go back</button>
            <div className="border border-sky-900 bg-cyan-50 p-12 flex-none">
                <h1 className="text-2xl">Files to send:</h1>
                {
                    data.filesArr.map((file, index) => {
                        return (
                            <div key={index} className="flex justify-left items-center">
                                <p className="text-2xl">{file}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex-auto flex flex-col">
                <h1 className="text-2xl">SDP:</h1>
                <textarea className="flex-1 border border-sky-900 bg-cyan-50 p-12" value={data.sdpprop} readOnly></textarea>
            </div>
            <form onSubmit={submitSDP} className="flex flex-col bg-cyan-900 h-[50vh]">
                <textarea name="sdp" id="" className="bg-cyan-400 text-4xl" rows={5}>
                </textarea>
                <button className="border-4 border-black" type="submit">
                    Connect
                </button>
            </form>
        </div>
    )
}

export default Sdp;
