import React from "react";
import {
  UnstyledButton,
  createStyles,
  Container,
  Group,
  Text,
  rem,
  Card,
  SimpleGrid,
  Table,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { HeaderBar } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

function hello() {
  const router = useRouter();

  return (
    <>
      <HeaderBar />

      <Footer />
    </>
  );
}

export default hello;
