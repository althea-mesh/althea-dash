import React from "react";
import { useTranslation } from "react-i18next";

import Exits from "./Exits";
import Nickname from "./Nickname";
import Subnet from "./Subnet";

export default () => {
  const [t] = useTranslation();

  return (
    <div>
      <h1 id="networkPage">{t("networkConnection")}</h1>
      <Nickname />
      <Exits />
      <Subnet />
    </div>
  );
};