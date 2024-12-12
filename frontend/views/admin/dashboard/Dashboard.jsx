import Card from "./Cards";
import DataTable from "./Table";

const AdminDashboard = () => {
  return (
    <div className="bg-colors-white h-screen overflow-y-scroll">
      <h1 className="p-5 m-5 text-4xl font-bold text-colors-green-700">Bảng điều khiển</h1>
      
      {/* Cards container with responsive flex direction */}
      <div className="flex flex-col md:flex-row gap-7 m-5 items-center">
        <Card
          icon="users"
          title="Tổng số người dùng"
          proportion={80 || "N/A"}
          number={"N/A"}
        />
        <Card
          icon="transaction"
          title="Tổng số giao dịch"
          proportion={70 || "N/A"}
          number={"N/A"}
        />
        <Card
          icon="inventory"
          title="Tổng số sản phẩm"
          proportion={60 || "N/A"}
          number={"N/A"}
        />
      </div>

      <h2 className="p-5 m-5 text-2xl font-bold text-colors-emerald-500">Giao dịch gần đây</h2>
      
      {/* DataTable */}
      <div className="m-5">
        <DataTable />
      </div>
    </div>
  );
}

export default AdminDashboard;
