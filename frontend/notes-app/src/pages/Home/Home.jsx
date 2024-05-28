// Este arquivo é onde a page Home é definido.
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import moment from 'moment';
import AddEditNotes from './AddEditNotes';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
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

    const [showToastMsg, setShowToastMsg] = useState({
        isShow: false,
        message: '',
        type: "add",
    })

    const [allNotes, setAllNotes] = useState([]); // Define o estado allNotes com o método setAllNotes
    const [userInfo, setUserInfo] = useState({}); // Define o estado userInfo com o método setUserInfo

    const navigate = useNavigate();

    // Define a função handleEdit que recebe noteDetails como parâmetro e chama setOpenAddEditModal com o objeto {isShow: true, data: noteDetails, type: 'edit'}
    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({
            isShow: true,
            data: noteDetails,
            type: 'edit',
        });
    }

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShow: true,
            message,
            type,
        });
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShow: false,
            message: '',
        });
    }

    // get user info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    }

    // get todas as notas
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");

            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Deletar nota
    const deleteNote = async (data) => {
        const noteId = data._id;
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId);

            if (response.data && !response.data.error) {
                showToastMessage("Nota deletada com sucesso", 'delete');
                getAllNotes();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                console.log(error.response.data.message);
            }
        }
    }
        

    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {

        }
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8 ml-5'>
                    {allNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEdit(item)}// Define a função onEdit que chama a função handleEdit com o parâmetro item
                            onDelete={() => deleteNote(item)}
                            onPinNote={() => console.log('Pin Note')}
                        />
                    ))}
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
                <MdAdd className='text-[32px] text-white' />
            </button>

            <Modal
                isOpen={openAddEditModal.isShow}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
                contentLabel=''
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({
                            isShow: false,
                            type: 'add',
                            data: null,
                        });
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal>

            <Toast
                isShow={showToastMsg.isShow}
                message={showToastMsg.message}
                type={showToastMsg.type}
                onClose={handleCloseToast}
            />
        </>
    );
    // Retorna o JSX com o Navbar, NoteCard e o botão de adicionar nota com o Modal
    //Modal é um componente que exibe conteúdo sobre um fundo escurecido. É útil para exibir conteúdo adicional em um espaço pequeno, sobreposto ao conteúdo existente.
};
// Exporta o componente Home
export default Home;