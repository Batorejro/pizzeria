"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["ui_packages_use-safe-async-callback_use-safe-async-callback_ts-ui_packages_copy-to-clipboard_-4c1096"],{64665:(e,t,r)=>{r.d(t,{D:()=>n});function n(e){if("clipboard"in navigator)return navigator.clipboard.writeText(e);let t=document.body;if(!t)return Promise.reject(Error());let r=function(e){let t=document.createElement("pre");return t.style.width="1px",t.style.height="1px",t.style.position="fixed",t.style.top="5px",t.textContent=e,t}(e);return t.appendChild(r),!function(e){if("clipboard"in navigator)return navigator.clipboard.writeText(e.textContent||"");let t=getSelection();if(null==t)return Promise.reject(Error());t.removeAllRanges();let r=document.createRange();r.selectNodeContents(e),t.addRange(r),document.execCommand("copy"),t.removeAllRanges(),Promise.resolve()}(r),t.removeChild(r),Promise.resolve()}},59802:(e,t,r)=>{r.d(t,{KI:()=>d,VB:()=>u,a1:()=>c});var n=r(96540),l=r(19108);let a=({leadingWhitespace:e="",delimeter:t,taskBox:r,text:n})=>{if(!n)return null;let l="number"==typeof t?`${t+1}.`:t;return`
${e}${l}${r?" [ ]":""} `},i=({leadingWhitespace:e="",delimeter:t,taskBox:r})=>{let n="number"==typeof t?`${t}.`:t;return`${n}${e}${r?" [ ]":" "}
`},o=/^(\s*(?:>\s*)*(?:[*-]\s{1,4})*)([*-]|(\d+)\.)(\s{1,4})(?:(\[[\sx]\])\s)?(.*)/i,s=e=>"number"==typeof e?.delimeter,u=e=>{let t=o.exec(e);if(!t)return null;let[,r="",n,l="",a,i=null,s]=t,u=Number.parseInt(l,10);return{leadingWhitespace:r,text:s,delimeter:Number.isNaN(u)?n:u,middleWhitespace:a,taskBox:i}},c=e=>"number"==typeof e.delimeter?`${e.leadingWhitespace}${e.delimeter}.${e.middleWhitespace}${e.taskBox?`${e.taskBox} `:""}${e.text}`:`${e.leadingWhitespace}${e.delimeter}${e.middleWhitespace}${e.taskBox||""} ${e.text}`,d=({emitChange:e})=>{let t=(0,n.useCallback)((t,r)=>{let[n,a]=r||(0,l.ty)(t),i=u(t.value.slice(n,a));if(!s(i))return;let o=t.value.slice(a+1).split(/\r?\n/),d=[],p=i.delimeter;for(let e of o){let t=u(e);if(!s(t)||t.delimeter!==p)break;d.push(t),p++}if(0===d.length)return;let f=`
${d.map(e=>c({...e,delimeter:e.delimeter+1})).join("\n")}`;e(f,[a,a+f.length+1],t.selectionStart)},[e]);return{onKeyDown:(0,n.useCallback)(r=>{if("Enter"===r.key&&!r.shiftKey&&!r.defaultPrevented){let n=r.currentTarget,[o,s]=(0,l.ty)(n),c=u(n.value.slice(o,n.selectionStart)+n.value.slice(n.selectionEnd,s));if(c){if(r.preventDefault(),n.selectionStart===o){let r=i(c);null===r?e("",[o,n.selectionEnd]):(e(r),t(n,[o,o+r.length-1]))}else{let r=a(c);null===r?e("",[o,n.selectionEnd]):(e(r),t(n))}}}},[e,t])}}},19108:(e,t,r)=>{r.d(t,{pF:()=>u,ty:()=>l,VL:()=>o,nf:()=>a,TG:()=>c,iQ:()=>i});var n=r(12480);let PNGScanner=class PNGScanner{advance(e){this.pos+=e}readInt(e){let t=this,r=function(){switch(e){case 1:return t.dataview.getUint8(t.pos);case 2:return t.dataview.getUint16(t.pos);case 4:return t.dataview.getUint32(t.pos);default:throw Error("bytes parameter must be 1, 2 or 4")}}();return this.advance(e),r}readChar(){return this.readInt(1)}readShort(){return this.readInt(2)}readLong(){return this.readInt(4)}readString(e){let t=[];for(let r=0;r<e;r++)t.push(String.fromCharCode(this.readChar()));return t.join("")}scan(e){if(0x89504e47!==this.readLong())throw Error("invalid PNG");for(this.advance(4);;){let t=this.readLong(),r=this.readString(4),n=this.pos+t+4;if(!1===e.call(this,r,t)||"IEND"===r)break;this.pos=n}}constructor(e,t){this.dataview=new DataView(e),this.pos=0,this.callback=t}};let l=e=>{let t=e.value.lastIndexOf("\n",e.selectionStart-1)+1,r=e.value.indexOf("\n",e.selectionEnd);return -1===r&&(r=e.value.length),[t,r]},a=e=>`<!-- ${e.replaceAll("--","\\-\\-")} -->`,i=(e,t)=>`[${e.replaceAll("[","\\[").replaceAll("]","\\]")}](${t.replaceAll("(","\\(").replaceAll(")","\\)")})`,o=e=>(0,n.U0)()?e.metaKey:e.ctrlKey,s=e=>{let t=new PNGScanner(e),r={width:0,height:0,ppi:1};return t.scan(function(e){switch(e){case"IHDR":r.width=this.readLong(),r.height=this.readLong();break;case"pHYs":{let e;let t=this.readLong(),n=this.readLong();return 1===this.readChar()&&(e=.0254),e&&(r.ppi=Math.round((t+n)/2*e)),!1}case"IDAT":return!1}return!0}),r},u=async e=>{let t=await new Promise((t,r)=>{let n=new FileReader;n.onload=()=>t(n.result),n.onerror=()=>r(n.error),n.readAsArrayBuffer(e)});return t?s(t):null},c=(e,t,r="Image")=>{if(144===e.ppi){let n=Math.round(e.width/2);return`<img width="${n}" alt="${r}" src="${t}" />`}return`![${r}](${t})`}},31536:(e,t,r)=>{r.d(t,{O:()=>l});var n=r(96540);let l=({htmlContainerRef:e,htmlContainer:t,onLinkClick:r,openLinksInNewTab:l})=>{(0,n.useEffect)(()=>{let n=e?.current||t;if(!n)return;let a=e=>{let t=e.target.closest("a");t&&(r?.(e),!e.defaultPrevented&&l&&t.href&&(window.open(t.href,"_blank","noopener noreferrer"),e.preventDefault()))};return n.addEventListener("click",a),()=>{n?.removeEventListener("click",a)}},[t,e,r,l])}},83296:(e,t,r)=>{r.d(t,{U:()=>i,g:()=>a});var n=r(51012),l=r(96540);let a=Symbol("callbackCancelledResult"),i=(e,t=!1)=>{let r=(0,l.useRef)(e);(0,n.N)(()=>{r.current=e},[e]);let i=(0,l.useRef)(!1);return(0,l.useEffect)(()=>(i.current=!0,()=>{t||(i.current=!1)}),[t]),(0,l.useCallback)((...e)=>i.current?r.current(...e):a,[])}},98866:(e,t,r)=>{r.d(t,{H:()=>i});var n=r(96540);let l=(e,t,r)=>{let n=t[1]-t[0];return e<t[0]?e:e<t[1]?t[0]+r:e+(r-n)},a=(e,t)=>({...e,nativeEvent:e,target:t,currentTarget:t,preventDefault:()=>e.preventDefault(),isDefaultPrevented:()=>e.defaultPrevented,isPropagationStopped:()=>!1,persist:()=>({})}),i=({inputRef:e,fallbackEventHandler:t})=>(0,n.useCallback)((r,n,i)=>{let o=e.current;if(!o)return;let s=document.activeElement;o.focus();let u=n??[o.selectionStart??o.value.length,o.selectionEnd??o.value.length],c=void 0===i?l(o.selectionStart??o.value.length,u,r.length):Array.isArray(i)?i[0]:i,d=Array.isArray(i)?i[1]:c,p=!1;try{if(document.activeElement!==o)throw Error("Input must be focused to use execCommand");o.setSelectionRange(u[0],u[1]),p=""===r?document.execCommand("delete",!1):document.execCommand("insertText",!1,r),o.setSelectionRange(c,d)}catch{p=!1}if((s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement)&&s.focus(),!p){let n=o.value.slice(0,u[0])+r+o.value.slice(u[1]),l=new InputEvent("input",{bubbles:!1});e.current.value=n,e.current.setSelectionRange(c,d),e.current.dispatchEvent(l),t(a(l,e.current))}},[e,t])},62610:(e,t,r)=>{r.d(t,{T:()=>f});var n=r(74848),l=r(73272),a=r(38621),i=r(87330),o=r(96540),s=r(20053),u=r(14616),c=r(7572),d=r(64665);let p={tooltip:"CopyToClipboardButton-module__tooltip--Dq1IB"};function f({icon:e=a.CopyIcon,size:t="medium",onCopy:r,textToCopy:f,tooltipProps:h,variant:m="invisible",ariaLabel:g,className:b,disabled:v,...x}){let[y,C]=o.useState(!1),w=(0,l.A)(),E=g??`Copy "${f}" to clipboard`,S=y?"Copied!":E,k={size:t,variant:m,onClick:()=>{C(!0),(0,c.i)("Copied!"),(0,d.D)(f),r?.(),setTimeout(()=>w()&&C(!1),2e3)},icon:y?a.CheckIcon:e,className:(0,s.$)(y?"color-fg-success":void 0,b),...x},$=(0,o.useId)();return v?(0,n.jsx)(i.K,{...k,"aria-label":E,disabled:!0}):(0,n.jsx)(u.m,{text:S,"aria-label":E,type:"label",id:$,"aria-hidden":!0,...h,className:(0,s.$)(p.tooltip,h?.className),children:(0,n.jsx)(i.K,{...k,"aria-labelledby":$})})}try{f.displayName||(f.displayName="CopyToClipboardButton")}catch{}},71375:(e,t,r)=>{r.d(t,{a:()=>_});var n=r(74848),l=r(70170);let a=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],i=(e,t)=>{let{height:r,top:n,left:l}=function(e,t){let r="mozInnerScreenX"in window,n=document.createElement("div");n.id="input-textarea-caret-position-mirror-div",document.body.appendChild(n);let l=n.style,i=window.getComputedStyle(e),o=isNaN(parseInt(i.lineHeight))?1.2*parseInt(i.fontSize):parseInt(i.lineHeight),s=e instanceof HTMLInputElement;for(let t of(l.whiteSpace=s?"nowrap":"pre-wrap",l.wordWrap=s?"":"break-word",l.position="absolute",a))if(s&&"lineHeight"===t){if("border-box"===i.boxSizing){let e=parseInt(i.height),t=parseInt(i.paddingTop)+parseInt(i.paddingBottom)+parseInt(i.borderTopWidth)+parseInt(i.borderBottomWidth),r=t+o;e>r?l.lineHeight=`${e-t}px`:e===r?l.lineHeight=i.lineHeight:l.lineHeight="0"}else l.lineHeight=i.height}else if(s||"width"!==t||"border-box"!==i.boxSizing)l[t]=i[t];else{let t=parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth),n=r?parseFloat(i.width)-t:e.clientWidth+t;l.width=`${n}px`}r?e.scrollHeight>parseInt(i.height)&&(l.overflowY="scroll"):l.overflow="hidden",n.textContent=e.value.substring(0,t),s&&(n.textContent=n.textContent.replace(/\s/g,"\xa0"));let u=document.createElement("span");u.textContent=s?".":e.value.substring(t)||".",n.appendChild(u);let c={top:u.offsetTop+parseInt(i.borderTopWidth),left:u.offsetLeft+parseInt(i.borderLeftWidth),height:o};return document.body.removeChild(n),c}(e,t);return{height:r,top:n-e.scrollTop,left:l-e.scrollLeft}},o=(e,t)=>{let{top:r,left:n,height:l}=i(e,t),{top:a,left:o}=e.getBoundingClientRect();return{height:l,top:a+r,left:o+n}};var s=r(98866),u=r(74021),c=r(64515),d=r(16255),p=r(20053),f=r(96540),h=r(35908),m=r(51012);let g=({isOpen:e,listElement:t,inputElement:r,onCommit:n,options:l,tabInsertsSuggestions:a=!1,firstOptionSelectionMode:i="none"})=>{let o=(0,f.useId)(),s=`combobox-${o}__option`,u=(0,f.useRef)(e),[c,d]=(0,f.useState)(null),p=(0,f.useCallback)(()=>[...t?.querySelectorAll("[role=option]")??[]],[t]),g=(0,f.useCallback)(e=>{let t=e.target.getAttribute("data-combobox-list-index"),r=l[null!==t?parseInt(t,10):NaN];r&&n({nativeEvent:e,option:r})},[l,n]),b=(0,f.useCallback)(e=>e.preventDefault(),[]);(0,f.useEffect)(function(){if(r&&t){t.getAttribute("role")||t.setAttribute("role","listbox");let e=new h.A(r,t,{tabInsertsSuggestions:a,firstOptionSelectionMode:i});return d(e),()=>{e.destroy(),d(null)}}},[r,t,a,i]),(0,f.useEffect)(function(){let t=u.current;u.current=e&&null!==c,e!==t&&c&&(e?c.start():c.stop())},[e,c]),(0,f.useEffect)(function(){return t?.addEventListener("combobox-commit",g),()=>t?.removeEventListener("combobox-commit",g)},[g,t]),(0,m.N)(()=>{let e=p();for(let[t,r]of e.entries())(!r.id||r.id.startsWith(s))&&(r.id=`${s}-${t}`),r.setAttribute("data-combobox-list-index",t.toString()),r.addEventListener("mousedown",b);return c?.resetSelection(),()=>{for(let t of e)t.removeEventListener("mousedown",b)}},[p,s,l,c,b])};var b=r(30595),v=r(8338),x=r(45221),y=r(47413);let C={Box_0:"AutocompleteSuggestions-module__Box_0--iBnIs",Overlay_0:"AutocompleteSuggestions-module__Overlay_0--QuLJW"},w=new Set([" ","\n"]),E=new Set([".","\n"]),S=(e,t,r)=>{let n=e.sort((e,t)=>t.triggerChar.length-e.triggerChar.length);for(let e=r-1,l="",a=n;e>=0&&a.length>0;e--){let r=t[e]??"";for(let n of(l=r+l,w.has(r)&&(a=a.filter(e=>e.multiWord)),E.has(r)&&(a=a.filter(e=>!e.multiWord)),a.filter(e=>l.startsWith(e.triggerChar)))){let r=t[e-1]??"",i=l[1]??"";if((!r||/[\s([]/.test(r))&&(!i||!/\s/.test(i)))return{trigger:n,query:l.slice(n.triggerChar.length)};a=a.filter(e=>e!==n)}}return null},k=e=>"string"==typeof e?e:e.value,$=e=>"string"==typeof e?e:e.key??e.value,A=(...e)=>t=>{for(let r of[...e].reverse())t.isDefaultPrevented()||r?.(t)},I=()=>(0,n.jsx)("div",{className:C.Box_0,children:(0,n.jsx)(b.A,{size:"small"})}),N=({suggestion:e})=>{let t=k(e),r={id:t,children:t,role:"option",sx:{"&[aria-selected]":{backgroundColor:"var(--control-bgColor-active)"},"&[data-combobox-option-default]:not([aria-selected])":{backgroundColor:"var(--control-bgColor-hover)"}}};return"string"==typeof e?(0,n.jsx)(v.l.Item,{...r}):e.render(r)},L=({suggestions:e,portalName:t,triggerCharCoords:r,onClose:l,onCommit:a,inputRef:i,visible:o,tabInsertsSuggestions:s,defaultPlacement:u,firstOptionSelectionMode:c="active"})=>{let d=(0,f.useRef)(null),[p,h]=(0,f.useState)(null),m=(0,f.useCallback)(({option:e})=>{a(k(e))},[a]);g({isOpen:o&&"loading"!==e,listElement:p,inputElement:i.current,onCommit:m,options:Array.isArray(e)?e:[],tabInsertsSuggestions:s,firstOptionSelectionMode:c});let[b,w]=(0,f.useState)(0);return(0,x.A)(function(){let e=d.current?.offsetHeight??0,t=r.top+r.height,n=t+e>window.innerHeight,l=r.top-e,a=l<0,i={below:n&&!a?l:t,above:a&&!n?t:l}[u];w(Number.isNaN(i)?0:i)},[r.top,r.height,e,o,u]),o?(0,n.jsx)(y.Ay,{onEscape:l,onClickOutside:l,returnFocusRef:i,preventFocusOnOpen:!0,portalContainerName:t,top:b,left:r.left,ref:d,className:C.Overlay_0,children:(0,n.jsx)(v.l,{ref:h,role:"listbox",children:"loading"===e?(0,n.jsx)(I,{}):e?.map(e=>n.jsx(N,{suggestion:e},$(e)))})}):(0,n.jsx)(n.Fragment,{})};L.displayName="SuggestionList";try{I.displayName||(I.displayName="LoadingIndicator")}catch{}try{N.displayName||(N.displayName="SuggestionListItem")}catch{}let T={container:"InlineAutocomplete-module__container--UwGMb",fullWidth:"InlineAutocomplete-module__fullWidth--X6eXo"},R=e=>{try{return e.selectionStart}catch(e){if(e instanceof TypeError)return null;throw e}},W=()=>{},_=({triggers:e,suggestions:t,onShowSuggestions:r,onHideSuggestions:a,onSelectSuggestion:i,style:h,children:m,tabInsertsSuggestions:g=!1,suggestionsPlacement:b="below",firstOptionSelectionMode:v="active",portalName:x,fullWidth:y=!1,...C})=>{let[,w]=(0,f.useState)(0),E=(0,u.Lf)(C),$=(0,f.useRef)(null);(0,c.T)(m.ref??W,$);let I=function(e,t){if(f.Children.only(e),t.current&&!(t.current instanceof HTMLInputElement)&&!(t.current instanceof HTMLTextAreaElement))throw TypeError("AutocompleteTextarea child must be a component that forwards a ref and props to an <input> or <textarea> element.");return e}(m,$),N=(0,s.H)({inputRef:$,fallbackEventHandler:I.props.onChange??W}),_=(0,f.useRef)(null),j=null!==t&&t.length>0;(0,f.useEffect)(()=>{if(j){let e=(0,l.n)(()=>w(e=>e+1),100);return document.addEventListener("scroll",e,{capture:!0}),()=>{document.removeEventListener("scroll",e,{capture:!0})}}},[j]);let H=$.current&&_.current&&j?o($.current,(R($.current)??0)-_.current.query.length):{top:0,left:0,height:0},B=(0,f.cloneElement)(I,{...E,onBlur:A(I.props.onBlur,()=>{a()}),onKeyDown:A(I.props.onKeyDown,e=>{j&&"Escape"===e.key&&(a(),e.stopPropagation())}),onChange:A(I.props.onChange,t=>{let n=R(t.currentTarget);if(null===n){a();return}_.current=S(e,t.currentTarget.value,n),_.current?r(_.current):a()}),ref:$}),D=j?"loading"===t?"Loading autocomplete suggestions\u2026":`${t.length} autocomplete ${1===t.length?"suggestion":"suggestions"} available; "${k(t[0])}" is highlighted. Press ${g?"Enter or Tab":"Enter"} to insert.`:"";return(0,n.jsxs)("div",{className:(0,p.$)(T.container,y&&T.fullWidth),style:h,children:[B,(0,n.jsx)(L,{suggestions:t,inputRef:$,onCommit:e=>{if(!$.current||!_.current)return;let{query:t,trigger:r}=_.current;i?.({suggestion:e,trigger:r,query:t});let n=R($.current)??0,l=t.length+r.triggerChar.length,o=n-l,s=r.keepTriggerCharOnCommit??!0?r.triggerChar:"",u=r.insertSpaceOnCommit??!0,c=`${s}${e}${u?" ":""}`;a(),N(c,[o,o+l])},onClose:a,triggerCharCoords:H,visible:j,tabInsertsSuggestions:g,defaultPlacement:b,firstOptionSelectionMode:v,portalName:x}),(0,n.jsx)(d.Z,{children:(0,n.jsx)("span",{"aria-live":"assertive","aria-atomic":!0,style:{clipPath:"circle(0)",position:"absolute"},children:D})})]})};try{_.displayName||(_.displayName="InlineAutocomplete")}catch{}},66330:(e,t,r)=>{r.d(t,{G:()=>v});var n=r(74848),l=r(96540),a=r(64515),i=r(75177),o=r(30595),s=r(22084),u=r(31536),c=r(59802),d=r(45221);let p=e=>{let t=e.match(/^ {0,3}(`{3,}|~{3,})[^`]*$/);return t?t[1]:null},f=(e,t)=>RegExp(`^ {0,3}${t}${t[0]}* *$`).test(e),h=e=>"string"==typeof e?.taskBox,m=e=>({...e,taskBox:"[ ]"===e.taskBox?"[x]":"[ ]"}),g=({htmlContainer:e,markdownValue:t,onChange:r,disabled:n=!1,dependencies:a=[]})=>{let i=(0,l.useRef)(t);(0,d.A)(()=>{i.current=t},[t]);let o=(0,l.useCallback)(e=>()=>{let t=i.current.split(/\r?\n/),n=null;for(let l=0,a=0;l<t.length;l++){let o=t[l];if(n){if(f(o,n)){n=null;continue}}else n=p(o);if(n)continue;let s=(0,c.VB)(o);if(h(s)){if(a===e){let e=(0,c.a1)(m(s));t.splice(l,1,e);let n=t.join("\n");i.current=n,r(n);return}a++}}},[r]),[s,u]=(0,l.useState)([]);(0,l.useEffect)(()=>{u(Array.from(e?.querySelectorAll("input[type=checkbox].task-list-item-checkbox")??[]))},[e,...a]),(0,l.useEffect)(function(){let e=s.map(e=>{let t=e.disabled;return e.disabled=n,()=>{e.disabled=t}});return()=>{for(let t of e)t()}},[s,n]),(0,l.useEffect)(function(){let e=s.map((e,t)=>{let r=o(t);return e.addEventListener("change",r),()=>{e.removeEventListener("change",r)}});return()=>{for(let t of e)t()}},[s,o])};var b=r(20053);let v=(0,l.forwardRef)(function({verifiedHTML:e,loading:t=!1,markdownValue:r="",onChange:c,disabled:d=!1,onLinkClick:p,openLinksInNewTab:f=!1,teamHovercardsEnabled:h=!1,className:m},v){let[x,y]=(0,l.useState)(null),C=(0,l.useRef)(null);(0,a.T)(v,C);let w=(0,l.useCallback)(e=>{C.current=e,y(e)},[]);return g({onChange:(0,l.useCallback)(async t=>{try{await c?.(t)}catch{x&&(x.innerHTML=e)}},[c,x,e]),disabled:d||!c,htmlContainer:x??void 0,markdownValue:r,dependencies:[e]}),(0,u.O)({htmlContainer:x??void 0,onLinkClick:p,openLinksInNewTab:f}),(0,l.useMemo)(()=>t?(0,n.jsx)(i.A,{sx:{display:"flex",justifyContent:"space-around",p:2},children:(0,n.jsx)(o.A,{"aria-label":"Loading content..."})}):(0,n.jsx)(s.oG,{ref:w,className:(0,b.$)("markdown-body",m),sx:m?{}:{fontSize:1,maxWidth:"100%","& > div > :last-child":{mb:0}},html:e,...h?{"data-team-hovercards-enabled":!0}:{}}),[m,t,h,e,w])});try{v.displayName||(v.displayName="MarkdownViewer")}catch{}},92979:(e,t,r)=>{r.d(t,{O:()=>d});var n=r(75177),l=r(59299),a=r(44999),i=r(38267);let o=(0,i.i7)(["0%{transform:translateX(-100%);}50%{transform:translateX(100%);}100%{transform:translateX(100%);}"]),s=(0,i.AH)(["animation:"," 1.5s infinite linear;"],o),u=(0,i.i7)(["0%{opacity:.3;}10%{opacity:1;}100%{opacity:.3;}"]),c=(0,i.AH)(["animation:"," 2s infinite linear;"],u),d=(0,i.Ay)(n.A).withConfig({displayName:"LoadingSkeleton",componentId:"sc-bcbf24f9-0"})(["position:relative;overflow:hidden;mask-image:radial-gradient(white,black);",";&::after{",";background:linear-gradient(90deg,transparent,",",transparent);content:'';position:absolute;transform:translateX(-100%);bottom:0;left:0;right:0;top:0;}background-color:",";border-radius:",";display:block;height:1.2em;"," width:",";height:",";",""],({animationStyle:e})=>"pulse"===e&&c,({animationStyle:e})=>"pulse"!==e&&s,(0,l.Jt)("colors.neutral.subtle"),(0,l.Jt)("colors.neutral.subtle"),({theme:e,variant:t})=>{switch(t){case"rounded":return(0,l.Jt)("radii.1")(e);case"pill":return"100px";case"elliptical":return"50%";default:return"0"}},({variant:e})=>"elliptical"===e&&{borderRadius:"50%"},({width:e})=>{switch(e){case"random":return`${Math.floor(40*Math.random()+40)}%`;case"xl":return"32px";case"lg":return"24px";case"md":return"20px";case"sm":return"16px";default:return e}},({height:e})=>{switch(e){case"xl":return"32px";case"lg":return"24px";case"md":return"20px";case"sm":return"16px";default:return e}},a.A);try{d.displayName||(d.displayName="LoadingSkeleton")}catch{}}}]);
//# sourceMappingURL=ui_packages_use-safe-async-callback_use-safe-async-callback_ts-ui_packages_copy-to-clipboard_-4c1096-ef709e89d01a.js.map