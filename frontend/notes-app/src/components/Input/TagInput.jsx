import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({tags, setTags}) => {

    const [inputValue, setInputValue] = useState("");
    // Define a função handleAddTag que adiciona uma tag ao array de tags, essa função é chamada quando o botão de adicionar tag é clicado (handle significa manipular em inglês, ou seja, manipula a adição de tags)
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    // Define a função addNewTag que adiciona uma nova tag ao array de tags, essa função é chamada quando o botão de adicionar tag é clicado ela verifica se o valor do input não está vazio e adiciona a tag ao array de tags
    const addNewTag = () => {
        //trim() remove os espaços em branco do início e do fim de uma string
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }
    // Define a função handleKeyDown que adiciona uma nova tag ao array de tags quando a tecla Enter é pressionada, essa função é chamada quando a tecla Enter é pressionada
    const hanlekeydown = (e) => {
        if(e.key === 'Enter'){
            addNewTag();
        }
    }
    // Define a função handleRemoveTag que remove uma tag do array de tags, essa função é chamada quando o botão de remover tag é clicado
    const handleRemoveTag = (tagRemove) => {
        setTags(tags.filter((tag) => tag !== tagRemove));
    };

    return (
        <div>

            {tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
                        # {tag}
                        <button onClick={() => {handleRemoveTag(tag)}}>
                            <MdClose />
                        </button>
                    </span>
                ))}
            </div>
            )}

            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    value={inputValue}
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none "
                    placeholder="Add tags"
                    onChange={handleInputChange}
                    onKeyDown={hanlekeydown}
                />
                <button className="w-8 h-8 flex items-center justify-center rounded border border-primary-200 hover:bg-primary-300"
                onClick={() => {addNewTag()}}>
                    <MdAdd className="text-2xl text-primary-200 hover:text-white" />
                </button>
            </div>
        </div>
    )
}

export default TagInput;