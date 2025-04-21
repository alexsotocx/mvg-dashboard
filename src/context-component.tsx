import { ThemeToggler } from "./components/ThemeToggler";
import { useTheme } from "./contexts/themes";

export function TestComponent() {
  const {theme} = useTheme();
  return (
    <div>
      <p>Current theme {theme}</p>
      <ThemeToggler/>
    </div>
  )
}
