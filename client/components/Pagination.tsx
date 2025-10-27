import { Button } from "@/components/ui/button";
import { t } from "i18next";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-between items-center  px-6 py-4 border-t border-border">
      <div className="flex items-center">
        {currentPage > 1 && (
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(1)}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
          >
            <span>←</span>
            <span>{t("goFirstPage")}</span>
          </Button>
        )}
      </div>

      <div className="flex items-center">
        {currentPage < totalPages && (
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex items-center space-x-2 px-4"
          >
            <span>{t("nextPage")}</span>
            <span>→</span>
          </Button>
        )}
      </div>
      <div className="flex items-center text-muted-foreground text-sm">
        <span>{t("page")}</span>
        <span className="mx-2 px-2 py-1 bg-dark-surface2 rounded text-foreground min-w-[40px] text-center">
          {currentPage}
        </span>
        <span> {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
