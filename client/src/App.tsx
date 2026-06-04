import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Domains from "./pages/Domains";
import Solutions from "./pages/Solutions";
import PromptPacks from "./pages/PromptPacks";
import DfyServices from "./pages/DfyServices";
import Hosting from "./pages/Hosting";
import ShopifyApp from "./pages/ShopifyApp";
import FreeShopifyStore from "./pages/FreeShopifyStore";
import Resources from "./pages/Resources";
import GetStarted from "./pages/GetStarted";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/solutions"} component={Solutions} />
      <Route path={"/prompt-packs"} component={PromptPacks} />
      <Route path={"/dfy-services"} component={DfyServices} />
      <Route path={"/hosting"} component={Hosting} />
      <Route path={"/domains"} component={Domains} />
      <Route path={"/shopify-app"} component={ShopifyApp} />
      <Route path={"/free-shopify-store"} component={FreeShopifyStore} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/get-started"} component={GetStarted} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
