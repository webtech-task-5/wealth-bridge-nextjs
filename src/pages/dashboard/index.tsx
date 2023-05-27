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
import { WalletCard } from "@/components/WalletCard/WalletCard";
import { TransactionTable } from "@/components/TransactionTable/TransactionTable";
import {
  IconCreditCard,
  IconRepeat,
  IconCurrencyTaka,
} from "@tabler/icons-react";

const mockdata = [
  {
    title: "Deposit Money",
    icon: IconCurrencyTaka,
    color: "violet",
    href: "/deposit",
  },
  {
    title: "Withdraw Money",
    icon: IconCreditCard,
    color: "indigo",
    href: "/withdraw",
  },
  { title: "Create API Key", icon: IconRepeat, color: "orange", href: "/keys" },
];
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    width: "50%",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));
let data = [
  {
    id: "TX-153456",
    time: "2021-08-01",
    type: "deposit",
    amount: 1000,
    to: "WB-123456",
  },
  {
    id: "TX-123476",
    time: "2021-08-01",
    type: "payment",
    amount: 1000,
    to: "WB-123456",
  },
  {
    id: "TX-163456",
    time: "2021-08-01",
    type: "deposit",
    amount: 1000,
    to: "WB-123456",
  },
  {
    id: "TX-223456",
    time: "2021-08-01",
    type: "withdraw",
    amount: 1000,
    to: "WB-123456",
  },
  {
    id: "TX-123056",
    time: "2021-08-01",
    type: "payment",
    amount: 1000,
    to: "WB-123456",
  },
];

function hello() {
  const router = useRouter();
  const { classes, theme } = useStyles();
  const itemClick = (href: string) => {
    if (href == "/keys") {
      router.push(href);
    } else {
      console.log("hello");
    }
  };
  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={() => {
        itemClick(item.href);
      }}
    >
      <item.icon color={theme.colors[item.color][6]} size="4rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));
  return (
    <>
      <HeaderBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 20%",
        }}
      >
        <Card withBorder radius="md" className={classes.card}>
          <Group position="apart">
            <Text className={classes.title}>Actions</Text>
          </Group>
          <SimpleGrid cols={3} mt="xs">
            {items}
          </SimpleGrid>
        </Card>
        <WalletCard />
      </div>
      <div
        style={{
          margin: "0 20%",
          marginTop: "3rem",
        }}
      >
        <p style={{ fontSize: "2rem" }}>Transactions - </p>
        <TransactionTable data={data} />
      </div>

      <Footer />
    </>
  );
}

export default hello;
