import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({noteData, type, getAllNotes, onClose, showToastMessage}) => {

    const [title, setTitle] = useState(noteData?.title || ""); // Define o estado title com o método setTitle e inicializa com o valor de noteData.title ou uma string vazia
    const [content, setContent] = useState(noteData?.content || ""); // Define o estado content com o método setContent e inicializa com o valor de noteData.content ou uma string vazia
    const [tags, setTags] = useState(noteData?.tags || []);// Define o estado tags com o método setTags e inicializa com o valor de noteData.tags ou um array vazio 

    const [error, setError] = useState(null);

    const addNewNote = async () => {
        try{
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            });

            if(response.data && response.data.note) {
                showToastMessage("Nota adicionada com sucesso");
                getAllNotes();
                onClose();
            }
        } catch(error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const editNote = async () => {
        const noteId = noteData._id;
        try{
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags
            });

            if(response.data && response.data.note) {
                showToastMessage("Nota editada com sucesso");
                getAllNotes();
                onClose();
            }
        } catch(error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () => {
        if(!title || !content) {
            setError("All fields are required");
            return;
        }
        setError("");

        if(type === "edit") {
            editNote()
        } else {
            addNewNote();
        }
    }


    return (
        <div className="relative">
            <button
            className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
            onClick={onClose}>
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TÍTULO</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="To gym at 3"
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris ut libero."
                    rows={10}
                    value={content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
                {type === 'edit' ? 'EDITAR' : 'ADICIONAR'}
            </button>
        </div>
    )
}

export default AddEditNotes;