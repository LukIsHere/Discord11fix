/**
 * @name Discord11Fix
 * @author lukistaken
 * @authorLink https://github.com/lukIsHere
 * @invite PwmVfK94zc
 * @version 1.0.1
 * @description Makes new bouble messages work
 * @website https://github.com/LukIsHere/Discord11fix
 * @source https://raw.githubusercontent.com/LukIsHere/Discord11fix/main/discord11fix.plugin.js
 * @updateUrl https://raw.githubusercontent.com/LukIsHere/Discord11fix/main/discord11fix.plugin.js
 */

module.exports = class MyPlugin {
  id;
  observe = new MutationObserver((mutationsList, observer) => {
    //groupStart-3Mlgv1 - OwO this message contains avatar
    //message-2CShn3 - TwT but with only this it doesn't
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach(n => {
        var p = n.parentElement;
        if (p.classList.contains("scrollerContent-2SW0kQ")||p.classList.contains("scrollerInner-2PPAp2")) {
          var prev = false;
          p.querySelectorAll("div.message-2CShn3").forEach(m => {
            if (m.classList.contains("groupStart-3Mlgv1")) {
              var avv = m.querySelectorAll("img");
              prev = false;
              avv.forEach(av => {
                if (!av.classList.contains("avatar-2e8lTP"))
                  return;
                var id = av.src.split("/")[4]
                if (id == this.id) {
                  m.setAttribute("data-is-author-self", "true");
                  prev = true;
                }
              })
            } else {
              if (prev) m.setAttribute("data-is-author-self", "true");
            }
          })
        }
      })
    });
  });
  constructor() {
    //UwU
  }
  start() {
    this.id = window.__SENTRY__.hub._stack[0].scope._user.id;//>w< don't ask where i got this location from

    const config = { childList: true, subtree: true };

    this.observe.observe(document.getElementsByClassName("base-2jDfDU")[0], config)
  }
  stop() {
    this.observe.disconnect();
  }
};