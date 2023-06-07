import React from "react";
import { Container, Title, Paper, Image, Text } from "@mantine/core";
import { HeaderBar } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <HeaderBar login={false} logout={false} active="/about" />

      <Container size="sm" style={styles.container}>
        <Title order={1}>About Our Bank</Title>
        <Text>
          Welcome to our bank, where we strive to provide exceptional financial
          services to our customers. We believe in building strong relationships
          with our clients and helping them achieve their financial goals.
        </Text>

        <Title order={2}>Our Team</Title>
        <div style={styles.developerContainer}>
          <Paper style={styles.developerCard}>
            <Image
              src="/owishi.jpg"
              alt="Developer 1"
              width={200}
              height={200}
              style={styles.profileImage}
            />
            <Title order={3}>Nowshin Alam Owishi</Title>
            <Text>
              &#8903; Owishi is a talented full-stack developer with a wealth of
              knowledge and expertise in building scalable and high-performing
              web applications. <br />
              &#8903; Possesses a strong affinity for cutting-edge web
              technologies and thrives on exploring
              <br />
              &#8903; Expertise lies in leveraging the capabilities of Node.js
              to construct robust architectures and develop
              efficient APIs.
            </Text>
          </Paper>

          <Paper style={styles.developerCard}>
            <Image
              src="/sohan.jpg"
              alt="Developer 2"
              width={200}
              height={200}
              style={styles.profileImage}
            />
            <Title order={3}>Moksedur Rahman Sohan</Title>
            <Text>
              &#8903; - Sohan is a highly skilled software engineer with a
              passion for problem-solving and creating efficient solutions.
              <br />
              &#8903; Has a keen eye for detail and a commitment to writing
              clean, maintainable code.
              <br />
              &#8903; Continuously stays updated with the latest trends and
              technologies in the software development industry.
            </Text>
          </Paper>
        </div>
        <Footer />
      </Container>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    marginTop: "-80px",
  },
  developerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  },
  developerCard: {
    width: 350,
    padding: "20px",
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 580,
  },
  profileImage: {
    borderRadius: "20%",
    marginBottom: "10px",
  },
};

export default AboutPage;
