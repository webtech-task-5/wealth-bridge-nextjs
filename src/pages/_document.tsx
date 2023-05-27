import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();
const bg =
  "linear-gradient(22.5deg, rgba(66, 66, 66, 0.02) 0%, rgba(66, 66, 66, 0.02) 11%,rgba(135, 135, 135, 0.02) 11%, rgba(135, 135, 135, 0.02) 24%,rgba(29, 29, 29, 0.02) 24%, rgba(29, 29, 29, 0.02) 38%,rgba(15, 15, 15, 0.02) 38%, rgba(15, 15, 15, 0.02) 50%,rgba(180, 180, 180, 0.02) 50%, rgba(180, 180, 180, 0.02) 77%,rgba(205, 205, 205, 0.02) 77%, rgba(205, 205, 205, 0.02) 100%),linear-gradient(67.5deg, rgba(10, 10, 10, 0.02) 0%, rgba(10, 10, 10, 0.02) 22%,rgba(52, 52, 52, 0.02) 22%, rgba(52, 52, 52, 0.02) 29%,rgba(203, 203, 203, 0.02) 29%, rgba(203, 203, 203, 0.02) 30%,rgba(69, 69, 69, 0.02) 30%, rgba(69, 69, 69, 0.02) 75%,rgba(231, 231, 231, 0.02) 75%, rgba(231, 231, 231, 0.02) 95%,rgba(138, 138, 138, 0.02) 95%, rgba(138, 138, 138, 0.02) 100%),linear-gradient(112.5deg, rgba(221, 221, 221, 0.02) 0%, rgba(221, 221, 221, 0.02) 17%,rgba(190, 190, 190, 0.02) 17%, rgba(190, 190, 190, 0.02) 39%,rgba(186, 186, 186, 0.02) 39%, rgba(186, 186, 186, 0.02) 66%,rgba(191, 191, 191, 0.02) 66%, rgba(191, 191, 191, 0.02) 68%,rgba(16, 16, 16, 0.02) 68%, rgba(16, 16, 16, 0.02) 70%,rgba(94, 94, 94, 0.02) 70%, rgba(94, 94, 94, 0.02) 100%),linear-gradient(176deg, #ffffff,#ffffff);";
export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html className="light">
        <Head title="Wealth-Bridge" />
        <body style={{ backgroundImage: `${bg}` }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
