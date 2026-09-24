const config={
  goUrl:"",
  safeUrl:"",
  safeSubscriptionActive:true
};
const safeCard=document.querySelector("#safe-card");
const safeButton=document.querySelector("#safe-button");
if(!config.safeSubscriptionActive){
  safeCard.classList.add("locked");
  safeButton.textContent="LÅST";
  safeButton.disabled=true;
}
document.querySelectorAll("[data-app]").forEach(button=>{
  button.addEventListener("click",()=>{
    const key=button.dataset.app;
    const url=key==="go"?config.goUrl:config.safeUrl;
    if(!url){alert(key==="go"?"RALA GO kobles til her.":"RALA SAFE kobles til her.");return;}
    window.location.href=url;
  });
});