import React from "react";

import "./Table.css";

const Table = ({ tableData, apiData }) => {
  return (
    <div className="table-container mx-4">
      <table className="table table-striped">
        <thead>
          <tr>
            {tableData?.map((tableRow, index) => {
              return <th key={index}>{tableRow[0]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {apiData?.map((item, index) => (
            <tr key={index}>
              <td>{item["id"]}</td>
              <td>{item["email"]}</td>
              <td>{item["first_name"]}</td>
              <td>{item["last_name"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
