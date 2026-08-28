import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SeoManager from "./components/SeoManager";
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
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Marketplace from "./pages/Marketplace";
import MarketplaceProduct from "./pages/MarketplaceProduct";
import { MarketplaceCancel, MarketplaceSuccess } from "./pages/MarketplaceCheckoutStatus";
import About from "./pages/About";
import Support from "./pages/Support";

function Router() {
  return (
    <>
      <SeoManager />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/marketplace"} component={Marketplace} />
        <Route path={"/marketplace/success"} component={MarketplaceSuccess} />
        <Route path={"/marketplace/cancel"} component={MarketplaceCancel} />
        <Route path={"/marketplace/:slug"} component={MarketplaceProduct} />
        <Route path={"/solutions"} component={Solutions} />
        <Route path={"/about"} component={About} />
        <Route path={"/support"} component={Support} />
        <Route path={"/prompt-packs"} component={PromptPacks} />
        <Route path={"/dfy-services"} component={DfyServices} />
        <Route path={"/hosting"} component={Hosting} />
        <Route path={"/domains"} component={Domains} />
        <Route path={"/shopify-app"} component={ShopifyApp} />
        <Route path={"/free-shopify-store"} component={FreeShopifyStore} />
        <Route path={"/resources"} component={Resources} />
        <Route path={"/get-started"} component={GetStarted} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
