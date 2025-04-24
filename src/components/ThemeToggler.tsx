import { useTheme } from "../contexts/themes";
import { Button } from "./ui/button";

export function ThemeToggler() {
  const { nextTheme, toggleTheme } = useTheme();

  return (
    <Button variant="default" onClick={toggleTheme}>
      Switch to {nextTheme()}
    </Button>
  )
}
