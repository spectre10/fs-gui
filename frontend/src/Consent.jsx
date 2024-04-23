import { useNavigate, useLocation } from "react-router-dom";

function Consent() {
    let files = useLocation().state.filesArr;

    return (
        <div className="bg-white text-black h-[100vh]">
            <div className="p-6 flex-none grid grid-col-1 place-items-start">
                <h1 className="text-2xl">Do you want to receive these files?</h1>
                {
                    files.map((file, index) => {
                        return (
                            <p className="ml-4 text-2xl" key={index}>{index}.) {file}</p>
                        )
                    })
                }
        
            </div>
        </div>
    );
}

export default Consent;
