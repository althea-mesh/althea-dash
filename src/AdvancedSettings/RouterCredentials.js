import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { login, post } from "store";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default ({ balance, symbol }) => {
  const [t] = useTranslation();
  const [password, setPassword] = useState("");
  const [passConfirm, setConfirm] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setError();
    setSuccess();

    if (password !== passConfirm) {
      return setError(t("passwordMismatch"));
    }

    try {
      await post("/router/password", { password });
      login(password);
      setSuccess(true);
    } catch (e) {
      setError(t("passwordError"));
    }
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <Form onSubmit={submit}>
          <h3>{t("routerCredentials")}</h3>
          <p>{t("theseCredentials")}</p>

          {error && <Alert color="danger">{error}</Alert>}
          {success && <Alert color="success">{t("passwordSuccess")}</Alert>}

          <div className="d-flex flex-wrap">
            <FormGroup>
              <Label for="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                className="mr-3"
                onChange={e => setPassword(e.target.value)}
                value={password}
                style={{ width: 250 }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="passConfirm">{t("passConfirm")}</Label>
              <Input
                id="passConfirm"
                type="password"
                className="mr-3"
                onChange={e => setConfirm(e.target.value)}
                value={passConfirm}
                style={{ width: 250 }}
              />
            </FormGroup>
            <div className="mt-auto mb-3">
              <Button color="primary" style={{ width: 100 }}>
                {t("save")}
              </Button>
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};