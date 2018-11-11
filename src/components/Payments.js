import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from "reactstrap";
import { actions, connect } from "../store";
import { translate } from "react-i18next";
import PriceForm from "./PriceForm";
import QualityForm from "./QualityForm";
import Error from "./Error";

class Payments extends Component {
  componentDidMount() {
    actions.getInfo();
    actions.getSettings();
  }

  render() {
    const { info, factorError, priceError, settings } = this.props.state;
    const { t } = this.props;

    if (!(info && settings)) return null;
    return (
      <div id="payments-main">
        <h1 id="payments-title">{t("payments")}</h1>

        <Error error={factorError} />
        <Error error={priceError} />

        <Row style={{ marginBottom: 15 }}>
          <Col md="6">
            <PriceForm />
          </Col>
          <Col>
            <Card style={{ height: "100%" }}>
              <CardBody>
                <div className="text-center">
                  <h2>{t("currentBalance")}</h2>
                  <h3>♦ {Math.max(0, info.balance)}</h3>
                  <Button color="primary">{t("add1")}</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <QualityForm />
          </Col>
          <Col>
            <LowFunds t={t} />
          </Col>
        </Row>
      </div>
    );
  }
}

function LowFunds({ t }) {
  return (
    <Card>
      <CardBody>
        <h3>{t("lowFunds")}</h3>

        <Form>
          <FormGroup>
            <Label>Throttle threshold:</Label>
            <InputGroup>
              <Input style={{ width: "5em" }} value="10" />
              <InputGroupAddon addonType="append">
                {t("monthlyUse")}
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
}

export default connect(["factorError", "priceError", "info", "settings"])(
  translate()(Payments)
);
