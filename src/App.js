import React, { useEffect, useState } from "react";
import { Nav } from "reactstrap";
import AltheaNav from "./Layout/Nav";
import Topbar from "./Layout/Topbar";
import NoConnection from "Utils/NoConnection";
import Router from "Router";
import { actions } from "store";

export default () => {
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    actions.getBlockchain();
    actions.getInfo();
    actions.getSettings();
    let timer = setInterval(actions.getVersion, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Topbar />
      <div id="content">
        <Nav id="sidebar" navbar>
          <AltheaNav page={page} />
        </Nav>
        <NoConnection />
        <Router page={page} setPage={setPage} />
      </div>
    </>
  );
};