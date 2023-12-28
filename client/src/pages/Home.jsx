import Header from '../components/Header';
import Skills from '../components/Skills';
import { useState } from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

function isLogged() {
    return localStorage.getItem('loggedUser') ? true : false;
}


function Home() {
    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    if (!isLogged()) {
        window.location.href = "/login";
    } else {
        return (
            <div>
                <Header />
                <section id="home" className="w-full text-white">
                    <div className='w-10/12 mx-auto'>
                        <h4 className='font-sora text-4xl font-extrabold'>Project1</h4>
                        <div className='flex items-center gap-3 flex-wrap w-1/2 pt-5 pb-5'>
                            <Skills skillName='HTML' globalPercentage='50%' />
                            <Skills skillName='HTML' globalPercentage='50%' />
                        </div>
                        <Accordion className='border-2 border-white rounded-2xl'>
                            <AccordionHeader >
                                <div className='flex px-5 justify-between items-center text-white'>
                                    <h5>Activitat 1</h5>
                                </div>
                            </AccordionHeader>
                            <AccordionBody>
                                <div className='flex justify-between items-center px-5 text-white'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloribus.</p>
                                    <button className='bg-white text-black rounded-2xl px-3 py-1'>Veure</button>
                                </div>
                            </AccordionBody>
                        </Accordion>
                    </div>

                </section>
            </div>
        );
    }
};

export default Home;