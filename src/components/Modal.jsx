import React from 'react'

export default function Modal(props) {
    const { handleSubmit, inputValue, handleChange, closeModal } = props

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Edit Todo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Edit your todo"
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                    />
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
