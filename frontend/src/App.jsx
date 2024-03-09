import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
    let navigate = useNavigate();
    function handleSend() {
        navigate("/send");
    }
    function handleReceive() {
        navigate("/receive");
    }
    return (
        <div id="App" className='flex flex-col gap-10 bg-zinc-50 h-[100vh]'>
            <div className=''>
                <h1 className='text-6xl mt-5 text-black'>fs-gui</h1>
            </div>
            <div className='flex flex-row gap-4 mx-10'>
                <div className='flex-1 h-72 flex justify-center items-center hover:cursor-pointer border border-zinc-900 rounded-lg'>
                    <a onClick={handleSend} className="h-[100%] flex-1 flex justify-center items-center relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-3xl">Send</span>
                    </a>
                </div>
                <div className='flex-1 h-72 flex justify-center items-center hover:cursor-pointer border border-zinc-900 rounded-lg'>
                    <a onClick={handleReceive} className="h-[100%] flex-1 flex justify-center items-center relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-3xl">Receive</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default App
