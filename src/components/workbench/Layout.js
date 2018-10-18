import React from 'react';
import './Layout.scss';

export default function Layout(props) {
  const { left, right, top, rightTop } = props;
  return (
    <React.Fragment>
      <div className="layout-top">{top}</div>
      <div className="layout">
        <div className="layout-left">{left}</div>
        <div className="layout-right">
          <div className="layout-right-top">{rightTop}</div>
          <div className="layout-right-bottom">{right}</div>
        </div>
      </div>
    </React.Fragment>
  );
}