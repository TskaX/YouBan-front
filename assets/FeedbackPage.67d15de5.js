import{Q as r}from"./QImg.33557102.js";import{S as n,a9 as _,B as d,v as s,ae as m,ad as u,q as e,k as p,m as o,t as i,C as l,ab as h,ac as v}from"./index.f9e4126b.js";const k={id:"feedback"},f={class:"q-pa-md row items-start q-gutter-md"},b=s("div",{class:"title col-12"},"\u6703\u54E1\u53CD\u994B",-1),g={class:"feedback-avatar"},x=s("div",{class:"line"},null,-1),y={class:"message"},B={class:"text-h6 text-bold"},C={class:"text-subtitle2"},N={__name:"FeedbackPage",setup(Q){const a=n([]);return(async()=>{const{data:c}=await _.get("/users/appointmentReply");a.push(...c.result)})(),(c,q)=>(e(),d("div",k,[s("div",f,[b,(e(!0),d(m,null,u(a,t=>(e(),p(v,{class:"my-card text-black col-11 col-md-5",key:t._id},{default:o(()=>[i(h,{class:"feedback-main"},{default:o(()=>[s("div",g,[i(r,{src:t.u_pic},null,8,["src"])]),x,s("div",y,[s("div",B,l(t.name),1),s("div",C,l(t.u_reply),1)])]),_:2},1024)]),_:2},1024))),128))])]))}};export{N as default};