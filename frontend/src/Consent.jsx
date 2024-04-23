import { useNavigate, useLocation } from "react-router-dom";
import { RecConsentYes, RecConsentNo } from "../wailsjs/go/main/App";

function Consent() {
    let files = useLocation().state.filesArr;
    let navigate = useNavigate();
    function handleYes() {
        RecConsentYes().then((f) => {
            navigate("/send/progress", { state: { filesArr: f, transferState: "receive" } });
        });
    }
    function handleNo() {
        RecConsentNo();
        navigate("/");
    }
    return (
        <div className="bg-white text-black h-[100vh]">
            <div className="p-6 flex-none grid grid-col-1 place-items-start">
                <h1 className="text-2xl">Do you want to receive these files?</h1>
                {
                    files.map((file, index) => {
                        return (
                            <p className="ml-4 text-2xl" key={index}>{index}.) {file.name}: {(file.size / 1048576.0).toFixed(2)} MiB</p>
                        )
                    })
                }
                <div className="grid grid-cols-2 gap-4 mt-12">
                    <button onClick={handleYes} className="flex justify-center items-center relative py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 shadow-inner group border border-zinc-900 rounded-lg">
                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-3xl px-2">Yes</span>
                    </button>
                    <button onClick={handleNo} className="flex justify-center items-center relative py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 shadow-inner group border border-zinc-900 rounded-lg">
                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-3xl px-2">No</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Consent;
