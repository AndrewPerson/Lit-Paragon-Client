(() => {
  // site/ts/site.ts
  var Site = class {
    static NavigateTo(page) {
      if (page.extension) {
        var extensions = this.GetInstalledExtensions();
        if (Object.keys(extensions).includes(page.page)) {
          var newPage = document.getElementById(`extension-${page.page}`);
          if (newPage === null) {
            var extensionPage = document.createElement("extension-page");
            extensionPage.src = extensions[page.page].url;
            extensionPage.id = `extension-${page.page}`;
            document.querySelector("main")?.appendChild(extensionPage);
            newPage = extensionPage;
          }
          this.SetPage(page, newPage);
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
        this.ShowLoginNotification();
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
    static async GetResourceNow(name) {
      var cache = await caches.open("User Resources");
      var response = await cache.match(name);
      if (response)
        return await response.json();
      else
        return void 0;
    }
    static async FetchResources() {
      var { valid, token } = await this.GetToken();
      if (!valid)
        return false;
      var serverUrl = new URL("https://sbhs-random-data.profsmart.repl.co/resources");
      serverUrl.searchParams.append("token", JSON.stringify(token));
      var resourceResponse = await fetch(serverUrl.toString());
      if (!resourceResponse.ok) {
        this.ShowLoginNotification();
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
      return JSON.parse(localStorage.getItem("Installed Extensions") || "{}");
    }
    static SetInstalledExtensions(extensions) {
      localStorage.setItem("Installed Extensions", JSON.stringify(extensions));
      document.querySelector("nav-bar").requestUpdate();
    }
    static async GetExtensionsNow() {
      var cache = await caches.open("Metadata");
      var response = await cache.match("Metadata");
      if (!response)
        return {};
      return (await response.json()).pages || {};
    }
    static async GetExtensions(callback) {
      this.extensionCallbacks.push(callback);
      var extensions = await this.GetExtensionsNow();
      callback(extensions);
    }
    static async FireExtensionCallbacks() {
      var extensions = await this.GetExtensionsNow();
      for (var callback of this.extensionCallbacks)
        callback(extensions);
    }
    static GetExtensionIconURL(extension) {
      var url = new URL(extension.icon, extension.url);
      url.search = `cache-version=${extension.version}`;
      return url.toString();
    }
    static GetExtensionNavIconURL(extension) {
      var url = new URL(extension.navIcon, extension.url);
      url.search = `cache-version=${extension.version}`;
      return url.toString();
    }
    static GetNavbarOrder() {
      return JSON.parse(localStorage.getItem("Nav Order") || "[0, 1, 2, 3, 4, 5]");
    }
    static SetNavbarOrder(order) {
      localStorage.setItem("Nav Order", JSON.stringify(order));
      document.querySelector("nav-bar").requestUpdate();
    }
    static ShowNotification(content, loader = false) {
      var notification = document.createElement("inline-notification");
      if (typeof content === "string")
        notification.innerText = content;
      else
        notification.appendChild(content);
      notification.loader = loader;
      document.getElementById("notification-area")?.appendChild(notification);
      return notification;
    }
    static ShowLoginNotification() {
      var content = document.createElement("p");
      content.innerHTML = `You need to <a>login</a> to see the latest information.`;
      this.ShowNotification(content);
    }
    static SetDark(dark) {
      this.dark = dark;
      document.documentElement.classList.toggle("dark", dark);
      localStorage.setItem("Dark", dark.toString());
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
  Site.dark = localStorage.getItem("Dark") == "true";
  Site.hue = localStorage.getItem("Hue") || "200";
  Site.pageElement = null;
  Site.resourceCallbacks = {};
  Site.extensionCallbacks = [];
  Site.darkCallbacks = [];

  // site/ts/callback.ts
  if (Site.dark)
    document.getElementById("logo-p").src = "images/logo-dark.svg";
  async function Token(code2) {
    var tokenResponse = await fetch("https://sbhs-random-data.profsmart.repl.co/auth", {
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
