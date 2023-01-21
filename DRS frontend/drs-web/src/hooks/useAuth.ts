import { useState } from "react";

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  return { loggedIn, setLoggedIn };
}
