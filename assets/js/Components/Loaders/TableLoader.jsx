/*import React from "react";
import ContentLoader from "react-content-loader";

const TableRow = props => {
  const random = Math.random() * (1 - 0.7) + 0.7;
  return (
    <ContentLoader
      height={40}
      width={1060}
      speed={2}
      primaryColor="#d9d9d9"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" />
      <rect x="34" y="13" rx="6" ry="6" width={200 * random} height="12" />
      <rect x="633" y="13" rx="6" ry="6" width={23 * random} height="12" />
      <rect x="653" y="13" rx="6" ry="6" width={78 * random} height="12" />
      <rect x="755" y="13" rx="6" ry="6" width={117 * random} height="12" />
      <rect x="938" y="13" rx="6" ry="6" width={83 * random} height="12" />

      <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
    </ContentLoader>
  );
};

const TableLoader = () => (
  <React.Fragment>
    {Array(10)
      .fill("")
      .map((e, i) => (
        <TableRow key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </React.Fragment>
);

export default TableLoader;
*/
import React from 'react'
import ContentLoader from 'react-content-loader'

const TableLoader = props => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    speed={2}
    backgroundColor="blue"
    {...props}
  >
    <circle cx="70" cy="100" r="10" />
    <circle cx="120" cy="100" r="10" />
    <circle cx="170" cy="100" r="10" />
    <circle cx="220" cy="100" r="10" />
    <circle cx="270" cy="100" r="10" />
    <circle cx="320" cy="100" r="10" />
  </ContentLoader>
)

TableLoader.metadata = {
  name: 'RioF',
  github: 'clariokids',
  description: 'Three Dots',
  filename: 'TableLoader',
}

export default TableLoader

/*import React from "react"
import ContentLoader from "react-content-loader" 

const TableLoader = () => (
  <ContentLoader 
    speed={3}
    width={800}
    height={200}
    viewBox="0 0 800 200"
    backgroundColor="#dddee4"
    foregroundColor="#8bdad9"
  >
    <rect x="130" y="50" rx="0" ry="0" width="500" height="90" /> 
    <rect x="130" y="150" rx="0" ry="0" width="500" height="11" /> 
    <rect x="130" y="170" rx="0" ry="0" width="500" height="11" /> 
    <rect x="130" y="190" rx="0" ry="0" width="500" height="11" />

     

  </ContentLoader>
)

export default TableLoader*/