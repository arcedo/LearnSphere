import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MyButton from '../components/MyButton';
export default function Settings() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const pullSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const exampleList = [
        {
            id: 1,
            title: "Account",
        },
        {
            id: 2,
            title: "Students",
        },
        {
            id: 3,
            title: "Skills",
        }
    ];
    return (
        <div>
            <Header title={'Settings'}/>
            <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={exampleList} />
                <MyButton onButtonClick={pullSidebar} />
            </section>
        </div>
        
    );
}