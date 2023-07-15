import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const navigate = useNavigate();
  const [searchbarInput, searchbarInputSet] = useState(1);

  return (
    <div className="container d-flex justify-content-center flex-column p-5 gap-5">
      <div className="display-4">
        Pequise as transações dos usario pelo identificador unico da conta
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Identificador unico da conta"
          aria-label="Identificador unico da conta"
          aria-describedby="basic-addon2"
          min="1"
          type="number"
          onChange={({ target: { value } }) => searchbarInputSet(Number(value))}
        />
        <Button
          variant="outline-primary"
          id="button-addon2"
          onClick={() => navigate(`transferencia/${searchbarInput}`)}
        >
          Buscar
        </Button>
      </InputGroup>
    </div>
  );
}
