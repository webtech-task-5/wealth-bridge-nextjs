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
export function WalletCard() {
  const { classes, theme } = useStyles();
  const stats = [
    {
      value: 447,
      label: "Total payments",
    },
    {
      value: 76,
      label: "Total deposits",
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
            Your Wallet
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              1784
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
                  150096 TK
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
