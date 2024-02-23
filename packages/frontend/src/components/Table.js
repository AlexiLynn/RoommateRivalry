import React from "react";

const HardcodedTable = () => {
  return (
    <table border="0.5">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Charles</td>
          <td>8pts</td>
          <p></p>
        </tr>
        <tr>
          <td>2</td>
          <td>
              Johnny
          </td>
          <td>3pts</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
              Amy
          </td>
          <td style={{ color: "red" }}>0pts</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HardcodedTable;
