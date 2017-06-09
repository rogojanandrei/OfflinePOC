using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace TestManifest.Manifest
{
    public class ManifestResult : FileResult
    {
        public ManifestResult(string version)
            : base("text/cache-manifest")
        {
            Version = version;
            CacheResources = new List<string>();
            NetworkResources = new List<string>();
            FallbackResources = new Dictionary<string, string>();
        }

        public string Version { get; set; }
        public IEnumerable<string> CacheResources { get; set; }
        public IEnumerable<string> NetworkResources { get; set; }
        public Dictionary<string, string> FallbackResources { get; set; }

        protected override void WriteFile(HttpResponseBase response)
        {
            WriteManifestHeader(response);
            WriteCacheResources(response);
            WriteNetwork(response);
            WriteFallback(response);
        }

        private void WriteManifestHeader(HttpResponseBase response)
        {
            response.Output.WriteLine("CACHE MANIFEST");
            response.Output.WriteLine("#V" + Version ?? string.Empty);
        }

        private void WriteCacheResources(HttpResponseBase response)
        {
            response.Output.WriteLine("CACHE:");
            foreach (var cacheResource in CacheResources)
                response.Output.WriteLine(cacheResource);
        }

        private void WriteNetwork(HttpResponseBase response)
        {
            response.Output.WriteLine();
            response.Output.WriteLine("NETWORK:");
            foreach (var networkResource in NetworkResources)
                response.Output.WriteLine(networkResource);
        }

        private void WriteFallback(HttpResponseBase response)
        {
            response.Output.WriteLine();
            response.Output.WriteLine("FALLBACK:");
            foreach (var fallbackResource in FallbackResources)
                response.Output.WriteLine(fallbackResource.Key + " " + fallbackResource.Value);
        }
    }
}