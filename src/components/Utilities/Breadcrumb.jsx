import React from 'react';

const Breadcrumb = () => {
  return (
    <div className="path">
      <span className="">Home </span>
      <span>&#x2F; </span>
      <span className="">Clothing </span>
      <span className="divider" aria-hidden="true">&#x2F; </span>
      <span className="">Mens Clothing </span>
      <span className="divider" aria-hidden="true">&#x2F; </span>
      <span className="breadcrumb-title"><b> All Mens Clothing</b></span>
    </div>
  );
};

export default Breadcrumb;