import { useState } from 'react';

export default function Accordion ({ title, children }) {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="">
            <div
                className={` ${isOpen ? "open" : ""}`}
                onClick={() => setOpen(!isOpen)}
            >
                {title}
            </div>
            <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
                <div className="accordion-content">{children}</div>
            </div>
        </div>
    );
};