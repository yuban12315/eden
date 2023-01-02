import { FC } from "react";
import dayjs from "dayjs";
import { Info } from "../Styled";

interface DateViewProps {
  timestamp?: number;
}

export default function DateView(props: DateViewProps) {
  return <Info>{dayjs(props.timestamp).format("MM/DD HH:mm")}</Info>;
}
