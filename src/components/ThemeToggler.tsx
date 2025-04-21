import { useTheme } from "../contexts/themes";

export function ThemeToggler() {
  const { nextTheme, toggleTheme } = useTheme();

  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
      onClick={toggleTheme}>
      Switch to {nextTheme()}
    </button>
  )
}
