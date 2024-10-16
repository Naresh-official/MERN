import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="bg-black text-white min-h-screen w-screen overflow-x-hidden">
            <div>Hello Vite + React!</div>
        </div>
    );
}

export default App;
