import React, {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

const useChangeTheme = () => {
  const [mode, setMode] = useState("light");

  const changeTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const ThemeChangeProvider = ({ children }) => (
    <ThemeContext.Provider value={changeTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );

  return ThemeChangeProvider;
};

export const useThemeChange = () => {
  return useContext(ThemeContext);
};

export default useChangeTheme;
