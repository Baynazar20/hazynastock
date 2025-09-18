import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 relative">
        <div className="absolute inset-0 central-asian-pattern opacity-10"></div>
        <div className="text-center relative z-10 px-4">
          <div className="flex justify-center mb-8">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl">
              <Star className="h-10 w-10 text-white fill-current" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Страница не найдена
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            К сожалению, эта страница не существует в нашей коллекции контента Центральной Азии.
          </p>

          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Home className="h-5 w-5 mr-2" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
