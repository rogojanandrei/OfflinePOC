using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TestManifest.Startup))]
namespace TestManifest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
