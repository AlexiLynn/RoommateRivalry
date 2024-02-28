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
          <td>
            <p style={{ color: "#336699", fontWeight: "bold" }}>
              Charles
            </p>
            <p>cwash@calpoly.edu • (567)909-2678</p>
          </td>
          <td>8pts</td>
          <p></p>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <p style={{ color: "#336699", fontWeight: "bold" }}>
              Johnny
            </p>
            <p>jclean@calpoly.edu • (222)456-7890</p>
          </td>
          <td>3pts</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <p style={{ color: "#336699", fontWeight: "bold" }}>
              Amy
            </p>
            <p>asoap@calpoly.edu • (873)167-4396</p>
          </td>
          <td style={{ color: "red" }}>0pts</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HardcodedTable;
