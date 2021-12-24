(() => {
  // site/js/site.ts
  var Site = class {
    static NavigateTo(page) {
      if (page.extension) {
        var extensions = this.GetInstalledExtensions();
        if (Object.keys(extensions).indexOf(page.page) != -1) {
          var newPage = document.getElementById(`extension-${page.page}`);
          if (newPage)
            this.SetPage(page, newPage);
          else {
            var extensionPage = document.createElement("extension-page");
            extensionPage.src = extensions[page.page].url;
            extensionPage.id = `extension-${page.page}`;
            document.getElementById("pages-container")?.appendChild(extensionPage);
          }
        }
      } else
        this.SetPage(page, document.getElementById(page.page));
    }
    static SetPage(page, element) {
      if (element) {
        if (this.pageElement != null)
          this.pageElement.classList.add("hidden");
        element.classList.remove("hidden");
        this.pageElement = element;
        this.page = page;
        location.hash = page.extension ? `extension-${page.page}` : page.page;
        var navbar = document.querySelector("nav-bar");
        navbar.removeAttribute("editing");
        navbar.requestUpdate?.();
      }
    }
    static async GetToken() {
      var cache = await caches.open("User Resources");
      var tokenResponse = await cache.match("Token");
      if (!tokenResponse) {
        location.href = `${location.origin}/login`;
        return {
          valid: false,
          token: null
        };
      }
      var token = await tokenResponse.json();
      if (new Date() > token.termination) {
        this.ShowLoginPopup();
        return {
          valid: false,
          token: null
        };
      }
      return {
        valid: true,
        token
      };
    }
    static async SetResources(resources) {
      var cache = await caches.open("User Resources");
      var promises = [];
      resources.forEach((resourceGroup) => {
        var name = resourceGroup.name;
        var resource = resourceGroup.resource;
        promises.push(cache.put(name, new Response(resource)).then(() => {
          if (name in this.resourceCallbacks)
            for (var callback of this.resourceCallbacks[name])
              callback(JSON.parse(resource));
        }));
      });
      await Promise.all(promises);
    }
    static async SetResource(name, resource) {
      var cache = await caches.open("User Resources");
      await cache.put(name, new Response(resource));
      if (name in this.resourceCallbacks)
        for (var callback of this.resourceCallbacks[name])
          callback(JSON.parse(resource));
    }
    static async GetResource(name, callback) {
      if (name in this.resourceCallbacks)
        this.resourceCallbacks[name].push(callback);
      else
        this.resourceCallbacks[name] = [callback];
      var cache = await caches.open("User Resources");
      var response = await cache.match(name);
      if (response) {
        var resource = await response.json();
        callback(resource);
      } else
        callback(void 0);
    }
    static async FetchResources() {
      var { valid, token } = await this.GetToken();
      if (!valid)
        return false;
      var serverUrl = new URL("https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default/resources");
      serverUrl.searchParams.append("token", JSON.stringify(token));
      var resourceResponse = await fetch(serverUrl.toString());
      if (!resourceResponse.ok) {
        this.ShowLoginPopup();
        return false;
      }
      var resourceResult = await resourceResponse.json();
      var cache = await caches.open("User Resources");
      await cache.put("Token", new Response(JSON.stringify(resourceResult.token)));
      await this.SetResources(Object.keys(resourceResult.result).map((key) => {
        return {
          name: key,
          resource: JSON.stringify(resourceResult.result[key])
        };
      }));
      return true;
    }
    static GetInstalledExtensions() {
      return JSON.parse(localStorage.getItem("Installed Extensions")) || {};
    }
    static ShowLoginPopup() {
      var notification = document.createElement("inline-notification");
      var content = document.createElement("p");
      content.innerHTML = `You need to <a>login</a> to see the latest information.`;
      notification.appendChild(content);
      document.body.appendChild(notification);
    }
    static SetDark(dark) {
      this.dark = dark;
      document.documentElement.classList.toggle("dark", dark);
      for (var callback of this.darkCallbacks) {
        callback(dark);
      }
    }
    static ListenForDark(callback) {
      this.darkCallbacks.push(callback);
    }
    static SetColour(hue) {
      document.documentElement.style.setProperty("--main-hue", hue);
      document.documentElement.style.setProperty("--hue-rotate", `${parseFloat(hue) - 200}deg`);
    }
  };
  Site.page = {
    page: "dailytimetable",
    extension: false
  };
  Site.dark = false;
  Site.hue = "200";
  Site.pageElement = null;
  Site.resourceCallbacks = {};
  Site.darkCallbacks = [];

  // site/js/callback.ts
  if (Site.dark)
    document.getElementById("logo-p").src = "images/logo-dark.svg";
  async function Token(code2) {
    var tokenResponse = await fetch("https://au-syd.functions.appdomain.cloud/api/v1/web/6bbc35c7-dc9e-4df5-9708-71beb3b96f36/default/auth", {
      method: "POST",
      body: code2
    });
    if (tokenResponse.status != 200)
      return false;
    if (!tokenResponse)
      return false;
    var resourceCache = await caches.open("User Resources");
    resourceCache.put("Token", tokenResponse);
    return true;
  }
  var params = new URLSearchParams(window.location.search);
  var code = params.get("code");
  Token(code).then((succeeded) => {
    location.href = `${location.origin}/${succeeded ? "" : "login"}`;
  });
})();
