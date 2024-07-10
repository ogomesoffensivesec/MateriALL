# MateriALL - Aplicativo de Pedido de Materiais para Obras

O MateriALL é um aplicativo desenvolvido para facilitar o pedido de materiais para obras, utilizando tecnologias modernas para oferecer uma experiência eficiente e intuitiva.

## Tecnologias Utilizadas

- **React Native**: Framework JavaScript para desenvolvimento de aplicativos móveis.
- **Expo**: Plataforma e conjunto de ferramentas para desenvolvimento de aplicativos universais com React Native.
- **Expo Router**: Roteamento de aplicativos React Native com Expo.
- **NativeWind**: Adaptação do Tailwind CSS para estilos em React Native.
- **Firebase**: Plataforma de desenvolvimento de aplicativos móveis da Google, utilizada para autenticação de usuários e banco de dados em tempo real.

## Funcionalidades

- **Autenticação de Usuários**: Utilização do Firebase Authentication para permitir que usuários façam login de forma segura.
- **Pedido de Materiais**: Funcionalidade principal do aplicativo, permitindo que usuários solicitem materiais necessários para suas obras.
- **Integração com Banco de Dados**: Firebase Realtime Database é utilizado para armazenar e sincronizar dados em tempo real.
- **Interface Responsiva**: Utilização do NativeWind para criação de uma interface intuitiva e responsiva, adaptada para dispositivos móveis.

## Configuração do Ambiente de Desenvolvimento

Para configurar o ambiente de desenvolvimento e executar o aplicativo localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js e npm instalados globalmente.
- Expo CLI instalado globalmente: `npm install -g expo-cli`.

### 1. Clonar o Repositório

Clone o repositório do MateriALL para sua máquina local:

```bash
git clone url_do_repositorio
cd MateriALL
```

### 2. Instalar Dependências

Instale as dependências necessárias usando npm ou yarn:

```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto para configurar suas chaves de API do Firebase, seguindo o formato:

```
API_KEY=your_api_key
AUTH_DOMAIN=your_auth_domain
DATABASE_URL=your_database_url
PROJECT_ID=your_project_id
STORAGE_BUCKET=your_storage_bucket
MESSAGING_SENDER_ID=your_messaging_sender_id
APP_ID=your_app_id
```

### 4. Executar o Aplicativo

Inicie o servidor de desenvolvimento do Expo:

```bash
expo start
```

Isso abrirá o Expo Developer Tools no seu navegador. Você pode escanear o QR code usando o aplicativo Expo Go em seu dispositivo móvel para visualizar o aplicativo em tempo real.



## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou reportar issues.

---

Este README fornece uma visão geral do projeto MateriALL, incluindo tecnologias utilizadas, funcionalidades principais, configuração do ambiente de desenvolvimento e estrutura do projeto. Personalize conforme necessário para refletir os detalhes específicos do seu aplicativo.
