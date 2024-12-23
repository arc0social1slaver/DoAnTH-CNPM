import PropTypes from 'prop-types';
const CustomForm = ({isOpen, closeModal, fields, formSubmit}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-colors-white p-6 rounded-lg w-96">
            <h2 className="text-green-700 text-4xl font-semibold text-center mb-4">ThriftMate</h2>
            <form onSubmit={formSubmit}>
                {
                    fields.map((item) => (
                        <div className="mb-6" key={item.id}>
                    {
                        item.type != "hidden" ? (
                            <label htmlFor={item.id} className="block capitalize">{item.id}</label>
                        ) : (<></>)
                    }
                    <input
                        type={item.type}
                        id={item.id}
                        className="w-full px-4 py-2 mt-2 border border-colors-gray-400 rounded-lg"
                        value={item.value}
                        onChange={(e) => item.handler(e.target.value)}
                        placeholder={item.placeholder}
                        required
                    />
                    </div>
                    ))
                }
                
                <button
                    type="submit"
                    className="w-full py-2 bg-green-100  rounded-lg hover:bg-green-700"
                >
                    Gửi
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Đóng
                </button>
            </form>
        </div>
    </div>
    )
};
CustomForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};
export default CustomForm;