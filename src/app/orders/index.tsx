import { SafeAreaView } from "react-native";
import { TopBar, TopbarHeader, TopbarTitle } from "./_components/topbar";
import { RouteButton } from "@/components/route.button";

export default function Index() {
  
  const handleButtonPress = () => {

  }
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar>
    <TopbarHeader>
      <TopbarTitle>
        Meus pedidos
      </TopbarTitle>
    </TopbarHeader>
    <RouteButton title="Novo pedido"/>
      </TopBar>
      {/* O restante do seu layout */}
    </SafeAreaView>
  )
}