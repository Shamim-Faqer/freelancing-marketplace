import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider.jsx";

export default function useAuth() {
  return useContext(AuthContext);
}
