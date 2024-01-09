import React, { useState, useEffect } from "react";
import Fetch_leaderboard from "../api/Fetch_leaderboard";
import Table from "react-bootstrap/Table";

function Show_leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Fetch_leaderboard();
        // Assuming response is an array
        // Sort the data based on totalExpense in ascending order
        const sortedData = response
          .slice()
          .sort((a, b) => a.totalExpense - b.totalExpense);
        // console.log("sorted data", sortedData);
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after mount

  useEffect(() => {
    console.log(data);
  }, [data]); // Log data whenever it changes

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="signup-container">
          <h2 className="bg-blue-500 text-white p-2">Leaderboard</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Email</th>
                <th>TotalExpense</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.totalExpense}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Show_leaderboard;
