import React, { useState, useEffect } from "react";
import "../css/loading.css";

function Loading({ text }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 100); // ✅ Delays fade-in effect
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`loading-container ${visible ? "fade-in" : ""}`}>
            <img 
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnA3Z3dqejM0Z2p1Z3VuZ3RxbDdyejI0MXo3aXBnaG10NmQ5bmp2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/eJ3mWeALMqorzzI7Ze/giphy.gif" 
                alt="Loading..." 
                className="loading-gif"
            />
            <p> Loading {text}...</p>
        </div>
    );
}

export default Loading;
