import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <h1>Vite + React</h1>
            <div className="justfy-center flex items-center">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
