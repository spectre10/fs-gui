import { ClipboardSetText } from "../wailsjs/runtime/runtime"
import { RecConnect, RecGetMetadata } from "../wailsjs/go/main/App";
import clipboard from './assets/images/clipboard.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Receive() {
    let [sdpstate, setSdp] = useState("");
    let navigate = useNavigate();
    function generateSDP(e) {
        e.preventDefault();
        console.log("hello");
        RecConnect(e.target.sdp.value).then((sdp) => {
            console.log(sdp);
            setSdp(sdp)
            RecGetMetadata().then((files) => {
                navigate("/receive/consent", { state: { filesArr: files } })
            })
        })
    }
    function copy() {
        ClipboardSetText(sdpstate)
    }
    return (
        <div className="flex flex-col bg-white h-[100vh] text-black">
            <form id="form1" onSubmit={generateSDP} className="flex flex-col h-[50vh] mt-8">
                <h1 className="text-2xl">Paste the sender's code:</h1>
                <textarea name="sdp" id="" className="bg-gray-200 p-6" rows={12}>
                </textarea>
                <button type="submit" className="flex justify-center items-center relative py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 shadow-inner group">
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-2xl">Generate Your Code</span>
                </button>
            </form>
            <div className="flex-none grid grid-col-1 gap-0 items-center relative group">
                <h1 className="text-2xl">Copy and send this code to the receiver:</h1>
                <textarea className="bg-gray-200 p-6 flex-1" rows={8} value={sdpstate} readOnly>
                </textarea>
                <button onClick={copy}><img src={clipboard} alt="copy" className="h-[1.5em] hidden absolute right-2 top-10 group-hover:block" /></button>
            </div>
        </div>
    )
}

export default Receive;
