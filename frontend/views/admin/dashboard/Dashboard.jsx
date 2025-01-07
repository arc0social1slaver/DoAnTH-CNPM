import { useEffect, useState } from "react";
import Card from "./Cards";
import DataTable from "./Table";
import axios from "axios";
import getBEURL from "../../utils/backendURL";
import Loading from "../../pages/Loading";

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBEURL()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          }
        })
        // console.log(response.data);
        
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setData('N/A');
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) return <Loading/>;
  return (
    <div className="bg-colors-white h-screen overflow-y-scroll">
      <h1 className="p-5 m-5 text-4xl font-bold text-colors-green-700">Bảng điều khiển</h1>
      
      {/* Cards container with responsive flex direction */}
      <div className="flex flex-col md:flex-row gap-7 m-5 items-center">
        <Card
          icon="users"
          title="Tổng số người dùng"
          proportion={data === "N/A" ? "N/A" : data.user?.length === 0 || data.users === 0 ? 0 : (data.user[0].count / data.users * 100).toFixed(0)}
          number={data === "N/A" ? "N/A" : data.user?.length === 0 ? 0 : data.user[0].count}
        />
        <Card
          icon="transaction"
          title="Tổng số giao dịch"
          proportion={data === "N/A" ? "N/A" : data.order?.length === 0 || data.orders === 0 ? 0 : (data.order[0].count / data.orders * 100).toFixed(0)}
          number={data === "N/A" ? "N/A" : data.order?.length === 0 ? 0 : data.order[0].count}
        />
        <Card
          icon="inventory"
          title="Tổng số sản phẩm"
          proportion={data === "N/A" ? "N/A" : data.product?.length === 0 || data.products === 0 ? 0 : (data.product[0].count / data.products * 100).toFixed(0)}
          number={data === "N/A" ? "N/A" : data.product?.length === 0 ? 0 : data.product[0].count}
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
