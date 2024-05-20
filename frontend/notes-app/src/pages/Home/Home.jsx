// Este arquivo é onde a page Home é definido.
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
// Abaixo é um componente funcional 
const Home = () => {
    return (
        <>
            <Navbar />

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    <NoteCard 
                        title='Note Title'
                        date='2021-12-12'
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris ut libero.'
                        tags="#tag1 #tag2 #tag3"
                        isPinned={true}
                        onEdit={() => console.log('Edit Note')}
                        onDelete={() => console.log('Delete Note')}
                        onPinNote={() => console.log('Pin Note')}
                    />
                </div>
            </div>

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary-200 hover:bg-primary-300 absolute right-10 bottom-10' onClick={() => {}}>
                <MdAdd className='text-[32px] text-white'/>
            </button>
        </>
    );
};
// Exporta o componente Home
export default Home;