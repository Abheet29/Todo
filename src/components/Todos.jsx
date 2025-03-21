import React from 'react'

export default function Todos(props) {
    const { todo, index, onEdit, onDelete } = props;

    return (
        <li key={index} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
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
