import React from "react";
import {
  UnstyledButton,
  createStyles,
  Container,
  Group,
  Text,
  rem,
  RingProgress,
  Card,
} from "@mantine/core";
import { useState } from "react";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan("xs")]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));
export function WalletCard({
  dashboardData,
}: {
  dashboardData: {
    balance: number;
    accountNumber: string;
    total: number;
    depositCount: number;
    paymentCount: number;
  };
}) {
  console.log({ dashboardData });
  const { classes, theme } = useStyles();
  const stats = [
    {
      value: dashboardData.depositCount,
      label: "Total deposits",
    },
    {
      value: dashboardData.paymentCount,
      label: "Total payments",
    },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Account No:{" "}
            <span
              style={{
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 500,
                fontSize: rem(18),
                lineHeight: 1,
                color: "gray",
              }}
            >
              {dashboardData.accountNumber}
            </span>
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {dashboardData.total}
            </Text>
            <Text fz="xs" color="dimmed">
              Total Transaction
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              {
                value: 100,
                color: theme.primaryColor,
              },
            ]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  ৳ {dashboardData.balance}
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Total Balance
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}
