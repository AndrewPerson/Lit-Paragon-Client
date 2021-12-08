(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // site/js/site.ts
  var Site = class {
    static NavigateTo(page) {
      var _a;
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
            (_a = document.getElementById("pages-container")) == null ? void 0 : _a.appendChild(extensionPage);
          }
        }
      } else
        this.SetPage(page, document.getElementById(page.page));
    }
    static SetPage(page, element) {
      var _a;
      if (element) {
        if (this.pageElement != null)
          this.pageElement.classList.add("hidden");
        element.classList.remove("hidden");
        this.pageElement = element;
        this.page = page;
        location.hash = page.extension ? `extension-${page.page}` : page.page;
        var navbar = document.querySelector("nav-bar");
        navbar.removeAttribute("editing");
        (_a = navbar.requestUpdate) == null ? void 0 : _a.call(navbar);
      }
    }
    static SetResources(resources) {
      return __async(this, null, function* () {
        var cache = yield caches.open("User Resources");
        var promises = [];
        resources.forEach((resourceGroup) => {
          var name = resourceGroup.name;
          var resource = resourceGroup.resource;
          promises.push(cache.put(name, new Response(resource)).then(() => {
            for (var callback of this.resourceCallbacks[name])
              callback(resource);
          }));
        });
        yield Promise.all(promises);
      });
    }
    static SetResource(name, resource) {
      return __async(this, null, function* () {
        var cache = yield caches.open("User Resources");
        yield cache.put(name, new Response(resource));
        if (name in this.resourceCallbacks) {
          for (var callback of this.resourceCallbacks[name])
            callback(resource);
        }
      });
    }
    static GetResource(name, callback) {
      return __async(this, null, function* () {
        if (name in this.resourceCallbacks)
          this.resourceCallbacks[name].push(callback);
        else
          this.resourceCallbacks[name] = [callback];
        var cache = yield caches.open("User Resources");
        var response = yield cache.match(name);
        if (response) {
          var resource = yield response.json();
          if (resource !== void 0 && resource !== null)
            callback(resource);
        }
      });
    }
    static GetInstalledExtensions() {
      return JSON.parse(localStorage.getItem("Installed Extensions")) || {};
    }
    static SetDark(dark) {
      this.dark = dark;
      document.documentElement.classList.toggle("dark", dark);
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
  if (location.hash)
    Site.NavigateTo({
      page: location.hash.substring(1),
      extension: location.hash.indexOf("extension-") == 1
    });
  Site.dark = localStorage.getItem("Dark") == "true";
  Site.hue = localStorage.getItem("Hue") || "200";
})();
