import { ActivityIndicator } from "react-native";

export function Loading () {
  return (<ActivityIndicator
  className="flex-1  bg-zinc-100  dark:bg-zinc-950 items-center justify-center text-purple-300 "
  />)
}