import Loader from "../components/DashboardComponets/Loader";
import AttendanceChart from "../components/DashboardComponets/AttendanceChart";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";



const Dashboard = () => {

    const { user, loading, error } = useUser()

    if (error) {
        toast.error(error.message)
    }

    if (!user || loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-100">
            <div className="flex flex-col min-h-screen">
                {/* Welcome Text */}
                <div className="flex justify-center md:justify-end px-4 py-4">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                        Welcome, {user.name} ({user.role_name})
                    </h1>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[33vh] px-4">
                    <AttendanceChart />
                    <AttendanceChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
