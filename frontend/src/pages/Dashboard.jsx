import React, { useEffect, useState } from "react";
import { verifyToken } from "../api";
import Loader from "../components/DashboardComponets/Loader";
import AttendanceChart from "../components/DashboardComponets/AttendanceChart";

// const AdminDashboard = () => (
//     <div className="bg-gray-100 p-4 rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
//         <ul className="list-disc list-inside space-y-1">
//             <li>Manage Users</li>
//             <li>Manage Roles</li>
//             <li>Settings</li>
//         </ul>
//     </div>
// );

// const ManagerDashboard = () => (
//     <div className="bg-gray-100 p-4 rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-2">Manager Panel</h2>
//         <ul className="list-disc list-inside space-y-1">
//             <li>View Reports</li>
//             <li>Manage Team</li>
//         </ul>
//     </div>
// );

// const UserDashboard = () => (
//     <div className="bg-gray-100 p-4 rounded-xl shadow">
//         <h2 className="text-xl font-bold mb-2">User Panel</h2>
//         <ul className="list-disc list-inside space-y-1">
//             <li>View Profile</li>
//             <li>Update Information</li>
//         </ul>
//     </div>
// );

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }

        verifyToken(token)
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                } else {
                    alert("Invalid token");
                    window.location.href = "/";
                }
            })
            .catch(() => {
                window.location.href = "/";
            });
    }, []);

    if (!user) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <Loader />
            </div>
        );
    }
    // For role based component rendering, uncomment the following code and comment the above code
    // const renderRoleComponent = () => {
    //     switch (user.role_name) {
    //         case "Admin":
    //             return <AdminDashboard />;
    //         case "Manager":
    //             return <ManagerDashboard />;
    //         case "User":
    //             return <UserDashboard />;
    //         default:
    //             return <div>No Components for this Role</div>;
    //     }
    // };

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

                {/* Role based component */}
                {/* <div className="p-4">
                    {renderRoleComponent()}
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
