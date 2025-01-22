import React from 'react'

export default function Todos(props) {
    const { todo, index, onEdit, onDelete } = props;

    return (
        <li key={index} className="flex justify-between items-center border p-2 rounded">
            {todo}
            <div className="space-x-2">
                <button
                    onClick={() => onEdit(index)}
                    className="text-blue-500 hover:underline"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(index)}
                    className="text-red-500 hover:underline"
                >
                    Delete
                </button>
            </div>
        </li>
    )
}
