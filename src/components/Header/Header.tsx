import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBuildingBank } from "@tabler/icons-react";
import Link from "next/link";
const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderBar({
  login,
  logout,
  active,
}: {
  login: boolean;
  logout: boolean;
  active: string;
}) {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { classes, cx } = useStyles();
  let links = [
    {
      link: "/about",
      label: "About",
    },
  ];
  if (login) {
    links = [
      ...links,
      {
        link: "/login",
        label: "Login",
      },
      {
        link: "/register",
        label: "Signup",
      },
    ];
  }
  if (logout) {
    links = [
      ...links,
      {
        link: "/logout",
        label: "Logout",
      },
    ];
  }

  const items = links.map((link) => {
    if (link.label == "Logout") {
      return (
        <Link
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }}
          href={"/"}
          key={link.label}
          className={cx(
            classes.link,
            active === link.link && classes.linkActive
          )}
        >
          {link.label}
        </Link>
      );
    } else {
      return (
        <Link
          href={link.link}
          key={link.label}
          className={cx(
            classes.link,
            active === link.link && classes.linkActive
          )}
          onClick={close}
        >
          {link.label}
        </Link>
      );
    }
  });
  return (
    <>
      <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
        <Container className={classes.header}>
          <Link href={"/dashboard"} style={{textDecoration: "none"}}>
            <Group sx={{ cursor: "pointer" }}>
              <IconBuildingBank size={28} color="#228BE6" />
              <Text fz="lg" fw={700} color="blue.7">
                Wealth-Bridge
              </Text>
            </Group>
          </Link>

          <Group spacing={5} className={classes.links}>
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
    </>
  );
}
