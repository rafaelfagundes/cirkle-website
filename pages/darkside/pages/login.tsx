import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Column from "../../../src/components/Atoms/Column";
import Row from "../../../src/components/Atoms/Row";
import SizedBox from "../../../src/components/Atoms/SizedBox";
import { useAuth } from "../../../src/hooks/auth/useAuth";

function Login(): JSX.Element {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const _login = async () => {
    setLoading(true);

    const result = await auth.signin(email, password);
    setLoading(false);
    if (result) {
      typeof window !== "undefined" && router.push("/darkside");
    }
  };

  return (
    <Container maxWidth="sm">
      <SizedBox height={40}></SizedBox>
      <Row>
        <Column>
          <TextField
            id="outlined-basic"
            label="Usuário"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <SizedBox height={10}></SizedBox>
          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <SizedBox height={30}></SizedBox>
          <Button variant="contained" color="primary" onClick={_login}>
            Entrar
          </Button>
        </Column>
      </Row>
    </Container>
  );
}

export default Login;
