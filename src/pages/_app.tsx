import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useLocalStorage } from "@mantine/hooks";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "demo-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <Head>
          <title>Wealth Bridge | The bridge to financial freedom.</title>
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
