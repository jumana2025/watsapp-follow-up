function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-xl bg-white shadow-xl">
                <div className="flex-shrink-0 flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
