import { Modal, useMantineTheme } from "@mantine/core";
import { Input, Button } from "@mantine/core";
import React from "react";
import { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
export function DepositModal({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: Function;
}) {
  const theme = useMantineTheme();
  const [value, setValue] = useState("");
  const onSubmit = async () => {
    try {
      let token = localStorage.getItem("token") as any;
      token = jwt.decode(token);

      await axios.post("/api/transaction", {
        id: token.id,
        amount: value,
        type: "deposit",
      });
      setOpened(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setOpened(false);
    }
  };
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Deposit Money : "
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Input.Wrapper
        id="input-demo"
        withAsterisk
        label="Deposit to Wealth Bridge:"
        description="Please enter your desired amount."
      >
        <Input
          id="input-demo"
          placeholder="7000"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </Input.Wrapper>
      <Button color="green" radius="md" mt="sm" onClick={onSubmit}>
        Deposit
      </Button>
    </Modal>
  );
}
