import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const { isLoggedIn, authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [hofList, setHofList] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/Users/UsersDropdown").then(res => res.json()).then(res => setHofList(res))
  },[]);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    PasswordHash: '',
    HOFId: 0,
    HOF: false,
    HOFName:''
  });

  const [touched, setTouched] = useState({
    Name: false,
    Email: false,
    Mobile: false,
    PasswordHash: false,
  });

  const [errors, setErrors] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    PasswordHash: '',
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'Name':
        return value.trim() ? '' : 'Name is required';
      case 'Email':
        return value.trim() ? (/\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid') : 'Email is required';
      case 'Mobile':
        return value.trim() ? (/^\d{10}$/.test(value) ? '' : 'Mobile number is invalid (only 10 digits required)') : 'Mobile number is required';
      case 'PasswordHash':
        return value ? (value.length >= 6 ? '' : 'PasswordHash must be at least 6 characters long') : 'PasswordHash is required';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData(prevState => ({
      ...prevState,
      [name]: name === "HOF" ? value === "1" : value,
      // [name]: value,
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
      console.log(formData)
      const response = await fetch("http://localhost:5000/api/Users/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate("/login");
      }
      else {
        console.log(data)
      }
      setFormData({ Name: '', Email: '', Mobile: '', PasswordHash: '' });
      setTouched({ Name: false, Email: false, Mobile: false, PasswordHash: false });
      setErrors({ Name: '', Email: '', Mobile: '', PasswordHash: '' });
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
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p className="text-center small">Enter your personal details to create account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">
                          Are You Head of Family (HOF)? <span className="text-danger">*</span>
                        </label>
                        <div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              // id="HOFYes"
                              name="HOF"
                              value="1"
                              checked={formData.HOF === true}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-check-label" htmlFor="HOFYes">
                              Yes
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className="form-check-input"
                              // id="HOFNo"
                              name="HOF"
                              value="0"
                              checked={formData.HOF === false}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-check-label" htmlFor="HOFNo">
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Show HOFName dropdown if HOF is "No" */}
                      {formData.HOF === false && (
                        <div className="mb-3">
                          <label htmlFor="HOFId" className="form-label">
                            Select Head of Family <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            id="HOFId"
                            name="HOFId"
                            value={formData.HOFId}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled>Select HOF</option>
                            {hofList.map((hof) => (
                              
                              <option key={hof.userId} value={hof.userId}>
                                {hof.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="mb-3">
                        <label htmlFor="Name" className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                          id="Name"
                          name="Name"
                          value={formData.Name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="Email" className="form-label">
                          Email address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-control ${errors.Email ? "is-invalid" : ""}`}
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
                        <label htmlFor="Mobile" className="form-label">
                          Mobile number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${errors.Mobile ? "is-invalid" : ""}`}
                          id="Mobile"
                          name="Mobile"
                          value={formData.Mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.Mobile && <div className="invalid-feedback">{errors.Mobile}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="PasswordHash" className="form-label">
                          PasswordHash <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className={`form-control ${errors.PasswordHash ? "is-invalid" : ""}`}
                          id="PasswordHash"
                          name="PasswordHash"
                          value={formData.PasswordHash}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.PasswordHash && (
                          <div className="invalid-feedback">{errors.PasswordHash}</div>
                        )}
                      </div>

                      <div className="mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id="acceptTerms"
                          name="acceptTerms"
                          required
                        />
                        <label className="form-check-label d-inline" htmlFor="acceptTerms">
                          I agree and accept the <Link to="">terms and conditions</Link>
                        </label>
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                          Sign Up
                        </button>
                      </div>

                      <div className="col-12 my-1">
                        <p className="small mb-0">
                          Already have an account? <Link to="/login">Log in</Link>
                        </p>
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

export default Signup;