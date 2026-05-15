import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createBooking } from "@/lib/bookings.functions";

export const Route = createFileRoute("/")({
  component: InnergyPage,
  head: () => ({
    meta: [
      { title: "INNERGY — Leader Rejuvenation Platform" },
      { name: "description", content: "Drive exceptional results without burning out your best people. Book a session with INNERGY's leader rejuvenation experts." },
      { property: "og:title", content: "INNERGY — Leader Rejuvenation Platform" },
      { property: "og:description", content: "Help your highest-performing leaders hit their goals without sacrificing their health. Sessions, 5D protocol, and expert coaching." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap" },
    ],
  }),
});

const STYLES = `
:root{--ink:#0D0D0F;--ink2:#1A1A20;--ink3:#26262E;--gold:#C9A55A;--gold2:#E2C278;--gold3:#F5E4BC;--cream:#FAF7F2;--cream2:#F2EDE4;--cream3:#E0D8CB;--mist:#FDFCFA;--rose:#D4856A;--sage:#7A9B8A;--lav:#9B8FB5;--text:#1C1C22;--text2:#5A5A68;--text3:#9A9AA8;--border:rgba(201,165,90,.18)}
.innergy *,.innergy *::before,.innergy *::after{margin:0;padding:0;box-sizing:border-box}
.innergy{font-family:'Jost',sans-serif;background:var(--ink);color:var(--cream);overflow-x:hidden}
.innergy a{text-decoration:none;color:inherit}
.innergy button{font-family:'Jost',sans-serif;cursor:pointer}
.innergy ::-webkit-scrollbar{width:3px}
.innergy ::-webkit-scrollbar-track{background:var(--ink2)}
.innergy ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
.innergy .rv{opacity:0;transform:translateY(30px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
.innergy .rv.in{opacity:1;transform:none}
.innergy .d1{transition-delay:.1s}.innergy .d2{transition-delay:.2s}.innergy .d3{transition-delay:.3s}.innergy .d4{transition-delay:.4s}
.innergy .serif{font-family:'Playfair Display',serif}
.innergy .tag-line{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:400;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold)}
.innergy .tag-line::before{content:'';display:block;width:22px;height:1px;background:var(--gold);flex-shrink:0}
.innergy .sec-h{font-family:'Playfair Display',serif;font-size:clamp(36px,4.2vw,58px);font-weight:400;line-height:1.08}
.innergy .sec-h em{font-style:italic;color:var(--gold2)}
.innergy .sec-h.dk{color:var(--text)}
.innergy .sec-h.dk em{color:var(--gold)}
.innergy .sec-lead{font-size:15px;font-weight:300;line-height:1.9;color:rgba(250,247,242,.42);max-width:540px;margin-top:18px}
.innergy .sec-lead.dk{color:var(--text2)}
/* NAV — FIXED, no shrink/move on scroll */
.innergy .nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:20px 68px;background:rgba(13,13,15,.93);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
.innergy .nav-logo{font-family:'Playfair Display',serif;font-size:21px;font-weight:400;letter-spacing:7px;text-transform:uppercase;color:var(--cream)}
.innergy .nav-logo .dot{color:var(--gold)}
.innergy .nav-links{display:flex;gap:40px;list-style:none}
.innergy .nav-links a{font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(250,247,242,.5);transition:color .3s;position:relative}
.innergy .nav-links a::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:1px;background:var(--gold);transition:width .35s}
.innergy .nav-links a:hover{color:var(--gold)}
.innergy .nav-links a:hover::after{width:100%}
.innergy .nav-cta{padding:11px 28px;border:1px solid var(--border);background:transparent;color:var(--gold3);font-size:10px;letter-spacing:2.5px;text-transform:uppercase;transition:all .35s;border-radius:1px}
.innergy .nav-cta:hover{background:var(--gold);color:var(--ink);border-color:var(--gold)}
.innergy .nav-mob{display:none;background:none;border:none;color:var(--cream);font-size:22px}
/* Push content below fixed nav */
.innergy .hero{min-height:100vh;position:relative;display:flex;align-items:center;overflow:hidden;background:var(--ink)}
.innergy .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 65% 45%,rgba(201,165,90,.065) 0%,transparent 70%),radial-gradient(ellipse 50% 70% at 15% 75%,rgba(122,155,138,.04) 0%,transparent 60%);pointer-events:none}
.innergy .hero-vline{position:absolute;top:-10%;right:38%;width:1px;height:120%;background:linear-gradient(to bottom,transparent,rgba(201,165,90,.1),transparent);transform:rotate(6deg);pointer-events:none}
.innergy .hero-vline2{position:absolute;top:-10%;right:33%;width:1px;height:120%;background:linear-gradient(to bottom,transparent,rgba(201,165,90,.05),transparent);transform:rotate(6deg);pointer-events:none}
.innergy .hero-body{position:relative;z-index:2;padding:148px 68px 80px;max-width:820px}
.innergy .hero-pill{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border:1px solid rgba(201,165,90,.22);border-radius:40px;background:rgba(201,165,90,.04);font-size:10px;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold);margin-bottom:38px}
.innergy .hero-pill span{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:innblink 2s infinite}
@keyframes innblink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.5)}}
.innergy .hero-h1{font-family:'Playfair Display',serif;font-size:clamp(50px,6.2vw,92px);font-weight:400;line-height:1.0;letter-spacing:-1px;color:var(--cream);margin-bottom:30px}
.innergy .hero-h1 em{font-style:italic;color:var(--gold2)}
.innergy .hero-h1 .ind{display:block;padding-left:72px}
.innergy .hero-sub{font-size:16px;font-weight:300;line-height:1.9;color:rgba(250,247,242,.48);max-width:510px;margin-bottom:50px}
.innergy .hero-btns{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.innergy .btn-g{display:inline-flex;align-items:center;gap:10px;padding:16px 36px;background:var(--gold);color:var(--ink);border:none;font-size:10.5px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;transition:all .35s;border-radius:2px;position:relative;overflow:hidden;cursor:pointer}
.innergy .btn-g::before{content:'';position:absolute;inset:0;background:var(--gold2);transform:scaleX(0);transform-origin:left;transition:transform .38s cubic-bezier(.16,1,.3,1)}
.innergy .btn-g:hover::before{transform:scaleX(1)}
.innergy .btn-g span{position:relative;z-index:1}
.innergy .btn-o{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;background:transparent;color:rgba(250,247,242,.58);border:1px solid rgba(250,247,242,.14);font-size:10.5px;font-weight:300;letter-spacing:2px;text-transform:uppercase;transition:all .35s;border-radius:2px;cursor:pointer}
.innergy .btn-o:hover{border-color:var(--gold);color:var(--gold)}
.innergy .hero-nums{position:absolute;right:68px;bottom:72px;z-index:2;display:flex;flex-direction:column;gap:28px;align-items:flex-end}
.innergy .hnum-val{font-family:'Playfair Display',serif;font-size:40px;font-weight:400;color:var(--cream);line-height:1;text-align:right}
.innergy .hnum-lbl{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--text3);text-align:right;margin-top:3px}
.innergy .hero-scroll{position:absolute;bottom:38px;left:68px;z-index:2;display:flex;align-items:center;gap:12px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--text3)}
.innergy .scroll-bar{width:40px;height:1px;background:var(--text3);animation:innsbar 2s ease-in-out infinite}
@keyframes innsbar{0%,100%{width:38px}50%{width:65px}}
.innergy .ticker{background:var(--gold);padding:11px 0;overflow:hidden}
.innergy .ticker-t{display:flex;animation:inntick 34s linear infinite;white-space:nowrap}
@keyframes inntick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.innergy .ti{display:inline-flex;align-items:center;gap:18px;padding:0 28px;font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--ink)}
.innergy .td{font-size:5px;opacity:.45}
.innergy .pain-sec{background:var(--cream);padding:120px 68px}
.innergy .pain-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;max-width:1280px;margin:0 auto}
.innergy .pain-q{font-family:'Playfair Display',serif;font-size:clamp(28px,3.2vw,44px);font-weight:400;line-height:1.3;color:var(--text);font-style:italic;padding-left:28px;border-left:3px solid var(--gold)}
.innergy .pain-co{margin-top:36px;padding:32px 36px;background:var(--ink2);border-left:3px solid var(--gold);font-family:'Playfair Display',serif;font-size:21px;font-weight:400;line-height:1.6;font-style:italic;color:rgba(250,247,242,.82);border-radius:0 4px 4px 0}
.innergy .pain-right{display:flex;flex-direction:column;gap:20px}
.innergy .pstat{padding:28px;border:1px solid var(--cream3);background:white;border-radius:4px;transition:all .35s}
.innergy .pstat:hover{box-shadow:0 14px 50px rgba(13,13,15,.09);transform:translateY(-3px)}
.innergy .pnum{font-family:'Playfair Display',serif;font-size:52px;font-weight:400;color:var(--gold);line-height:1;margin-bottom:8px}
.innergy .ptext{font-size:14px;font-weight:300;line-height:1.7;color:var(--text2)}
.innergy .psrc{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-top:8px}
.innergy .pfeels{margin-top:4px;padding:28px;background:var(--ink2);border:1px solid rgba(201,165,90,.1);border-radius:4px}
.innergy .pfeels-h{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
.innergy .pfeels-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.innergy .pfeel{padding:12px;background:rgba(255,255,255,.04);border-radius:3px;font-size:12px;color:rgba(250,247,242,.45);font-weight:300;line-height:1.6}
.innergy .how-sec{background:var(--ink2);padding:120px 68px}
.innergy .how-inner{max-width:1280px;margin:0 auto}
.innergy .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.04);margin-top:64px}
.innergy .step{padding:52px 36px;background:var(--ink2);position:relative;transition:background .4s}
.innergy .step:hover{background:var(--ink3)}
.innergy .step-n{font-family:'Playfair Display',serif;font-size:80px;font-weight:400;color:rgba(201,165,90,.07);line-height:1;margin-bottom:22px;display:block}
.innergy .step-ico{font-size:30px;margin-bottom:18px}
.innergy .step-ttl{font-family:'Playfair Display',serif;font-size:23px;font-weight:400;color:var(--cream);margin-bottom:12px}
.innergy .step-bd{font-size:13.5px;font-weight:300;line-height:1.8;color:rgba(250,247,242,.4)}
.innergy .step-arr{position:absolute;top:50%;right:-1px;transform:translateY(-50%);width:30px;height:30px;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--ink);z-index:1}
.innergy .step:last-child .step-arr{display:none}
.innergy .sess-sec{background:var(--ink);padding:120px 68px}
.innergy .sess-inner{max-width:1280px;margin:0 auto}
.innergy .sess-hdr{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-bottom:56px}
.innergy .sess-filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:48px}
.innergy .sf{padding:9px 20px;border:1px solid rgba(201,165,90,.16);background:transparent;color:rgba(250,247,242,.42);font-family:'Jost',sans-serif;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;transition:all .3s;border-radius:40px;cursor:pointer}
.innergy .sf.on{background:var(--gold);color:var(--ink);border-color:var(--gold);font-weight:500}
.innergy .sf:hover:not(.on){border-color:var(--gold);color:var(--gold)}
.innergy .sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.innergy .sc{border:1px solid rgba(255,255,255,.05);border-radius:4px;overflow:hidden;background:var(--ink2);transition:all .4s;position:relative;cursor:pointer}
.innergy .sc:hover{transform:translateY(-7px);border-color:rgba(201,165,90,.28);box-shadow:0 36px 80px rgba(13,13,15,.45)}
.innergy .sc-img{height:195px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.innergy .sc-emo{font-size:70px;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.innergy .sc:hover .sc-emo{transform:scale(1.18) rotate(-6deg)}
.innergy .sc-ov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 25%,rgba(13,13,15,.8))}
.innergy .sc-pill{position:absolute;top:13px;left:13px;padding:5px 12px;border-radius:40px;font-size:9px;letter-spacing:2px;text-transform:uppercase}
.innergy .pl{background:rgba(93,187,100,.12);color:#6BD876;border:1px solid rgba(93,187,100,.2)}
.innergy .ph{background:rgba(201,165,90,.12);color:var(--gold);border:1px solid rgba(201,165,90,.2)}
.innergy .pn{background:rgba(155,143,181,.12);color:#BBAFE0;border:1px solid rgba(155,143,181,.2)}
.innergy .sc-t{position:absolute;bottom:12px;right:13px;font-size:11px;color:rgba(250,247,242,.55)}
.innergy .sc-body{padding:22px}
.innergy .sc-cat{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:9px}
.innergy .sc-ttl{font-family:'Playfair Display',serif;font-size:22px;font-weight:400;line-height:1.2;color:var(--cream);margin-bottom:9px}
.innergy .sc-desc{font-size:13px;font-weight:300;line-height:1.75;color:rgba(250,247,242,.35);margin-bottom:18px}
.innergy .sc-ft{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid rgba(255,255,255,.05)}
.innergy .sc-exp{display:flex;align-items:center;gap:9px}
.innergy .sc-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:12px;color:white;flex-shrink:0}
.innergy .sc-en{font-size:12px;color:rgba(250,247,242,.4)}
.innergy .sc-dur{font-size:11px;color:rgba(250,247,242,.28)}
.innergy .sc-book{display:block;width:100%;margin-top:14px;padding:11px;background:var(--gold);color:var(--ink);border:none;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:500;border-radius:2px;cursor:pointer;transition:background .3s}
.innergy .sc-book:hover{background:var(--gold2)}
.innergy .dim-sec{background:var(--cream2);padding:120px 68px}
.innergy .dim-inner{max-width:1280px;margin:0 auto}
.innergy .dim-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.innergy .dc{padding:38px 30px;background:white;border:1px solid var(--cream3);border-radius:4px;position:relative;overflow:hidden;transition:all .4s}
.innergy .dc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .4s}
.innergy .dc:hover::after{transform:scaleX(1)}
.innergy .dc:hover{box-shadow:0 20px 60px rgba(13,13,15,.1);transform:translateY(-5px)}
.innergy .dc-ico{font-size:38px;margin-bottom:18px}
.innergy .dc-ttl{font-family:'Playfair Display',serif;font-size:25px;font-weight:400;color:var(--text);margin-bottom:5px}
.innergy .dc-sub{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-bottom:13px}
.innergy .dc-bd{font-size:13px;font-weight:300;line-height:1.75;color:var(--text2)}
.innergy .price-sec{background:var(--ink2);padding:120px 68px}
.innergy .price-inner{max-width:1120px;margin:0 auto}
.innergy .price-hdr{text-align:center;margin-bottom:68px}
.innergy .price-hdr .tag-line{justify-content:center}
.innergy .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:64px}
.innergy .plan{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:48px 34px;background:var(--ink3);position:relative;transition:all .4s}
.innergy .plan:hover{box-shadow:0 24px 80px rgba(13,13,15,.3)}
.innergy .plan.feat{background:var(--ink);border-color:var(--gold);transform:scale(1.04);box-shadow:0 0 0 1px var(--gold),0 40px 100px rgba(201,165,90,.1)}
.innergy .plan.feat:hover{transform:scale(1.04) translateY(-4px)}
.innergy .plan-crown{position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:var(--gold);color:var(--ink);padding:6px 22px;font-size:9px;letter-spacing:3px;text-transform:uppercase;font-weight:500;border-radius:0 0 4px 4px}
.innergy .plan-nm{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:22px}
.innergy .plan-pr{font-family:'Playfair Display',serif;font-size:62px;font-weight:400;line-height:1;color:var(--cream);margin-bottom:4px}
.innergy .plan-per{font-size:12px;color:rgba(250,247,242,.28);margin-bottom:32px}
.innergy .plan-hr{height:1px;background:rgba(255,255,255,.06);margin-bottom:26px}
.innergy .plan-feats{list-style:none;margin-bottom:34px}
.innergy .pf{display:flex;align-items:flex-start;gap:12px;font-size:13px;font-weight:300;color:rgba(250,247,242,.48);padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);line-height:1.6}
.innergy .pfi{color:var(--gold);font-size:12px;margin-top:2px;flex-shrink:0}
.innergy .plan-btn{width:100%;padding:15px;border-radius:2px;font-family:'Jost',sans-serif;font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;transition:all .35s;cursor:pointer}
.innergy .btn-outline-p{background:transparent;border:1px solid rgba(255,255,255,.1);color:rgba(250,247,242,.45)}
.innergy .btn-outline-p:hover{border-color:var(--gold);color:var(--gold)}
.innergy .btn-gold-p{background:var(--gold);border:1px solid var(--gold);color:var(--ink);font-weight:500}
.innergy .btn-gold-p:hover{background:var(--gold2)}
.innergy .footer{background:var(--ink);padding:80px 68px 48px;border-top:1px solid var(--border)}
.innergy .fg{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:56px;max-width:1280px;margin:0 auto 56px}
.innergy .f-logo{font-family:'Playfair Display',serif;font-size:20px;letter-spacing:7px;text-transform:uppercase;margin-bottom:14px;display:block}
.innergy .f-tg{font-size:13px;font-weight:300;line-height:1.8;color:rgba(250,247,242,.28);max-width:268px;margin-bottom:26px}
.innergy .f-ch{font-size:10px;letter-spacing:3.5px;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
.innergy .f-col ul{list-style:none}
.innergy .f-col li{margin-bottom:10px}
.innergy .f-col a{font-size:13px;font-weight:300;color:rgba(250,247,242,.3);transition:color .3s}
.innergy .f-col a:hover{color:var(--gold3)}
.innergy .f-bot{display:flex;align-items:center;justify-content:space-between;padding-top:26px;border-top:1px solid rgba(255,255,255,.05);max-width:1280px;margin:0 auto}
.innergy .f-cp{font-size:11px;color:rgba(250,247,242,.17);letter-spacing:1px}
.innergy .modal-bg{display:none;position:fixed;inset:0;z-index:700;background:rgba(13,13,15,.88);backdrop-filter:blur(16px);align-items:center;justify-content:center}
.innergy .modal-bg.open{display:flex}
.innergy .modal{background:var(--cream);width:520px;max-width:96vw;padding:54px;border-radius:4px;position:relative;animation:innmIn .45s cubic-bezier(.16,1,.3,1);box-shadow:0 60px 120px rgba(13,13,15,.5);color:var(--text)}
@keyframes innmIn{from{opacity:0;transform:scale(.93) translateY(20px)}to{opacity:1;transform:none}}
.innergy .mx{position:absolute;top:18px;right:18px;background:none;border:none;font-size:18px;color:var(--text3);transition:color .2s;cursor:pointer}
.innergy .mx:hover{color:var(--text)}
.innergy .m-tag{margin-bottom:11px}
.innergy .m-h{font-family:'Playfair Display',serif;font-size:36px;font-weight:400;color:var(--text);margin-bottom:7px}
.innergy .m-sub{font-size:13px;font-weight:300;color:var(--text2);margin-bottom:30px;line-height:1.7}
.innergy .field{margin-bottom:14px}
.innergy .fl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);display:block;margin-bottom:7px}
.innergy .fi{width:100%;padding:13px 15px;border:1px solid var(--cream3);background:white;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--text);outline:none;transition:border-color .3s;border-radius:2px}
.innergy .fi:focus{border-color:var(--gold)}
.innergy .mplans{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:18px 0 26px}
.innergy .mpl{padding:13px 10px;text-align:center;border:1px solid var(--cream3);border-radius:3px;background:white;transition:all .3s;cursor:pointer}
.innergy .mpl.sel{border-color:var(--gold);background:rgba(201,165,90,.05)}
.innergy .mpl-n{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:5px}
.innergy .mpl.sel .mpl-n{color:var(--gold)}
.innergy .mpl-p{font-family:'Playfair Display',serif;font-size:21px;font-weight:400;color:var(--text)}
.innergy .m-sub-btn{width:100%;padding:15px;background:var(--ink);color:var(--gold3);border:none;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;transition:all .35s;border-radius:2px;cursor:pointer}
.innergy .m-sub-btn:hover{background:var(--gold);color:var(--ink)}
.innergy .m-sub-btn:disabled{opacity:.6;cursor:not-allowed}
.innergy .m-fine{text-align:center;font-size:11px;color:var(--text3);margin-top:11px}
.innergy .m-msg{margin-top:14px;padding:12px;border-radius:3px;font-size:13px;text-align:center}
.innergy .m-msg.ok{background:rgba(122,155,138,.15);color:#3a6b5e}
.innergy .m-msg.err{background:rgba(212,133,106,.15);color:#a85c4a}
@media(max-width:1024px){
  .innergy .nav{padding:14px 28px}
  .innergy .nav-links,.innergy .nav-cta{display:none}
  .innergy .nav-mob{display:block}
  .innergy .pain-sec,.innergy .how-sec,.innergy .sess-sec,.innergy .dim-sec,.innergy .price-sec,.innergy .footer{padding:72px 28px}
  .innergy .hero-body{padding:120px 28px 72px}
  .innergy .hero-nums{display:none}
  .innergy .pain-grid{grid-template-columns:1fr;gap:40px}
  .innergy .steps{grid-template-columns:1fr}
  .innergy .step-arr{display:none}
  .innergy .sgrid,.innergy .plans{grid-template-columns:1fr}
  .innergy .plan.feat{transform:none}
  .innergy .dim-grid{grid-template-columns:1fr 1fr}
  .innergy .fg{grid-template-columns:1fr 1fr}
  .innergy .f-bot{flex-direction:column;gap:14px;text-align:center}
}
@media(max-width:600px){.innergy .dim-grid,.innergy .fg{grid-template-columns:1fr}.innergy .hero-h1 .ind{padding-left:0}}
`;

const SESSIONS = [
  { cat: "art", emoji: "🎨", bg: "linear-gradient(135deg,#F8E0C8,#C9607A)", pill: "ph", pillTxt: "★ Popular", time: "10:00 – 11:00 AM", catLbl: "Art Therapy", title: "Creative Expression for Leaders", desc: "Access non-linear thinking through guided art therapy. Unlock innovation and process complex emotions — no artistic experience required.", expert: "Nisha Desai", initial: "N", avBg: "#C9607A", dur: "60 min" },
  { cat: "breath", emoji: "💨", bg: "linear-gradient(135deg,#9FE1CB,#0A5E48)", pill: "pl", pillTxt: "● Live", time: "7:00 – 7:45 AM", catLbl: "Breathwork", title: "Rebirthing Breathwork Session", desc: "Activate your nervous system reset with rebirthing and box-breathing techniques. Leaders report feeling calm and focused after a single session.", expert: "Ravi Nair", initial: "R", avBg: "#0A5E48", dur: "45 min" },
  { cat: "viz", emoji: "✨", bg: "linear-gradient(135deg,#D4CBE5,#4A40A0)", pill: "pn", pillTxt: "New", time: "8:30 – 9:00 AM", catLbl: "Visualization", title: "Peak Performance Visualization", desc: "Guided imagery used by Olympic athletes and top executives. Program your mind for clarity, confidence, and decisive action.", expert: "Arjun Mehta", initial: "A", avBg: "#4A40A0", dur: "30 min" },
  { cat: "journal", emoji: "📓", bg: "linear-gradient(135deg,#E8D5B8,#7A5020)", pill: "ph", pillTxt: "Today", time: "12:00 – 12:45 PM", catLbl: "Journaling", title: "Structured Leadership Journaling", desc: "Evidence-based journaling protocols to process stress, clarify values, and build emotional hygiene.", expert: "Kavya Iyer", initial: "K", avBg: "#7A5020", dur: "45 min" },
  { cat: "med", emoji: "🕯️", bg: "linear-gradient(135deg,#A8C4A0,#2A5040)", pill: "pl", pillTxt: "★ Popular", time: "9:00 – 9:30 AM", catLbl: "Meditation", title: "Deep Stillness Practice", desc: "Vedic mantra-based meditation for senior leaders. Reduce cortisol and access deep states of restful awareness.", expert: "Arjun Mehta", initial: "A", avBg: "#2A5040", dur: "30 min" },
  { cat: "tarot", emoji: "🔮", bg: "linear-gradient(135deg,#2C1060,#C9A55A)", pill: "pn", pillTxt: "Evening", time: "5:00 – 5:45 PM", catLbl: "Tarot & Astrology", title: "Oracle Reading Circle", desc: "Guided tarot and astrology for intuitive decision-making and self-discovery.", expert: "Priya Rao", initial: "P", avBg: "#6B4090", dur: "45 min" },
];

function InnergyPage() {
  const bookFn = useServerFn(createBooking);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [plan, setPlan] = useState<string>("Luminary");
  const planRef = useRef<string>("Luminary");
  const [filter, setFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Scroll reveal
  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    rootRef.current.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = (planName?: string) => {
    if (planName) planRef.current = planName;
    setMsg(null);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    if (!name || !email) {
      setMsg({ type: "err", text: "Please enter your name and email." });
      return;
    }
    setSubmitting(true);
    setMsg(null);
    try {
      await bookFn({ data: { name, email, plan: planRef.current } });
      setMsg({ type: "ok", text: `✦ Welcome, ${name}. Your ${planRef.current} journey is booked. We'll be in touch.` });
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : "Something went wrong.";
      setMsg({ type: "err", text: err });
    } finally {
      setSubmitting(false);
    }
  };

  const visibleSessions = filter === "all" ? SESSIONS : SESSIONS.filter((s) => s.cat === filter);
  const filters = [
    ["all", "All"], ["art", "Art Therapy"], ["breath", "Breathwork"], ["viz", "Visualization"],
    ["journal", "Journaling"], ["med", "Meditation"], ["tarot", "Tarot & Astrology"],
  ] as const;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="innergy" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">INN<span className="dot">·</span>ERGY</div>
        <ul className="nav-links">
          <li><a onClick={() => scrollTo("sessions")} style={{cursor:"pointer"}}>Sessions</a></li>
          <li><a onClick={() => scrollTo("dimensions")} style={{cursor:"pointer"}}>5D Protocol</a></li>
          <li><a onClick={() => scrollTo("pricing")} style={{cursor:"pointer"}}>Membership</a></li>
        </ul>
        <button className="nav-cta" onClick={() => openModal()}>Begin Journey</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-vline"></div>
        <div className="hero-vline2"></div>
        <div className="hero-body">
          <div className="hero-pill"><span></span>Leader Rejuvenation Platform</div>
          <h1 className="hero-h1">
            Drive exceptional<br />
            <span className="ind">results without</span><br />
            burning out your <em>best people.</em>
          </h1>
          <p className="hero-sub">What if your highest-performing leaders didn't have to burn out to deliver results? Help them hit their goals without sacrificing their physical, mental and emotional health.</p>
          <div className="hero-btns">
            <button className="btn-g" onClick={() => openModal()}><span>Begin Your Journey</span></button>
            <button className="btn-o" onClick={() => scrollTo("sessions")}>Explore Sessions →</button>
          </div>
        </div>
        <div className="hero-nums">
          <div><div className="hnum-val">200K+</div><div className="hnum-lbl">Leaders Impacted</div></div>
          <div><div className="hnum-val">17+</div><div className="hnum-lbl">Years Experience</div></div>
          <div><div className="hnum-val">9</div><div className="hnum-lbl">Countries</div></div>
        </div>
        <div className="hero-scroll"><div className="scroll-bar"></div>Scroll to explore</div>
      </section>

      {/* TICKER */}
      <div className="ticker"><div className="ticker-t">
        {[...Array(2)].map((_, k) => (
          <span key={k} style={{display:"inline-flex"}}>
            {["Art Therapy","Breathwork","Visualization","Journaling","Meditation","Tarot & Astrology","Leader Rejuvenation","Peak Performance","Nervous System Recovery","Executive Energy"].map((t,i) => (
              <span className="ti" key={i}><span className="td">◆</span>{t}</span>
            ))}
          </span>
        ))}
      </div></div>

      {/* PAIN */}
      <div className="pain-sec">
        <div className="pain-grid">
          <div>
            <div className="tag-line rv" style={{color:"var(--rose)"}}>Why It Matters</div>
            <p className="pain-q rv d2" style={{marginTop:28}}>"If you are struggling to take performance to the next peak — you do not need more time. You need more energy."</p>
            <div className="pain-co rv d3">Your leadership energy is organizational capital. You have invested in capability — now invest in capacity.</div>
            <div style={{marginTop:32}} className="rv d4">
              <button className="btn-g" onClick={() => scrollTo("sessions")}><span>Explore Sessions →</span></button>
            </div>
          </div>
          <div className="pain-right">
            <div className="pstat rv d1"><div className="pnum">70%</div><div className="ptext">of C-suite executives were so burned out they were considering quitting their jobs.</div><div className="psrc">Source · Deloitte</div></div>
            <div className="pstat rv d2"><div className="pnum">96%</div><div className="ptext">of senior leaders reported feeling some level of burnout, with 33% saying it is extreme.</div><div className="psrc">Source · Harvard Business Review</div></div>
            <div className="pfeels rv d3"><div className="pfeels-h">Leaders Experience</div><div className="pfeels-grid">
              <div className="pfeel">Fatigue & unstable sleep</div>
              <div className="pfeel">Cognitive overload</div>
              <div className="pfeel">Guilt & neglect of self</div>
              <div className="pfeel">Always "on", never recovered</div>
            </div></div>
          </div>
        </div>
      </div>

      {/* HOW */}
      <div className="how-sec">
        <div className="how-inner">
          <div className="rv"><div className="tag-line" style={{marginBottom:16}}>The Method</div><h2 className="sec-h">How Innergy <em>Works</em></h2></div>
          <div className="steps rv d1">
            {[
              ["01","◈","Choose Your Session","Browse our six modalities — Art Therapy, Breathwork, Visualization, Journaling, Meditation, and Tarot & Astrology."],
              ["02","◉","Enter Your Details","Receive a personalized 21-Day Rejuvenation Action Plan tailored to your energy dimensions."],
              ["03","✦","Book Your Session","Experience calm and focus. Online and offline interventions sustain your journey."],
            ].map(([n,ic,t,d]) => (
              <div className="step" key={n}>
                <span className="step-n">{n}</span>
                <div className="step-ico">{ic}</div>
                <div className="step-ttl">{t}</div>
                <div className="step-bd">{d}</div>
                <div className="step-arr">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SESSIONS */}
      <div className="sess-sec" id="sessions">
        <div className="sess-inner">
          <div className="sess-hdr rv">
            <div><div className="tag-line" style={{marginBottom:14}}>Rejuvenation Sessions</div><h2 className="sec-h">Sessions for Every <em>Energy Need</em></h2></div>
          </div>
          <div className="sess-filters rv d1">
            {filters.map(([k,l]) => (
              <button key={k} className={`sf ${filter===k?"on":""}`} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
          <div className="sgrid">
            {visibleSessions.map((s,i) => (
              <div className="sc rv" key={s.title} style={{transitionDelay:`${(i%3)*0.1}s`}}>
                <div className="sc-img" style={{background:s.bg}}>
                  <div className="sc-emo">{s.emoji}</div>
                  <div className="sc-ov"></div>
                  <span className={`sc-pill ${s.pill}`}>{s.pillTxt}</span>
                  <span className="sc-t">{s.time}</span>
                </div>
                <div className="sc-body">
                  <div className="sc-cat">{s.catLbl}</div>
                  <div className="sc-ttl">{s.title}</div>
                  <div className="sc-desc">{s.desc}</div>
                  <div className="sc-ft">
                    <div className="sc-exp">
                      <div className="sc-av" style={{background:s.avBg}}>{s.initial}</div>
                      <span className="sc-en">{s.expert}</span>
                    </div>
                    <span className="sc-dur">⏱ {s.dur}</span>
                  </div>
                  <button className="sc-book" onClick={() => openModal(`Session: ${s.title}`)}>Book This Session →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIMENSIONS */}
      <div className="dim-sec" id="dimensions">
        <div className="dim-inner">
          <div className="rv" style={{marginBottom:60}}>
            <div className="tag-line" style={{marginBottom:14}}>The 5D Framework</div>
            <h2 className="sec-h dk">Energy <em>Dimensions</em></h2>
            <p className="sec-lead dk">Five interlocking dimensions of leadership energy — each with its own protocol, practices, and measurable outcomes.</p>
          </div>
          <div className="dim-grid">
            {[
              ["⚡","Physical","Fuel & Vitality","Movement, nourishment, rest, and recovery. Feeling energized, pain-free, and strong."],
              ["🧠","Mental","Focus & Clarity","Clear, focused thinking with less overwhelm. Managing cognitive load and decision fatigue."],
              ["💛","Emotional","Resilience & Regulation","Awareness, expression, and regulation of emotions. Reducing reactivity through journaling."],
              ["🎯","Purpose","Meaning & Alignment","Sense of connection to values and something greater. Aligning daily work with your deeper why."],
              ["🎨","Creative","Expression & Innovation","Imagination and problem-solving through non-linear thinking. Leading with original ideas."],
              ["👥","Social","Connection & Community","Nurturing meaningful, energizing relationships. Feeling seen, supported, and connected."],
            ].map(([ic,t,sub,bd]) => (
              <div className="dc rv" key={t as string}>
                <div className="dc-ico">{ic}</div>
                <div className="dc-ttl">{t}</div>
                <div className="dc-sub">{sub}</div>
                <div className="dc-bd">{bd}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="price-sec" id="pricing">
        <div className="price-inner">
          <div className="price-hdr rv">
            <div className="tag-line" style={{justifyContent:"center",marginBottom:14}}>Membership</div>
            <h2 className="sec-h" style={{textAlign:"center"}}>Invest in Your <em>Greatest Asset</em></h2>
            <p className="sec-lead" style={{maxWidth:460,margin:"14px auto 0",textAlign:"center"}}>Your leadership energy is your most valuable resource. Choose the plan that fits your journey.</p>
          </div>
          <div className="plans rv d1">
            <div className="plan">
              <div className="plan-nm">Seeker</div>
              <div className="plan-pr">₹1,999</div>
              <div className="plan-per">per month · billed monthly</div>
              <div className="plan-hr"></div>
              <ul className="plan-feats">
                {["1 live session per day","Access to all 5D dimensions","Personal rejuvenation dashboard","Community access","21-Day Action Plan"].map(f => <li key={f} className="pf"><span className="pfi">✦</span>{f}</li>)}
              </ul>
              <button className="plan-btn btn-outline-p" onClick={() => openModal("Seeker")}>Begin as Seeker</button>
            </div>
            <div className="plan feat">
              <div className="plan-crown">Most Chosen</div>
              <div className="plan-nm">Luminary</div>
              <div className="plan-pr" style={{color:"var(--gold2)"}}>₹2,999</div>
              <div className="plan-per">per month · save 20% annually</div>
              <div className="plan-hr"></div>
              <ul className="plan-feats">
                {["Unlimited daily sessions","All 5D premium dimensions","1:1 monthly expert session","Priority booking & early access","Personalized 21-Day Action Plan","Innergy.Club community"].map(f => <li key={f} className="pf"><span className="pfi">✦</span>{f}</li>)}
              </ul>
              <button className="plan-btn btn-gold-p" onClick={() => openModal("Luminary")}>Begin as Luminary</button>
            </div>
            <div className="plan">
              <div className="plan-nm">Enterprise</div>
              <div className="plan-pr">Custom</div>
              <div className="plan-per">for teams · from 10 members</div>
              <div className="plan-hr"></div>
              <ul className="plan-feats">
                {["Everything in Luminary","Dedicated HR dashboard","Private team sessions","Custom rejuvenation programs","HRMS integration","Quarterly performance reports"].map(f => <li key={f} className="pf"><span className="pfi">✦</span>{f}</li>)}
              </ul>
              <button className="plan-btn btn-outline-p" onClick={() => openModal("Enterprise")}>Contact Sales</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="fg">
          <div>
            <span className="f-logo">INN<span style={{color:"var(--gold)"}}>·</span>ERGY</span>
            <p className="f-tg">We envision a world where recovery is recognized as a leadership strategy — not an afterthought.</p>
          </div>
          <div className="f-col"><div className="f-ch">Platform</div><ul>
            <li><a onClick={() => scrollTo("sessions")} style={{cursor:"pointer"}}>Sessions</a></li>
            <li><a onClick={() => scrollTo("dimensions")} style={{cursor:"pointer"}}>5D Protocol</a></li>
            <li><a onClick={() => scrollTo("pricing")} style={{cursor:"pointer"}}>Membership</a></li>
          </ul></div>
          <div className="f-col"><div className="f-ch">Membership</div><ul>
            <li><a onClick={() => openModal("Seeker")} style={{cursor:"pointer"}}>Seeker · ₹1,999</a></li>
            <li><a onClick={() => openModal("Luminary")} style={{cursor:"pointer"}}>Luminary · ₹2,999</a></li>
            <li><a onClick={() => openModal("Enterprise")} style={{cursor:"pointer"}}>Enterprise</a></li>
          </ul></div>
          <div className="f-col"><div className="f-ch">Company</div><ul>
            <li><a>About Rashmi</a></li><li><a>Press & Media</a></li><li><a>Contact Us</a></li>
          </ul></div>
        </div>
        <div className="f-bot">
          <p className="f-cp">© 2026 Innergy.Club Pvt. Ltd.</p>
        </div>
      </footer>

      {/* MODAL */}
      <div className={`modal-bg ${modalOpen ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <div className="modal">
          <button className="mx" onClick={() => setModalOpen(false)}>✕</button>
          <div className="tag-line m-tag">Begin Your Journey</div>
          <h2 className="m-h">Start Your Rejuvenation</h2>
          <p className="m-sub">Full access to all sessions. No credit card required. Cancel anytime.</p>
          <div className="field"><label className="fl">Full Name</label><input className="fi" type="text" placeholder="Your Name" ref={nameRef} /></div>
          <div className="field"><label className="fl">Work Email</label><input className="fi" type="email" placeholder="you@company.com" ref={emailRef} /></div>
          <label className="fl" style={{marginTop:18,display:"block"}}>Select Your Plan</label>
          <div className="mplans">
            {[["Seeker","₹1,999"],["Luminary","₹2,999"],["Team","Custom"]].map(([n,p]) => (
              <div key={n} className={`mpl ${planRef.current===n?"sel":""}`} onClick={() => { planRef.current = n; setMsg(null); /* force re-render via state */ setSubmitting(s=>s); setModalOpen(true); }}>
                <div className="mpl-n">{n}</div><div className="mpl-p">{p}</div>
              </div>
            ))}
          </div>
          <button className="m-sub-btn" onClick={handleSubmit} disabled={submitting}>{submitting ? "Booking..." : "Begin Journey →"}</button>
          {msg && <div className={`m-msg ${msg.type}`}>{msg.text}</div>}
          <p className="m-fine">✦ 7 days free · No commitment · Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}

// missing import shim
import { useState } from "react";
