const Checkout = () => {
    const shippingAddress = "123 Đường ABC, Quận 1, TP.HCM";

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="w-full bg-colors-white text-green-700 py-4">
                <h1 className="text-center text-xl font-bold">
                    ThriftMate | Thanh toán
                </h1>
            </div>

            {/* Nội dung chính */}
            <div className="container mx-auto mt-8 px-4">
                {/* Địa chỉ nhận hàng */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Địa chỉ nhận hàng
                    </h2>
                    <p className="text-gray-700">{shippingAddress}</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
