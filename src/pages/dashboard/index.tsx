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
import { useState, useEffect } from "react";
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
import { DepositModal } from "@/components/DepositModal/DepositModal";
import jwt from "jsonwebtoken";
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

function hello() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { classes, theme } = useStyles();
  const itemClick = (href: string) => {
    if (href == "/keys") {
      router.push(href);
    } else if (href == "/deposit") {
      setModalType("deposit");
      setOpened(true);
    } else if (href == "/withdraw") {
      setModalType("withdraw");
      setOpened(true);
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
  const [dashboardData, setData] = useState<{
    balance: number;
    accountNumber: string;
    total: number;
    depositCount: number;
    paymentCount: number;
  }>({
    balance: 0,
    accountNumber: "",
    total: 0,
    depositCount: 0,
    paymentCount: 0,
  });
  const [transactions, setTransactions] = useState([] as any[]);
  const [modalType, setModalType] = useState("deposit");
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    if (!token) {
      router.push("/login");
    }
    const id = jwt.decode(token) as any;
    const getdashboard = async () => {
      axios.defaults.headers.common["id"] = id.id;
      await axios.get("/api/getdashboard").then((res) => {
        console.log(res.data);
        setData(res.data.data);
        let transactions = res.data.transactions;
        let user = res.data.user;
        let dashboardData: {
          balance: number;
          accountNumber: string;
          total: number;
          depositCount: number;
          paymentCount: number;
        } = {
          balance: user.wallet,
          accountNumber: user.accountNumber,
          total: res.data.total,
          depositCount: res.data.depositCount,
          paymentCount: res.data.paymentCount,
        };
        setData(dashboardData);
        transactions = transactions.map((item: any) => {
          return {
            id: item.tid,
            time: item.createdAt,
            type: item.type,
            amount: item.amount,
            to: item.recipient,
          };
        });
        setTransactions(transactions);
      });
    };
    getdashboard();
  }, []);

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
        <WalletCard dashboardData={dashboardData} />
      </div>
      <div
        style={{
          margin: "0 20%",
          marginTop: "3rem",
        }}
      >
        <p style={{ fontSize: "2rem" }}>Transactions - </p>
        <TransactionTable data={transactions} />
      </div>
      <DepositModal opened={opened} setOpened={setOpened} type={modalType} />
      <Footer />
    </>
  );
}

export default hello;
