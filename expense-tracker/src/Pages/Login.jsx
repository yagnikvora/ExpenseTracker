import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {

  const { storeTokenInLS, storeUserInLS, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: '',
    PasswordHash: '',
  });

  const [touched, setTouched] = useState({
    Email: false,
    PasswordHash: false,
  });

  const [errors, setErrors] = useState({
    Email: '',
    PasswordHash: '',
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'Email':
        return value.trim() ? '' : 'Email is required';
      case 'PasswordHash':
        return value ? (value.length >= 6 ? '' : 'PasswordHash must be at least 6 characters long') : 'PasswordHash is required';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (touched[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const touchedAll = Object.fromEntries(
      Object.keys(touched).map(key => [key, true])
    );
    setTouched(touchedAll);

    const newErrors = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, validateField(key, value)])
    );
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === '')) {

      const response = await fetch("http://localhost:5000/api/Users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        storeUserInLS(responseData.user);
        storeTokenInLS(responseData.token);
        setFormData({ Email: '', PasswordHash: '' });
        setTouched({ Email: false, PasswordHash: false });
        setErrors({ Email: '', PasswordHash: '' });
        navigate("/dashboard")
      }
      else{
        toast.error(responseData.message)
      }

    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />
  }
  else {
    return (
      <div className="container-fluid">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3 w-100">
                  <div className="card-body">

                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login an Account</h5>
                      <p className="text-center small">Enter your personal details to create account</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                      <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                          id="Email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="PasswordHash" className="form-label">Password <span className="text-danger">*</span></label>
                        <input
                          type="password"
                          className={`form-control ${errors.PasswordHash ? 'is-invalid' : ''}`}
                          id="PasswordHash"
                          name="PasswordHash"
                          value={formData.PasswordHash}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.PasswordHash && <div className="invalid-feedback">{errors.PasswordHash}</div>}
                      </div>

                      <div className="mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id="acceptTerms"
                          name="acceptTerms"
                        />
                        <label className="form-check-label" htmlFor="acceptTerms">Remember Me</label>
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Login</button>
                      </div>

                      <div className="col-12 my-1">
                        <p className="small mb-0">Don't have any account? <Link to="/signup" >Sign Up</Link></p>
                      </div>

                    </form>
                  </div>
                </div>


              </div>
            </div>
          </div>

        </section>

      </div>
    );
  }
}

export default Login;