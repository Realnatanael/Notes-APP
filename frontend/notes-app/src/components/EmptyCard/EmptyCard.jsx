import React from "react";

const EmptyCard = () => {
    return (
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">Nenhuma nota encontrada</h6>
                    <span className="text-xs text-slate-500">Crie uma nova nota para iniciar...</span>
                </div>
            </div>
        </div>
    )
}

export default EmptyCard;