import React from "react";
import { Button } from "react-bootstrap";

import "./Toolbar.scss";
const toolbar = ({ name, handleAddShow, type }) => {
  return (
    <div className="toolbar">
      <h2>{name}</h2>
      {type != "no-add" ? (
        <Button variant="outline-primary" onClick={handleAddShow}>
          <i class="bi bi-plus-lg"></i>
          Thêm
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default toolbar;
