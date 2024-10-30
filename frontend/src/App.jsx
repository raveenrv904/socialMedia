import MessageComponent from "./Message";
import { SocketProvider } from "./SocketContext";

const App = () => {
  return (
    <SocketProvider>
      <MessageComponent />
    </SocketProvider>
  );
};

export default App;
