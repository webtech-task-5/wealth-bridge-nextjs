import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";

interface UsersTableProps {
  data: {
    id: string;
    type: string;
    to: string;
    time: string;
    amount: number;
  }[];
}

const jobColors: Record<string, string> = {
  deposit: "blue",
  withdraw: "cyan",
  payment: "pink",
};

export function TransactionTable({ data }: UsersTableProps) {
  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.id}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={jobColors[item.type.toLowerCase()]}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {item.type.toUpperCase()}
        </Badge>
      </td>
      <td>৳ {item.amount}</td>
      <td>
        <Text fz="sm" c="dimmed">
          {item.to}
        </Text>
      </td>
      <td>{formatDate(item.time).date} | {formatDate(item.time).time}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Recipient</th>
            <th>Time</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

const formatDate = (d: string) => {
  let date = d.split("T")[0];
  date = date.split("-").reverse().join("-");
  let time = d.split("T")[1];
  time = time.split(".")[0];
  return {
    date,
    time,
  };
};
