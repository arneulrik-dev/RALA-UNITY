const config={goUrl:"https://rala-opzfqbw4x-rala-go.vercel.app",safeUrl:"",safeSubscriptionActive:true};
const safeCard=document.querySelector("#safe-card");
const safeButton=document.querySelector("#safe-button");
if(!config.safeSubscriptionActive){safeCard.classList.add("locked");safeButton.textContent="LÅST";safeButton.disabled=true;}
document.querySelectorAll("[data-app]").forEach(button=>button.addEventListener("click",()=>{const key=button.dataset.app;const url=key==="go"?config.goUrl:config.safeUrl;if(!url){alert(key==="go"?"RALA GO kobles til her.":"RALA SAFE kobles til her.");return;}window.location.href=url;}));

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));}
let deferredPrompt=null;
const installButton=document.querySelector("#install-button");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installButton.hidden=false;});
installButton.addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installButton.hidden=true;});
window.addEventListener("appinstalled",()=>{installButton.hidden=true;});
const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
const standalone=window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
if(isiOS&&!standalone)document.querySelector("#ios-install").hidden=false;