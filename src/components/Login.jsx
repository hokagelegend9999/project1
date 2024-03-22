import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import bannerImage from "../linuxw.jpg"; // Ubah path sesuai struktur proyek Anda
import "./Login.css"; // Import file CSS untuk penyesuaian tambahan

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  const handleRegister = () => {
    navigate("/register"); // Mengarahkan ke rute "/register" saat tombol register diklik
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container" style={{ marginBottom: "2px" }}>
          <div className="columns is-centered">
            <div className="column is-15">
              <div className="columns">
              <div className="banner-container">
                <img src={bannerImage} alt="Banner" className="banner" />
              </div>
                <div className="column"  >
                  <form onSubmit={Auth} className="box">
                    {isError && <p className="has-text-centered">{message}</p>}
                    <h1 className="title is-2" style={{ fontFamily: 'hanzel' }}>Sign In</h1>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          type="text"
                          className="input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          type="password"
                          className="input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="******"
                        />
                      </div>
                    </div>
                    <div className="field mt-5">
                      <button
                        type="submit"
                        className="button is-success is-fullwidth"
                        disabled={isLoading} // Tambahkan disabled jika sedang loading
                      >
                        {isLoading ? "Loading..." : "Login"}
                      </button>
                    </div>
                    <div className="field">
                      <button
                        className="button is-primary is-outlined is-fullwidth"
                        onClick={handleRegister} // Mengarahkan ke rute "/register" saat tombol register diklik
                      >
                        Register
                      </button>
                    </div>
                    <div className="field">
                      <button
                        className="button is-text is-fullwidth"
                      >
                        Forgot Password
                      </button>
                    </div>
                    {isError && isError.status === 'inactive' && (
                      <div className="field">
                        <p className="has-text-centered">Akun Anda tidak aktif. Silakan hubungi admin untuk aktivasi akun.</p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
