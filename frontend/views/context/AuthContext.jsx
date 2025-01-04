import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import getBEURL from "../utils/backendURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvide = ({children}) => {
    // const [currUser, setCurrUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const regUser = async (username, email, password) => {
        const response = await axios.post(`${getBEURL()}/api/users/create-user`, {
            username: username,
            email: email,
            password: password,
        }, {
            headers: {
                "Content-Type": 'application/json',
            }
        }).catch((error) => {
            if(error.response.status === 400) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Email đăng ký đã được sử dụng",
                    showConfirmButton: true,
                    timer: 1500
                });
            }
            else if(error.response.status === 500) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Lỗi đăng ký tài khoản",
                    showConfirmButton: true,
                    timer: 1500
                });
            }
            navigate("/");
        })

        const user = response.data;
        return user.user;
    }
    const logInUser = async (email, password) => {
        const response = await axios.post(`${getBEURL()}/api/users/log-in`, {
            email: email,
            password: password,
        }, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
                .catch((error) => {
                    if(error.response.status === 400) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Không tìm thấy tài khoản",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                    else if(error.response.status === 401) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Password không đúng",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                    else if(error.response.status === 500) {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Email và mật khẩu không đúng",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                    navigate("/");
                })
        const user = response?.data;
        
        if(user?.user) {
            sessionStorage.setItem('user', JSON.stringify(user.user));
            if(user.token) {
                localStorage.setItem('token', user.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert("Phiên làm việc của bạn đã kết thúc")
                    navigate("/")
                }, 3600 * 1000)
                navigate("/admin");
            }
            navigate("/user");
        }
        // console.log(currUser);
        return user?.user?._id;
    }
    const logOutUser = async () => {
        sessionStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    // The same for login + logout
    useEffect(() => {
        // DO SOMETHING HERE
    }, [])
    const value = {
        loading,
        regUser,
        logInUser,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}