import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import ExpenseList from "./ExpenseListing";
import Swal from "sweetalert2";

export default function CreateExpense() {
    const [expenseState, setExpense] = useState({
        name: "",
        description: "",
        amount: "",
    });

    const handleChange = (e) => {
        setExpense({
            ...expenseState,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const expense = {
            name: expenseState.name,
            description: expenseState.description,
            amount: expenseState.amount,
        };
        axios
            .post("http://localhost:8001/api/expenses", expense)
            .then((res) => console.log(res.data));

        Swal.fire("Expense added successfully!");

        setExpense({
            name: "",
            description: "",
            amount: "",
        });
    };

    return (
        <div className="form-wrapper">
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={expenseState.name}
                                onChange={handleChange}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={expenseState.amount}
                                onChange={handleChange}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="textarea"
                        value={expenseState.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" size="lg" block="block" type="submit">
                    Add Expense
                </Button>
            </Form>
        </div>
    );
}
