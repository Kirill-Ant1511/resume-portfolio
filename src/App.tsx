import { About } from "./components/About";
import { Career } from "./components/Career";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Projects";
import { StackList } from "./components/StackList";

export default function App() {
  return <div className="overflow-hidden">
      <About />
      <StackList />
      <Career />
      <Projects />
      <Footer />
  </div>
}
