using System.Collections.Generic;
using System.Web.Mvc;
using TestManifest.Manifest;

namespace TestManifest.Controllers
{
    public class OfflineController : Controller
    {
        public ActionResult Start()
        {
            return View();
        }

        public ActionResult Manifest()
        {
            var manifestResult = new ManifestResult("1.2")
            {
                CacheResources = new List<string>
                {
                    Url.Action("Start", "Offline"),
                    Url.Content("~/content/style.css"),
                    Url.Content("~/bundles/jquery"),
                    Url.Content("~/scripts/main.js"),
                     Url.Content("~/scripts/app/dexie.js"),
                    Url.Content("~/scripts/cache.js"),
                    Url.Content("~/scripts/highcharts/highcharts.js"),
                    Url.Content("~/scripts/highcharts/exporting.js"),
                    Url.Content("~/content/images/logo_offline.png"),
                    Url.Content("~/content/images/logo_online.png")
                },
                NetworkResources = new[] { Url.Action("Index", "Home") },
                FallbackResources =
                {
                    {Url.Content("~/content/images/logo_online.png"), Url.Content("~/content/images/logo_offline.png") }
                }
            };
            return manifestResult;
        }

        [HttpGet]
        public ActionResult GetData()
        {
            var series = new[]
            {
                new
                {
                    name = "Installation",
                    data = new[] {43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175}
                },
                new
                {
                    name = "Manufacturing",
                    data = new[] {24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434}
                },
                new
                {
                    name = "Sales & Distribution",
                    data = new[] {11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387}
                },
                new
                {
                    name = "Project Development",
                    data = new[] {7988, 7988, 7988, 12169, 15112, 22452, 34400, 34227}
                },
                new
                {
                    name = "Other",
                    data = new[] {12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111}
                }
            };

            return  Json(series, JsonRequestBehavior.AllowGet);
        }
    }
}