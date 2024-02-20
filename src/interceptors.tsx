import axios from "axios";

const interceptor = () => {
    const baseurl = process.env.REACT_APP_BASEURL;
    const token=process.env.REACT_APP_REFRESHTOKEN
    axios.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                config.headers['ngrok-skip-browser-warning'] = 'true ';
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            try {
                if (error.response.status === 401) {
                    await axios({
                        method: "post",
                        url: `${baseurl}${token}`,
                        data: {
                            refreshToken: refreshtoken,
                        },
                    })
                        .then(response => {
                            console.log(response.data.refreshToken, "refreshToken");
                            localStorage.setItem("accessToken", response.data.accessToken)
                        })
                        .catch(err => {
                            console.log(err);

                        })
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    );
}
export default interceptor;