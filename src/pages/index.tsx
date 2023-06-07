import {
  createStyles,
  Image,
  Container,
  Title,
  Group,
  Text,
  rem,
  Badge,
  Card,
  SimpleGrid,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { HeaderBar } from "@/components/Header/Header";
import { IconArrowMerge, IconUser, IconShieldLock } from "@tabler/icons-react";
import { Footer } from "@/components/Footer/Footer";
import { useEffect } from "react";
const mockdata = [
  {
    title: "Security",
    description:
      "The website should be secure and use https:// protocol to protect customer data. The security is very important for the users",
    icon: IconShieldLock,
  },
  {
    title: "Ease of use",
    description:
      "Easy to use and navigate. Customers should be able to find the information they need quickly and easily",
    icon: IconUser,
  },
  {
    title: "Easy Integration",
    description:
      "The website should be easy to integrate with other systems and services. It should be easy to integrate with other systems and services",
    icon: IconArrowMerge,
  },
];
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title2: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export default function Home() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <>
      <HeaderBar login={true} logout={false} active="" />
      <div
        style={{ marginLeft: "5rem", marginRight: "5rem", marginTop: "-6rem" }}
      >
        <Carousel
          slideSize="80%"
          height={600}
          slideGap="lg"
          controlsOffset="lg"
          loop
        >
          <Carousel.Slide>
            <Image
              src="/img1.jpg"
              alt="img1"
              radius="md"
              onClick={(e) => {
                e.stopPropagation();
              }}
              width="100%"
              height={800}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            {" "}
            <Image
              src="/img2.jpg"
              alt="img2"
              onClick={(e) => {
                e.stopPropagation();
              }}
              radius="md"
              width="100%"
              height={800}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            {" "}
            <Image
              src="/img3.jpg"
              alt="img3"
              radius="md"
              onClick={(e) => {
                e.stopPropagation();
              }}
              width="100%"
              height={800}
            />
          </Carousel.Slide>
        </Carousel>
      </div>
      <Container size="lg" py="xl">
        <Group position="center">
          <Badge variant="filled" size="lg">
            Wealth-Bridge
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="sm">
          The bridge to financial freedom.
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Wealth Bridge is like a bridge that connects you to your financial
          future. We help you cross the gap between where you are today and
          where you want to be financially.
        </Text>

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
}
