﻿using System.Web.Http;

namespace TestManifest.Controllers
{
    public class ReportDataController : ApiController
    {
        // GET: api/ReportData
        public dynamic GetData()
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

            return series;
        }

    }
}
