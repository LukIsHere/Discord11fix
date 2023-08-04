/**
 * @name Discord11Fix
 * @author lukistaken
 * @authorLink https://github.com/lukIsHere
 * @invite PwmVfK94zc
 * @version 1.0.2
 * @description Makes new bouble messages work
 * @website https://github.com/LukIsHere/Discord11fix
 * @source https://raw.githubusercontent.com/LukIsHere/Discord11fix/main/discord11fix.plugin.js
 * @updateUrl https://raw.githubusercontent.com/LukIsHere/Discord11fix/main/discord11fix.plugin.js
 */

//yo i put some effort into makin it readable
module.exports = class MyPlugin {
  currentUserId;
  isCurrentUserMessage(m){
    var out = false;
    
    m.querySelectorAll("img").forEach(av => {//get all images message element has
      if (!av.classList.contains("avatar-2e8lTP"))//check if message is pfp
        return;
      
      //this is how pfp link looks like
      //https://cdn.discordapp.com/avatars/537649475494215690/70bebfde8db1a02799a7622783150bc3.webp?size=80
      //537649475494215690 is id of user
      //kinda clever solution i guess
      var id = av.src.split("/")[4]
      if (id != this.currentUserId)
        return;

      m.setAttribute("data-is-author-self", "true");
      out = true;
    })

    return out;
  }
  updateMessages(){
    var prev = false;
    document.querySelectorAll("div.message-2CShn3").forEach(m => {//get all messages
      if (m.classList.contains("groupStart-3Mlgv1"))//does message contain pfp
        prev = this.isCurrentUserMessage(m)
      else if(prev)//was previous message current user message
        m.setAttribute("data-is-author-self", "true");
    })
  }
  //object listens for changes inside specyfic element
  observe = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach(n => {
        //parent element of added element
        var p = n.parentElement;
        
        if (p.classList.contains("scrollerContent-2SW0kQ"))//when we switch/move in chat
          this.updateMessages()
        if(p.classList.contains("scrollerInner-2PPAp2"))//when we send a message
          this.updateMessages();
      })
    });
  });
  constructor() {
    //UwU nothin here
  }
  start() {
    //>w< don't ask where i got this location from
    //it just is id of current user
    this.currentUserId = window.__SENTRY__.hub._stack[0].scope._user.id;

    //some configuration for observer
    const config = { childList: true, subtree: true };

    //we start observing
    this.observe.observe(document.getElementsByClassName("base-2jDfDU")[0], config)
  }
  stop() {
    //we stop observing
    this.observe.disconnect();
  }
};