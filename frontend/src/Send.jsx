import filesave from "./assets/images/filesave.png";
import { OpenFilePicker, GetSDP } from "../wailsjs/go/main/App";
import { useNavigate } from "react-router-dom";

function Send() {
    let navigate = useNavigate();
    function handle() {
        OpenFilePicker().then((result) => {
            GetSDP(result.length, result).then((sdpres) => {
                // setSuccess(true);
                navigate("/send/sdp", { state: { filesArr: result, sdpprop: sdpres } });
            })
        })
    }
    return (
        <>
            <div className="h-[100vh] bg-red-600 flex justify-center items-center">
                <span name="span" className="border-2 border-dashed p-1 h-[calc(100vh-100px)] w-[calc(100vw-100px)] flex flex-col justify-center items-center hover:cursor-pointer" onClick={handle}>
                    <img src={filesave} className="h-[10vh]" alt="error" />
                    <p className="text-2xl border-12">Add files to send</p>
                </span>
            </div>
        </>
    )
}

export default Send;
