import React, { use } from "react";
import {
  UnstyledButton,
  createStyles,
  Container,
  Group,
  Text,
  rem,
  Card,
  Code,
  Input,
  Title,
  Button,
  Divider,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { IconApi, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/router";
import { HeaderBar } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import jwt from "jsonwebtoken";
function hello() {
  const router = useRouter();
  const [data, setData] = useState([] as any);
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    if (!token) {
      router.push("/login");
    }
    const id = jwt.decode(token) as any;
    setKey({
      ...key,
      id: id.id,
    });
    axios.defaults.headers.common["id"] = id.id;
    axios.get("/api/key").then((res) => {
      console.log(res.data);
      setData(res.data.keys);
    });
  }, []);
  const [key, setKey] = useState({
    name: "",
    id: "",
  });
  const saveToDB = async () => {
    try {
      const token = localStorage.getItem("token") as string;
      const id = jwt.decode(token) as any;
      setKey({
        ...key,
        id: id.id,
      });
      await axios.post("/api/key", key);
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <HeaderBar />
      <div style={{ marginLeft: "20%", marginTop: "-4%" }}>
        <Title order={1}>Create new API key : </Title>
        <Input
          icon={<IconApi />}
          placeholder="Api Name Key."
          sx={{ width: "50%" }}
          onChange={(e) => {
            setKey({
              ...key,
              name: e.currentTarget.value,
            });
          }}
        />
        <Button color="green" radius="md" mt="md" onClick={saveToDB}>
          Create Now
        </Button>
      </div>
      <div
        style={{ marginLeft: "20%", marginTop: "2rem", marginBottom: "2rem" }}
      >
        <Title order={1}>Your API Keys : </Title>
      </div>
      {data.map((item: any) => (
        <div
          style={{
            backgroundColor: "rgba(0,128,128,0.3)",
            padding: "1rem",
            marginLeft: "20%",
            marginRight: "20%",
            marginBottom: "1rem",
            borderRadius: "2%",
          }}
          key={item._id}
        >
          <div style={{ display: "flex", gap: "2rem" }}>
            <div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Title order={4}>Name: </Title>
                <Text>{item.name}</Text>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Title order={6}>Key: </Title>
                <Code color="red">{item._id}</Code>
              </div>
            </div>
            <div>
              <IconTrash
                size={30}
                color="#d94330"
                cursor="pointer"
                onClick={() => {
                  console.log("Fuck");
                }}
              />
            </div>
          </div>

          <Divider my="sm" variant="dashed" color="black" />
        </div>
      ))}

      <Footer />
    </>
  );
}

export default hello;
