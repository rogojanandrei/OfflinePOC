using System.Web.Mvc;

namespace TestManifest.Controllers
{
    public class ChartViewController : Controller
    {
        // GET: ChartView
        public ActionResult ChartResult()
        {
            return View("~/Views/Offline/Report.cshtml");
        }
    }
}