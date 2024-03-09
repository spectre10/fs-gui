import { Connect } from "../wailsjs/go/main/App";
import { useNavigate, useLocation } from "react-router-dom";

function Sdp() {
    let navigate = useNavigate();
    let data = useLocation().state;
    function submitSDP(e) {
        e.preventDefault();
        Connect(e.target.sdp.value);
    }

    function handleBack() {
        navigate("/Send");
    }
    return (
        <>
            <div className="flex flex-col">
                <button className="" onClick={handleBack}>go back</button>
                <div className="border border-sky-900 bg-cyan-50 text-black p-12 flex-auto">
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
                <div className="flex-auto">
                    <h1 className="text-2xl">SDP:</h1>
                    <textarea className="border border-sky-900 bg-cyan-50 text-black p-12" value={data.sdpprop} readOnly></textarea>
                </div>
                <form onSubmit={submitSDP} className="flex flex-col">
                    <textarea name="sdp" id="" className="text-black">
                    </textarea>
                    <button type="submit">
                        Connect
                    </button>
                </form>

            </div>
        </>
    )
}

export default Sdp;
