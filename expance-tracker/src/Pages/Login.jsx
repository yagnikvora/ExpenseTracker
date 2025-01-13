import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () =>{
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const [touched, setTouched] = useState({
        username: false,
        password: false,
      });
    
      const [errors, setErrors] = useState({
        username: '',
        password: '',
      });
    
      const validateField = (name, value) => {
        switch (name) {
          case 'username':
            return value.trim() ? '' : 'Username is required';
          case 'password':
            return value ? (value.length >= 6 ? '' : 'Password must be at least 6 characters long') : 'Password is required';
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
    
      const handleSubmit = (e) => {
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
          console.log('Login Form submitted:', formData);
          setFormData({ username: '', password: '' });
          setTouched({ username: false, password: false });
          setErrors({ username: '', password: '' });
        }
      };
    
      return (
        <div className="container-fluid">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3 w-100">
                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    <p className="text-center small">Enter your personal details to create account</p>
                  </div>

                  <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        id="acceptTerms"
                        name="acceptTerms"
                      />
                      <label className="form-check-label" htmlFor="acceptTerms" >Remember Me</label>
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

export default Login;