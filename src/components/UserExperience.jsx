import React, {useState } from 'react';
import { Card } from 'react-bootstrap';
import useFetchProjectName from "./useFetchProjectName";

export default function UserExperience() {
    const [user, setUser] = useState(null);

    const {response: fetchedSQLProject, error: fetchedSQLProjectError} =
    useFetchProjectName();
    console.error(fetchedSQLProjectError);

    setUser("test");

    return (
        <Card>
            <Card.Header>{`Hello, ${user}`}</Card.Header>
            <Card.Body>{`Current Project: ${fetchedSQLProject}`}</Card.Body>
        </Card>
    )
}