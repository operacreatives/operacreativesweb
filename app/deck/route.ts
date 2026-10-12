import { readFile } from "node:fs/promises";
import path from "node:path";

// Serves the standalone pitch deck HTML at /deck, with PostHog tracking injected.
// Set NEXT_PUBLIC_POSTHOG_KEY (and optionally NEXT_PUBLIC_POSTHOG_HOST) to enable tracking.

export const dynamic = "force-static";

const DECK_FILE = path.join(process.cwd(), "content", "deck.html");

function trackingScript(key: string, host: string): string {
  const config = JSON.stringify({ key, host });
  return `<script>
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
(function(){
  var cfg=${config};
  var params=new URLSearchParams(location.search);
  posthog.init(cfg.key,{api_host:cfg.host,person_profiles:"always",capture_pageview:true,capture_pageleave:true,autocapture:true});
  // ?ref=acme on the link tags every event for that recipient
  var ref=params.get("ref")||params.get("utm_source");
  if(ref){posthog.register({deck_ref:ref});}
  posthog.register({deck:"pitch-deck-v2"});
  posthog.capture("deck_opened");

  var start=Date.now(),visibleMs=0,visibleSince=document.hidden?null:Date.now();
  var current=null,slideSince=Date.now(),seen={},maxSlide=0;
  function slideNow(){
    var slides=document.querySelectorAll(".deck-slide"),mid=innerHeight/2,i,r;
    if(document.documentElement.classList.contains("deck-stage")){
      for(i=0;i<slides.length;i++)if(!slides[i].hasAttribute("data-off"))return Number(slides[i].id)||i+1;
    }
    for(i=0;i<slides.length;i++){r=slides[i].getBoundingClientRect();if(r.top<=mid&&r.bottom>=mid)return Number(slides[i].id)||i+1;}
    return current||1;
  }
  function label(n){var el=document.getElementById(String(n));return el?el.getAttribute("data-label"):null;}
  function endSlide(){
    if(current===null)return;
    var ms=Date.now()-slideSince;
    if(ms>300)posthog.capture("deck_slide_viewed",{slide:current,slide_label:label(current),seconds_on_slide:Math.round(ms/100)/10});
  }
  function tick(){
    if(document.hidden)return;
    var n=slideNow();
    if(n!==current){endSlide();current=n;slideSince=Date.now();seen[n]=1;if(n>maxSlide)maxSlide=n;}
  }
  setInterval(tick,500);tick();
  document.addEventListener("visibilitychange",function(){
    if(document.hidden){if(visibleSince){visibleMs+=Date.now()-visibleSince;visibleSince=null;}endSlide();current=null;}
    else{visibleSince=Date.now();tick();}
  });
  var closed=false;
  function close(){
    if(closed)return;closed=true;
    endSlide();
    if(visibleSince){visibleMs+=Date.now()-visibleSince;visibleSince=null;}
    posthog.capture("deck_closed",{seconds_visible:Math.round(visibleMs/1000),seconds_total:Math.round((Date.now()-start)/1000),slides_seen:Object.keys(seen).length,furthest_slide:maxSlide},{transport:"sendBeacon"});
  }
  window.addEventListener("pagehide",close);
})();
</script>`;
}

export async function GET(): Promise<Response> {
  const html = await readFile(DECK_FILE, "utf8");
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  const body = html.replace("<!--POSTHOG-->", key ? trackingScript(key, host) : "");

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
