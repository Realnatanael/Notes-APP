// Este arquivo é onde a page Home é definido.
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
// Abaixo é um componente funcional 
const Home = () => {
    // Define o estado openAddEditModal com o método setOpenAddEditModal
    const [openAddEditModal, setOpenAddEditModal] = useState({ 
        // useState é um hook que permite adicionar o estado do React a um componente funcional ele retorna um array com dois elementos: a variável de estado e a função que atualiza essa variável
        // Um hook é uma função especial que permite que você use recursos do React. Por exemplo, o useState é um hook que permite adicionar o estado do React a um componente funcional.
        isShow: false,
        type: 'add',
        data: null,
    });

    return (
        <>
            <Navbar />

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8 ml-5'>
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

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary-200 hover:bg-primary-300 absolute right-10 bottom-10' 
            onClick={() => {
                setOpenAddEditModal({
                    isShow: true,
                    type: 'add',
                    data: null,
                });
            }}>
                <MdAdd className='text-[32px] text-white'/>
            </button>
            
            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
                contentLabel=''
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes/>
            </Modal>
        </>
    );
    // Retorna o JSX com o Navbar, NoteCard e o botão de adicionar nota com o Modal
    //Modal é um componente que exibe conteúdo sobre um fundo escurecido. É útil para exibir conteúdo adicional em um espaço pequeno, sobreposto ao conteúdo existente.
};
// Exporta o componente Home
export default Home;