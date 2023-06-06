import React from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { HeaderBar } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
function hello() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = () => {
    if (user.name && user.email && user.password) {
      axios
        .post("/api/register", user)
        .then((res) => {
          router.push("/login");
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <HeaderBar />
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Hello From Wealth Bridge
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already Have an Account?{" "}
          <Anchor size="sm" href="/login">
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Name"
            placeholder="Your Name"
            required
            onChange={(event) => {
              setUser({ ...user, name: event.currentTarget.value });
            }}
          />

          <TextInput
            label="Email"
            placeholder="you@gmail.com"
            required
            mt="md"
            onChange={(event) => {
              setUser({ ...user, email: event.currentTarget.value });
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(event) => {
              setUser({ ...user, password: event.currentTarget.value });
            }}
          />

          <Button fullWidth mt="xl" onClick={registerUser}>
            Sign in
          </Button>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default hello;
