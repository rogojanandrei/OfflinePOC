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
            var manifestResult = new ManifestResult("1.9")
            {
                CacheResources = new List<string>
                {
                    Url.Action("Start", "Offline"),
                    Url.Content("~/content/style.css"),
                    Url.Content("~/scripts/main.js"),
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
    }
}