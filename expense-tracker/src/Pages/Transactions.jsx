import { useEffect, useState } from "react";
import "./css/Transaction.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import $ from "jquery";
import LoadingScreen from "../Components/LoadingScreen";

const apiUrl = 'http://localhost:5000/api/Transactions';
const Transactions = () => {
  const { isLoggedIn, authorizationToken } = useAuth();
  const navigate = useNavigate();
  const toastId = "login-toast";
  const [transaction, setTransaction] = useState([]);
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [filterAmount, setFilterAmount] = useState("");
  
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
  // console.log(userData)

  const fetchTransactions = async () => {
    await fetch(apiUrl + "/GetTransactionByHOFId/" + userData.hofId, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    })
      .then(res => res.json())
      .then(res => setTransaction(res));
  }

  useEffect(() => {
    fetchTransactions();
  }, [])
  const [filteredTransactions, setFilteredTransactions] = useState(transaction);

  useEffect(() => {
    setFilteredTransactions(transaction);
  }, [transaction]);


  const downloadReport = () => {
    const doc = new jsPDF("p", "mm", "a4");
  
    // Set Title with Underline
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Transaction Report", 105, 15, null, null, "center");
    doc.setDrawColor(0);
    doc.line(14, 18, 196, 18); // Underline
  
    // Add Report Date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 25);
  
    // Define Table Columns
    const tableColumn = [
      "ID", "User", "Category", "Payment", "Amount", "Date", "Notes"
    ];
  
    // Prepare Table Rows
    const tableRows = filteredTransactions.map((t) => [
      t.transactionId,
      t.userName,
      t.categoryName,
      t.methodName,
      `${t.transactionAmount.toFixed(2)}`, // Fix amount formatting
      formatDate(t.transactionDate),
      t.transactionNotes || "N/A"
    ]);
  
    // Generate Table with Adjusted Column Widths
    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 4, overflow: "linebreak" },
      headStyles: { fillColor: [44, 62, 80], textColor: 255, fontSize: 12, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { cellWidth: 12, halign: "center" }, // ID
        1: { cellWidth: 22 }, // User
        2: { cellWidth: 30 }, // Category (Fixed width to prevent text breaking)
        3: { cellWidth: 30 }, // Payment
        4: { cellWidth: 25, halign: "right" }, // Amount (Fixed width for proper alignment)
        5: { cellWidth: 26, halign: "center" }, // Date
        6: { cellWidth: 47 } // Notes
      },
      margin: { top: 30, left: 14, right: 14 },
      didDrawPage: function (data) {
        // Add Page Number
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageCount}`, 105, 285, null, null, "center");
      }
    });
  
    doc.save(`Transaction_Report_${currentDate}.pdf`);
  };
  
  

  const filterTransactions = () => {
    let filtered = transaction;

    if (startDate && endDate) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.transactionDate.split('T')[0]);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
      });
    }

    if (filterAmount) {
      console.log(filterAmount)
      filtered = filtered.filter((t) => parseFloat(t.transactionAmount) >= parseFloat(filterAmount));
    }

    setFilteredTransactions(filtered);
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilterAmount("");
    setFilteredTransactions(transaction);
  };


  $(document).ready(function () {
    $("#filterBtn").click(function () {
      filterTransactions();
    });
    $("#clearFilterBtn").click(function () {
      console.log("clear")
      clearFilter();
    });
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!isLoggedIn) {
    if (!toast.isActive(toastId)) {
      toast.error("Please Login First", { toastId });
    }
    return <Navigate to="/" />
  }
  else {
    if (transaction.length == 0) {
      return (
        <LoadingScreen message="Please Wait" />
      );

    }
    else {

      return (

        <div className="container mt-5">
          <h2 className="text-center mb-4 text-primary fw-bold">Your Transaction Entries</h2>

          <div className="d-flex mb-3 row">
            <div className="col">
              <label className="form-label">
                <strong>Start Date:</strong>
              </label>
              <input
                type="date"
                className="form-control me-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
              />
            </div>
            <div className="col">
              <label className="form-label">
                <strong>End Date:</strong>
              </label>
              <input
                type="date"
                className="form-control me-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
              />
            </div>
            <div className="col">
              <label className="form-label">
                <strong>Filter by amount:</strong>
              </label>
              <input
                type="number"
                className="form-control me-2"
                value={filterAmount}
                onChange={(e) => setFilterAmount(e.target.value)}
                placeholder="Amount greater than"
              />
            </div>
            <div className="col">
              <div className="row mt-4">

                <button id="filterBtn" className="btn btn-primary col mx-3 mt-2">Apply Filter</button>
                <button id="clearFilterBtn" className="btn btn-secondary col mt-2" >Clear Filter</button>
              </div>
            </div>

          </div>


          <div className="row">

            <div className="col-md ">
              <Link to="/transactions/addedittransaction" className="btn btn-primary mb-4 d-inline-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                </svg>
                &nbsp;&nbsp;Add New Transaction
              </Link>
            </div>

            <div className="col-md">
              <button className="btn btn-success mb-3" onClick={downloadReport}>
                📄 Download Report
              </button>
            </div>
            <div className="col-md"></div>
            <div className="col-md"></div>
            <div className="col-md-3"></div>

          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered shadow">
              <thead className="bg-primary text-white">
                <tr className="text-center">
                  <th>Transaction ID</th>

                  <th>User</th>
                  <th>Category</th>
                  <th>Payment Method</th>
                  <th>Amount (₹)</th>
                  <th>Date</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.transactionId} className="align-middle text-center">
                    <td>{t.transactionId}</td>

                    <td>{t.userName}</td>

                    <td>
                      <span className={`badge ${t.categoryType === "Income" ? "bg-success" : "bg-danger"}`}>
                        {t.categoryName}
                      </span>
                    </td>

                    <td>{t.methodName}</td>

                    <td className={`fw-bold ${t.categoryType === "Income" ? "text-success" : "text-danger"}`}>
                      ₹{t.transactionAmount.toFixed(2)}
                    </td>

                    <td>{formatDate(t.transactionDate)}</td>
                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                      {t.transactionNotes}
                    </td>

                  {t.userId === userData.userId ? 
                    <td className="text-nowrap">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => { navigate("/transactions/addedittransaction/" + t.transactionId) }}
                      >
                        ✏️ Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={async () => {
                        if (confirm("Do you want to delete Transaction " + t.transactionId)) {
                          const response = await fetch(apiUrl + "/DeleteTransactionsByID/" + t.transactionId, {
                            method: "DELETE",
                            headers: {
                              Authorization: authorizationToken,
                            },
                          });

                          const responseData = await response.json();

                          if (response.ok) {
                            toast.success(responseData.message)
                            fetchTransactions()
                          }
                        }
                      }}>
                        ❌ Delete
                      </button>
                    </td>
                    :
                    <td className="text-nowrap">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => { navigate("/transactions/addedittransaction/" + t.transactionId) }}
                      disabled
                    >
                      ✏️ Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={async () => {
                      if (confirm("Do you want to delete Transaction " + t.transactionId)) {
                        const response = await fetch(apiUrl + "/DeleteTransactionsByID/" + t.transactionId, {
                          method: "DELETE",
                          headers: {
                            Authorization: authorizationToken,
                          },
                        });

                        const responseData = await response.json();

                        if (response.ok) {
                          toast.success(responseData.message)
                          fetchTransactions()
                        }
                      }
                    }} disabled>
                      ❌ Delete
                    </button>
                  </td>
                  }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
export default Transactions