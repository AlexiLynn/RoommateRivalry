import React from 'react';

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
            <a href="/roommates" style={{ color: 'black', textAlign: 'center', textDecoration: 'none', borderBottom: '1px solid transparent' }}
              onMouseOver={(e) => (e.currentTarget.style.borderBottom = '1px solid black')}
              onMouseOut={(e) => (e.currentTarget.style.borderBottom = '1px solid transparent')}>
              Charles
            </a>
          </td>
          <td>8pts</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="/roommates" style={{ color: 'black', textAlign: 'center', textDecoration: 'none', borderBottom: '1px solid transparent' }}
              onMouseOver={(e) => (e.currentTarget.style.borderBottom = '1px solid black')}
              onMouseOut={(e) => (e.currentTarget.style.borderBottom = '1px solid transparent')}>
              Johnny
            </a>
          </td>
          <td>3pts</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <a href="/roommates" style={{ color: 'black', textAlign: 'center', textDecoration: 'none', borderBottom: '1px solid transparent' }}
              onMouseOver={(e) => (e.currentTarget.style.borderBottom = '1px solid black')}
              onMouseOut={(e) => (e.currentTarget.style.borderBottom = '1px solid transparent')}>
            Amy
            </a>
          </td>
          <td style={{ color: 'red' }}>0pts</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HardcodedTable;