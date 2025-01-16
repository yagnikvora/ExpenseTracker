import React, { useEffect, useState } from "react";
import './css/Category.css';
import { useNavigate } from "react-router-dom";
const apiUrl = 'http://localhost:5000/api/Categories';
const Category = () => {
    const [categories,setCategory] = useState([]);
    const navigate = useNavigate()
      const fetchBudgets = ()=>{
        fetch(apiUrl+"/GetAllCategories")
        .then(res => res.json())
        .then(res=>setCategory(res));
      }
      useEffect(()=>{
        fetchBudgets();
      },[])

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Category List</h2>
      <div className="row">
        {categories.map((c) => (
          <div className="col-md-4 mb-4" key={c.categoryId}>
            <div className="card cat-card category-card border shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{c.categoryName}</h5>
                <h6
                  className={`card-subtitle mb-3 text-${
                    c.categoryType === "Income" ? "success" : "danger"
                  }`}
                >
                  {c.categoryType}
                </h6>
              </div>
              <div className="card-footer">
                <small className="text-muted">
                <p className="card-text">{c.categoryDescription}</p>

                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Category;
