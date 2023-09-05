import { UserProvider } from "./src/contexts/UserContext";
import Navigation from "./src/components/Navigation";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
