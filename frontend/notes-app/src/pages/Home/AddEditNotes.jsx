import React from "react";

const AddEditNotes = () => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                <label className="input-label">TÍTULO</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="To gym at 3"
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris ut libero."
                    rows={10}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput />
            </div>

            <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
                ADD
            </button>
        </div>
    )
}

export default AddEditNotes;