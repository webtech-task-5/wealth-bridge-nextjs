import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Footer } from "@/components/Footer/Footer";
import { HeaderBar } from "@/components/Header/Header";

function hello() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginUser = () => {
    if (user.email && user.password) {
      axios
        .post("/api/login", user)
        .then((res) => {
          const {token,data} = res.data;
          // save it to localstorage 
          localStorage.setItem("token",token);
          console.log(data);
          router.push("/dashboard");
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
    <HeaderBar/>
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Hello From Wealth Bank
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Don't Have an Account?{" "}
        <Anchor size="sm" href="/register">
          Signup
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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

        <Button fullWidth mt="xl" onClick={loginUser}>
          Login
        </Button>
      </Paper>
    </Container>
    <Footer/>
    </>
  );
}

export default hello;
