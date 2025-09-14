import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./pages/index";
import { Landing } from "./pages/landing";
import { NotFound } from "./pages/not-found";

export const Router = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<App />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
);
