"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["ui_packages_item-picker_constants_labels_ts-ui_packages_item-picker_constants_values_ts-ui_pa-163a9a"],{29235:(e,t,r)=>{let s;r.d(t,{H:()=>b});var i=r(10204);let AliveSession=class AliveSession extends i.ib{getUrlFromRefreshUrl(){return n(this.refreshUrl)}constructor(e,t,r,s,i){super(e,()=>this.getUrlFromRefreshUrl(),r,s,void 0,i),this.refreshUrl=t}};async function n(e){let t=await o(e);return t&&t.url&&t.token?a(t.url,t.token):null}async function o(e){let t=await fetch(e,{headers:{Accept:"application/json"}});if(t.ok)return t.json();if(404===t.status)return null;throw Error("fetch error")}async function a(e,t){let r=await fetch(e,{method:"POST",mode:"same-origin",headers:{"Scoped-CSRF-Token":t}});if(r.ok)return r.text();throw Error("fetch error")}var l=r(70170),c=r(5728),u=r(74572),d=r(23683),p=r(97564);function h(e,{channel:t,type:r,data:s}){for(let i of e)i.dispatchEvent(new CustomEvent(`socket:${r}`,{bubbles:!1,cancelable:!1,detail:{name:t,data:s}}))}let f=class AliveSessionProxy{subscribe(e){let t=this.subscriptions.add(...e);t.length&&this.worker.port.postMessage({subscribe:t});let r=new Set(t.map(e=>e.name)),s=e.reduce((e,t)=>{let s=t.topic.name;return(0,i.JR)(s)&&!r.has(s)&&e.add(s),e},new Set);s.size&&this.worker.port.postMessage({requestPresence:Array.from(s)})}unsubscribeAll(...e){let t=this.subscriptions.drain(...e);t.length&&this.worker.port.postMessage({unsubscribe:t});let r=this.presenceMetadata.removeSubscribers(e);this.sendPresenceMetadataUpdate(r)}updatePresenceMetadata(e){let t=new Set;for(let r of e)this.presenceMetadata.setMetadata(r),t.add(r.channelName);this.sendPresenceMetadataUpdate(t)}sendPresenceMetadataUpdate(e){if(!e.size)return;let t=[];for(let r of e)t.push({channelName:r,metadata:this.presenceMetadata.getChannelMetadata(r)});this.worker.port.postMessage({updatePresenceMetadata:t})}online(){this.worker.port.postMessage({online:!0})}offline(){this.worker.port.postMessage({online:!1})}hangup(){this.worker.port.postMessage({hangup:!0})}receive(e){let{channel:t}=e;if("presence"===e.type){let r=this.notifyPresenceDebouncedByChannel.get(t);r||(r=(0,l.s)((e,r)=>{this.notify(e,r),this.notifyPresenceDebouncedByChannel.delete(t)},100),this.notifyPresenceDebouncedByChannel.set(t,r)),r(this.subscriptions.subscribers(t),e);return}this.notify(this.subscriptions.subscribers(t),e)}constructor(e,t,r,s,n,o){this.subscriptions=new i.m0,this.presenceMetadata=new i.VH,this.notifyPresenceDebouncedByChannel=new Map,this.notify=n,this.worker=new SharedWorker(e,`github-socket-worker-v2-${s}`),this.worker.port.onmessage=({data:e})=>this.receive(e),this.worker.port.postMessage({connect:{url:t,refreshUrl:r,options:o}})}};async function m(){let e=function(){let e=document.head.querySelector("link[rel=shared-web-socket-src]")?.getAttribute("href");return e&&e.startsWith("/")?e:null}();if(!e)return;let t=document.head.querySelector("link[rel=shared-web-socket]")?.href??null;if(!t)return;let r=document.head.querySelector("link[rel=shared-web-socket]")?.getAttribute("data-refresh-url")??null;if(!r)return;let s=document.head.querySelector("link[rel=shared-web-socket]")?.getAttribute("data-session-id")??null;if(!s)return;let i=(()=>{let i=(0,p.G7)("alive_longer_retries")?{socketPolicy:{timeout:4e3,attempts:16,maxDelay:512e3}}:{};if(!(0,d.nr)()&&"SharedWorker"in window&&"true"!==(0,u.A)("localStorage").getItem("bypassSharedWorker"))try{return new f(e,t,r,s,h,i)}catch{}return new AliveSession(t,r,!1,h,i)})();return window.addEventListener("online",()=>i.online()),window.addEventListener("offline",()=>i.offline()),window.addEventListener("pagehide",()=>{"hangup"in i&&i.hangup()}),i}async function g(){return await c.G,m()}function b(){return s||(s=g())}},7665:(e,t,r)=>{r.d(t,{$:()=>i});var s=r(10204);function i(e,t,r){if(!e)throw Error("Not connected to alive");if(!t)throw Error("No channel name");let i=s.KK.parse(t);if(!i)throw Error("Invalid channel name");let n={subscriber:{dispatchEvent:e=>{e instanceof CustomEvent&&r(e.detail.data)}},topic:i};return e.subscribe([n]),{unsubscribe:()=>e.unsubscribeAll(n.subscriber)}}},20594:(e,t,r)=>{r.d(t,{Av:()=>a,BM:()=>i,Gr:()=>l,HX:()=>d,M_:()=>p,RD:()=>u,rb:()=>n});var s=r(97156);let i="GraphQLTraces",n="GraphQLTracingRefresh",o=decodeURIComponent(new URLSearchParams(s.fV.search).get("disable_clusters")||"").split(",").filter(e=>""!==e);function a(e){if(!s.cg||!l()||!e)return;let t=s.cg;t&&!t[i]&&(t[i]=[]),t&&e.__trace&&(t[i].push(e.__trace),"function"==typeof t[n]&&t[n]())}function l(){let e=s.cg;return"true"===new URLSearchParams(s.fV.search).get("_tracing")||e&&void 0!==e[i]}function c(){return o.length>0}function u(e){if(!l()&&!c())return e;let t=new URL(e,s.fV.origin);return l()&&t.searchParams.set("_tracing","true"),c()&&t.searchParams.set("disable_clusters",o.join(",")),t.pathname+t.search}function d(e){return o.indexOf(e)>-1}function p(e){let t=o.indexOf(e);t>-1?o.splice(t,1):o.push(e);let r=new URLSearchParams(s.fV.search);r.set("disable_clusters",o.join(",")),s.fV.search=r.toString()}},72035:(e,t,r)=>{r.d(t,{S:()=>s});let s={couldNotUpdateAssignees:"Could not update assignees",couldNotSearchAssignees:"Could not search assignees",couldNotUpdateLabels:"Could not update labels",couldNotSearchLabels:"Could not search labels",couldNotUpdateMilestone:"Could not update milestone",couldNotUpdateType:"Could not update type",couldNotSearchMilestones:"Could not search milestones",couldNotUpdateIssueType:"Could not update issue type",couldNotSearchRepositories:"Could not search repositories",couldNotSearchPullRequests:"Could not search pull requests",couldNotSearchProjects:"Could not search projects",couldNotSearchBranches:"Could not search branches",noMatches:"No matches",noResults:"No results",couldNotCreateBranch:"Could not create branch",couldNotCreateLabel:"Could not create label",branchAlreadyExists:e=>`The branch ${e} already exists.`}},94276:(e,t,r)=>{r.d(t,{B:()=>s});let s={itemPickerRootId:"item-picker-root-id",itemPickerTestId:"item-picker-root"}},40415:(e,t,r)=>{r.d(t,{k:()=>s});let s={noAssignees:"Assignee",assignees:"Assignees",assigneesHeader:e=>`Assign up to ${e} people to this issue`,cantEditItems:e=>`Cannot edit ${e} right now`,noLabels:"Label",labels:"Labels",labelsHeader:"Apply labels to this issue",editLabels:"Edit labels",noProjects:"Project",noMilestones:"Milestone",milestonesHeader:"Set milestone",issueHeader:"Choose issue",noIssues:"Issue",noIssueTypes:"Issue Type",filterOrganizations:"Filter organizations",organizationLabel:"Organization",selectAssignees:"Select assignees",selectMilestones:"Select milestone",selectIssue:"Select issue",selectIssueTypes:"Select issue type",typesHeader:"Select issue type",selectProjects:"Select projects",selectLabels:"Select labels",selectRepository:"Select repository",selectBranch:"Select a branch",selectPr:"Select a pull request",searchPr:"Search pull requests",maxPRsLinkingWarning:"You may only link 10 pull requests to this issue across all repositories.",filterUsers:e=>`Filter ${e.toLowerCase()}s`,filterMilestones:"Filter milestones",filterIssueTypes:"Filter issue types",filterProjects:"Filter projects",noPullRequest:"no pull request",milestones:{pastDue:"Past due by",milestoneClosed:"Closed",milestoneDue:"Due by",noDueDate:"No due date",progressPercentage:e=>e?`, ${Math.round(e)}% complete`:", not started"},testIds:{relativeTimeDescription:"relative-time-description"},getNumberOfSelectedPrsLabel:e=>1===e?`${e} pull request selected`:`${e} pull requests selected`,projectItemsLimitReached:"This project reached the maximum number of items allowed currently (1200 items). To add more, please archive or delete existing items from it.",closeButton:"Close dialog",projectItemsLimitReachedDialogLabel:"Project items limit reached dialog",projectItemsLimitReachedDialogTitle:"Project limits reached",projectItemsLimitReachedDialogMessage:"One or more of the projects you selected reached the maximum number of items allowed currently (1200 items). To add more, please archive or delete existing items from the selected project(s)."}},57832:(e,t,r)=>{r.d(t,{Z:()=>s});let s={activePickerOption:e=>`[data-id="${e}"] [data-is-active-descendant="activated-directly"]`}},39126:(e,t,r)=>{r.d(t,{t:()=>s});let s={pickerDebounceTime:200,labelsPageSize:50,labelsInitialLoadCount:100,milestonesPageSize:100,milestonesMaxPreloadCount:1e3,organizationsMaxPreloadCount:1e3,organizationsPageSize:100,maximumSuggestedUsers:30}},47555:(e,t,r)=>{r.d(t,{A2:()=>c,J4:()=>l,Q3:()=>n,v8:()=>o});var s=r(38621),i=r(72035);let n={leadingVisual:s.CircleSlashIcon,text:i.S.noMatches,disabled:!0,selected:void 0,key:"no-matches",id:"no-matches"},o={leadingVisual:s.CircleSlashIcon,text:i.S.noResults,disabled:!0,selected:void 0,key:"no-results",id:"no-results"},a=e=>{try{new URL(e)}catch{return!1}return new RegExp(/^.+\/issues\/\d+$/).test(e)};function l(e,t,r,s,i){let n=e.indexOf("/"),o="in:name archived:false";if(r&&(o=`${o} -repo:${r}`),s&&(o=`${o} fork:true`),i&&"PUBLIC"!==i&&(o=`${o} -visibility:public`),n>0&&2===e.split("/").length){let t=e.split("/")[0],r=e.split("/")[1];return`${o} org:${t} ${r}`}return t?`${o} org:${t} ${e}`:`${o} ${e}`}let c=(e="",t="",r="")=>{let s=e&&`owner:${e.trim()} `,i=r&&`repo:${r.trim()} `,n=t&&`${t.trim()}`,o=a(t),l="in:title",c=n&&"#"===n.charAt(0)?n.slice(1):n;c&&!isNaN(Number(c))&&(l+=" in:number");let u=`${s}${i}is:issue ${l}`;return{commenters:`${u} commenter:@me ${n}`.trim(),mentions:`${u} mentions:@me ${n}`.trim(),assignee:`${u} assignee:@me ${n}`.trim(),author:`${u} author:@me ${n}`.trim(),other:`${u} ${n}`.trim(),resource:o?encodeURI(t):"",queryIsUrl:o}}},51884:(e,t,r)=>{r.d(t,{VB:()=>SSRNetwork,SD:()=>_,E7:()=>C});var s=r(40961),i=r(69487),n=r(20594),o=r(28784),a=r(97156),l=r(23780);let c=["SAML","SERVICE_UNAVAILABLE"],u={FORBIDDEN:["SAML error"],AUTHENTICATION:["Couldn\u2019t authenticate you"]},d={NOT_FOUND:["repository","discussion"]},p=class ValidationError extends Error{constructor(e,t,r){super(e,t),this.catalogService=r,this.name="ValidationError"}};async function h(e,t,r){if(e.status>401&&404!==e.status){let s=await e.text(),i={url:e.url,timestamp:new Date().toISOString(),persistedQueryId:t,persistedQueryName:r,failureRequestId:e.headers.get("X-Github-Request-Id")};throw Error(`HTTP error (${e.status}): ${s||"No additional text"}.
    Error Info: ${JSON.stringify(i)}`)}}async function f(e,t,r,s="GET",i,n,o,a){return(await m(e,t,r,s,{isSubscription:!1,scope:void 0},i,n,o,a)).response}async function m(e,t,r,s="POST",o={},h,f,b,y){let w=JSON.stringify((0,i.stableCopy)({query:e,variables:r,...o.scopeObject?{scopeObject:o.scopeObject}:{}})),{isSubscription:S,scope:k,subscriptionTopic:v,dispatchTime:P}=o,C=function(e,t,r,s,i,n,o="/_graphql"){let l=[];if("GET"===e&&l.push(`body=${t}`),r&&l.push("subscription=1"),i&&l.push(`scope=${encodeURIComponent(i)}`),s&&l.push(`subscriptionTopic=${encodeURIComponent(s)}`),n&&l.push(`dispatchTime=${encodeURIComponent(n)}`),a.cg){let e=new URL(a.cg.location.href,a.cg.location.origin).searchParams.get("_features");e&&l.push(`_features=${e}`)}return l.length>0?`${o}?${l.join("&")}`:o}(s,encodeURIComponent(w),S,v,k,P,h),_=null;try{let{subscriptionId:r,requestId:i,json:o,status:a}=await g(C,s,e,t,w,f);if(_=r,b&&o.errors){let e=b[a];if(e)for(let r of o.errors){let s=e[r.type];s?.({persistedQueryName:t,errorMessage:r.message})}}let h=function(e,t,r,s){if("errors"in e&&(e.errors.filter(e=>c.includes(e.type)||!!u[e.type]?.includes(e.message)||!(JSON.stringify(d[e.type])!==JSON.stringify(e.path))).map(e=>{console.error(`Failed to fetch data. Please use this request ID when contacting support: ${t} Error: ${e.type}: ${e.message} (path: ${e.path})`)}),e.errors=e.errors.filter(e=>!c.includes(e.type)&&!u[e.type]?.includes(e.message)&&JSON.stringify(d[e.type])!==JSON.stringify(e.path))),"errors"in e&&e.errors.length){let t=e.errors.map(e=>`GraphQL error: ${e.type}: ${e.message} (path: ${e.path})`).join(", "),i=new p(`${t} (Persisted query id: ${r})`,{cause:e.errors},e.extensions?.query_owning_catalog_service);if(s)(0,l.N7)(i),s.error(i);else throw i}if(!("data"in e)){let i=Error(`Expected data property in response: ${JSON.stringify(e)}. persistedQueryId: ${r}, requestId: ${t}`);if(s)(0,l.N7)(i),s.error(i);else throw i}return e}(o,i,e,y);return h&&(0,n.Av)(h),{subscriptionId:_,response:h}}catch(e){if(y)return(0,l.N7)(e),y.error(e),{subscriptionId:_,response:{errors:[{message:"An error occurred while fetching data. Please try again later."}],extensions:{}}};throw e}}async function g(e,t,r,s,i,o){return b((0,n.RD)(e),t,r,s,i,o)}async function b(e,t,r,s,i,n){let a;let l={};n?.issues_react_perf_test&&(l["X-LUC-Environment"]="issues"),l["X-Requested-With"]="XMLHttpRequest",a="GET"===t?await fetch(e,{method:t,cache:"no-cache",credentials:"include",headers:l}):await (0,o.DI)(e,{method:t,headers:{Accept:"application/json",...l},...i?{body:i}:void 0}),await h(a,r,s);let c=await a.json();return{subscriptionId:a.headers.get("X-Subscription-ID"),requestId:a.headers.get("X-Github-Request-Id")||"",json:c,status:a.status}}let y=[{kind:"linked",handle(e,t,r){if(null!=t&&t.getType()===i.ROOT_TYPE&&"node"===e.name&&r.hasOwnProperty("id"))return r.id}},{kind:"pluralLinked",handle(e,t,r){if(null!=t&&t.getType()===i.ROOT_TYPE&&"nodes"===e.name&&r.hasOwnProperty("ids"))return r.ids}}];var w=r(29235),S=r(7665),k=r(69982);function v(e){return(0,k.unstable_scheduleCallback)(k.unstable_LowPriority,e)}let P={cancel:()=>!1,schedule:e=>((0,s.unstable_batchedUpdates)(e),"")};let SSRNetwork=class SSRNetwork{execute(e,t,r){return this.relayNetwork.execute(e,t,r)}getPreloadedSubscriptions(){return this.preloadedSubscriptions}constructor(e,t={},r,s,n,o){this.ssrPreloadedData=e,this.enabled_features=t,this.preloadedSubscriptions=r,this.warningsShown=new Set,this.maxAge=n,this.errorCallbacks=o,this.relayNetwork=i.Network.create((e,t)=>i.Observable.create(r=>{let i=function({params:e,variables:t,ssrPreloadedQueries:r,baseUrl:s,emitWarning:i,enabledFeatures:n,maxAge:o,errorCallbacks:l,observer:c}){if(!e.id)throw Error("params has no id property!");if(e.id&&r){let s=JSON.stringify(t),i=r.get(e.id)?.get(s),n=Math.floor(Date.now()/1e3),l=i?.timestamp;if(i&&(c.next(i),!(o&&l&&n>l+o))){c.complete();return}e.metadata?.isRelayRouteRequest&&(0,a.g5)()}let u="mutation"===e.operationKind?"POST":"GET";if(a.KJ)return f(e.id,e.name,t,u,s,n,l,c)}({params:e,variables:t,ssrPreloadedQueries:this.ssrPreloadedData,baseUrl:s,emitWarning:e=>{this.warningsShown.has(e)||(this.warningsShown.add(e),console.warn(e))},enabledFeatures:this.enabled_features,maxAge:n,errorCallbacks:this.errorCallbacks,observer:r});i instanceof Promise&&i.then(e=>{if(!Array.isArray(e)&&"extensions"in e&&e.extensions&&e.extensions.subscriptions){let t=e.extensions.subscriptions;for(let e in t)for(let r in this.preloadedSubscriptions.has(e)||this.preloadedSubscriptions.set(e,new Map),t[e])this.preloadedSubscriptions.get(e)?.set(r,t[e][r])}r.next(e),r.complete()})}),(e,t)=>(function(e,t,r=new Map){let s=e.id,n=e.name;return i.Observable.create(i=>{let o=()=>{},a=!1;return async function(){if(!s)throw Error("unexpected operation with no id!");let c=e.metadata?.scope,u=function(e,t,r,s){let i=s.get(e);if(i)e:for(let[e,s]of i){for(let[s,i]of Object.entries(JSON.parse(e)))if("$scope"===s&&r!==i||t[s]!==i)continue e;return s}}(s,t,c,r),d=null;if(u)d=u.subscriptionId,u.response&&i.next(u.response);else{let e=await m(s,n,t,"GET",{isSubscription:!0,scope:c});d=e.subscriptionId,e.response&&i.next(e.response)}try{let e=await (0,w.H)();if(a)return;let r=(0,S.$)(e,d,async({scope_object:e,subscription_topic:r,dispatch_time:o})=>{try{let{response:a}=await m(s,n,{...t},"GET",{isSubscription:!0,scopeObject:e,subscriptionTopic:r,dispatchTime:o,scope:c});a&&i.next(a)}catch(e){(0,l.N7)(e,{message:`Error in fetching update for ${s} with variables ${JSON.stringify(t)}`})}});r?.unsubscribe&&(o=r.unsubscribe)}catch(e){i.error(e)}}(),{get closed(){return a},unsubscribe(){a=!0,o()}}})})(e,t,this.preloadedSubscriptions))}};let C=(e,t)=>{let r=new SSRNetwork(new Map,{},new Map,e,void 0,t),s=new i.Environment({scheduler:P,store:new i.Store(new i.RecordSource,{gcReleaseBufferSize:50,queryCacheExpirationTime:3e5,gcScheduler:v}),getDataID:(e,t)=>{if("Viewer"===t)return null==e.id?(0,i.generateClientID)("client:root","viewer"):e.id;if("ProjectV2SingleSelectFieldOption"===t){let t=[];return e.id&&t.push(e.id),e.name&&t.push(e.name),e.color&&t.push(e.color),e.description&&t.push(function(e){let t=0;if(0===e.length)return t;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return t}(e.description)),t.join("_")}return e.id},network:r,missingFieldHandlers:y});return s.options={baseUrl:e,getPreloadedSubscriptions:()=>r.getPreloadedSubscriptions()},s};function _({environment:e,query:t,variables:r={}}){let s=(0,i.getRequest)(t),n=(0,i.createOperationDescriptor)(s,r);return e.retain(n),(0,i.fetchQuery)(e,t,r,{fetchPolicy:"store-or-network"})}},88360:(e,t,r)=>{r.d(t,{d:()=>o});var s=r(10120),i=r(23125),n=r(96540);let o=(e,t,{leading:r=!1,maxWait:o,trailing:a=!0,onChangeBehavior:l="flush"}={})=>{let c=(0,s.M)(e),u=(0,n.useMemo)(()=>{let e=void 0===o?{leading:r,trailing:a}:{leading:r,trailing:a,maxWait:o};return(0,i.A)((...e)=>c.current(...e),t,e)},[c,t,r,o,a]);return(0,n.useEffect)(()=>()=>{u?.[l]()},[u,l]),u}},6664:(e,t,r)=>{r.d(t,{AR:()=>n,_N:()=>o});var s=r(51012),i=r(96540),n=function(e){return e.ctrlKey="ctrlKey",e.altKey="altKey",e.shiftKey="shiftKey",e.metaKey="metaKey",e}({});let o=(e,t,r)=>{let o=(0,i.useRef)(t);(0,s.N)(()=>{o.current=t});let a=(0,i.useCallback)(t=>{!([...document.querySelectorAll('#__primerPortalRoot__, [id$="-portal-root"]')].some(function e(t){if(t.clientHeight>0)return!0;for(let r of t.children)if(e(r))return!0;return!1})&&!r?.triggerWhenPortalIsActive||!function(e,t){for(let r of Object.values(n))if(t&&t[r]&&!e[r]||e[r]&&(!t||!t[r]))return!1;return!0}(t,r)&&!r?.ignoreModifierKeys||!r?.triggerWhenInputElementHasFocus&&function(e){return e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLInputElement}(t))&&e.some(e=>/^\d$/.test(e)?t.code===`Digit${e}`:"/"===e?"Slash"===t.code:t.key===e)&&o.current(t)},[e,r]);(0,i.useEffect)(()=>{let e=r?.scopeRef?.current||document;return e.addEventListener("keydown",a),()=>e.removeEventListener("keydown",a)},[a,r?.scopeRef])}},28784:(e,t,r)=>{function s(e,t={}){!function(e){if(new URL(e,window.location.origin).origin!==window.location.origin)throw Error("Can not make cross-origin requests from verifiedFetch")}(e);let r={...t.headers,"GitHub-Verified-Fetch":"true","X-Requested-With":"XMLHttpRequest"};return fetch(e,{...t,headers:r})}function i(e,t){let r={...t?.headers??{},Accept:"application/json","Content-Type":"application/json"},i=t?.body?JSON.stringify(t.body):void 0;return s(e,{...t,body:i,headers:r})}function n(e,t={}){let r={...t.headers,"GitHub-Is-React":"true"};return s(e,{...t,headers:r})}function o(e,t){let r={...t?.headers??{},"GitHub-Is-React":"true"};return i(e,{...t,headers:r})}r.d(t,{DI:()=>s,QJ:()=>n,Sr:()=>o,lS:()=>i})},35625:(e,t,r)=>{r.d(t,{D:()=>m,O:()=>f});var s=r(74848),i=r(6664),n=r(19920),o=r(96540),a=r(1093),l=r(47555),c=r(94276),u=r(57832),d=r(26750),p=r(97564),h=r(15033);function f({items:e,initialSelectedItems:t,placeholderText:r,selectionVariant:f,loading:g,groups:b,filterItems:y,renderAnchor:w,getItemKey:S,convertToItemProps:k,onSelectionChange:v,onOpen:P,onClose:C,height:_="small",width:I="small",selectPanelRef:$,enforceAtleastOneSelected:R,insidePortal:N,maxVisibleItems:E=9,nested:M=!1,resultListAriaLabel:x,title:T,subtitle:A,preventClose:O,triggerOpen:L,initialFilter:j,customNoResultsItem:D,customNoMatchItem:U,footer:q,keybindingCommandId:H,pickerId:B}){let[F,G]=(0,o.useState)(L??!1),[V,J]=(0,o.useState)([]),[K,z]=(0,o.useState)(j??""),{updateOpenState:W,anyItemPickerOpen:Q}=(0,a.t)(),X=(0,o.useId)();B&&(X=B);let Y=(0,p.G7)("issues_react_blur_item_picker_on_close");(0,o.useEffect)(()=>{void 0!==L&&G(L)},[L]);let Z=(0,o.useCallback)(()=>{Q()||F||(G(!0),P&&P())},[Q,F,P]);(0,o.useEffect)(()=>{W(X,F)},[X,F,W]);let ee=(0,o.useMemo)(()=>new Map,[X,t]),et=(0,o.useCallback)((e,t)=>{let r=S(e),s=ee.get(r);if(s)return s;(s=k(e)).selected=t;let i=s.onAction;return s.onAction=(t,s)=>{let n=ee.get(r);if(n){if(n.selected=!n.selected,"single"===f&&e.id!==K)for(let[,e]of ee)e!==n&&(e.selected=!1);i&&i(t,s)}},ee.set(r,s),s},[k,K,S,ee,f]),er=(0,o.useCallback)(e=>"string"==typeof e?e:S(e),[S]),es=(0,o.useMemo)(()=>{let r=e.map(e=>e.__isNew__?(delete e.__isNew__,U&&ee.delete(S(U)),et(e,!0)):et(e,t.some(t=>er(t)===S(e))));return 0===r.length?U?[et(U,!1)]:K?[U??l.Q3]:[D??l.v8]:r},[U,e,ee,et,t,er,S,K,D]);(0,o.useEffect)(()=>{J(es.filter(e=>e.selected))},[es]);let ei=(0,o.useMemo)(()=>"single"===f?V[0]:V,[V,f]),en=(0,o.useCallback)(e=>{if(void 0===e){R||J([]);return}J((Array.isArray(e)?e:[e]).map(e=>es.find(t=>e.id===t.id)).filter(e=>void 0!==e))},[R,es]);(0,i._N)([" "],e=>{if(F){let t=document.querySelector(u.Z.activePickerOption(c.B.itemPickerRootId));if(t){let r=t.getAttribute("data-id"),s=[...ee.values()].find(e=>e.id===r);s&&(e.preventDefault(),e.stopPropagation(),s.selected=!s.selected,J([...ee.values()].filter(e=>e.selected)))}}},{triggerWhenInputElementHasFocus:!0,triggerWhenPortalIsActive:!0});let eo=(0,o.useCallback)(e=>{if(O&&!e)return;if(Y&&!e&&document.activeElement instanceof HTMLElement&&document.activeElement?.blur(),G(e),e&&P){P();return}z(""),C&&C();let r=[...ee.values()].filter(e=>e.selected).map(e=>e.source);(r.length!==t.length||r.some(e=>!t.some(t=>er(t)===S(e))))&&v(r)},[O,C,ee,t,P,er,S,v,Y]);(0,o.useEffect)(()=>{y(K)},[K,y]);let ea=es.length>0;1===es.length&&(es[0].id===l.Q3.id||es[0].id===l.v8.id)&&(ea=!1);let el=(0,o.useMemo)(()=>b&&b?.length>1&&ea?{groupMetadata:b}:{},[b,ea]),ec=m(N,$,es.length<=E?"auto":_),eu=(0,o.useMemo)(()=>({renderAnchor:w,placeholderText:r,open:F,onOpenChange:eo,loading:g,items:es,selected:ei,onSelectedChange:en,filterValue:K,onFilterChange:z,showItemDividers:!0,overlayProps:{width:I,...ec},...el,"aria-label":x,"data-id":c.B.itemPickerRootId,"data-testid":c.B.itemPickerTestId,title:T,subtitle:A,footer:q}),[w,r,F,eo,g,es,ei,en,K,I,ec,el,x,T,A,q]),ed=(0,p.G7)("item_picker_new_select_panel");return(0,s.jsxs)(h.g,{flags:{primer_react_select_panel_with_modern_action_list:ed},children:[H&&(0,s.jsx)(d.ak,{commands:{[H]:Z}}),(0,s.jsx)(n.X,{anchorRef:M?void 0:$,...eu})]})}function m(e,t,r){let s=e?"large":r;if(!e||!t?.current)return{height:s};let{top:i,left:n}=t.current.getBoundingClientRect(),o=i-436;return o<0?{height:s}:{height:s,top:o,left:n,position:"fixed"}}try{f.displayName||(f.displayName="ItemPicker")}catch{}},1093:(e,t,r)=>{r.d(t,{D:()=>o,t:()=>a});var s=r(74848),i=r(96540);let n=(0,i.createContext)({updateOpenState:()=>void 0,anyItemPickerOpen:()=>!1});function o({children:e}){let t=(0,i.useRef)({}),r=(0,i.useCallback)((e,r)=>{let s=t.current;return s[e]===r||(t.current={...s,[e]:r}),t.current},[]),o=(0,i.useCallback)(()=>Object.values(t.current).some(e=>e),[t]),a=(0,i.useMemo)(()=>({updateOpenState:r,anyItemPickerOpen:o}),[o,r]);return(0,s.jsx)(n.Provider,{value:a,children:e})}function a(){let e=(0,i.useContext)(n);if(!e)throw Error("useItemPickersContext must be used within a ItemPickersContextProvider.");return e}try{n.displayName||(n.displayName="ItemPickersContext")}catch{}try{o.displayName||(o.displayName="ItemPickersContextProvider")}catch{}}}]);
//# sourceMappingURL=ui_packages_item-picker_constants_labels_ts-ui_packages_item-picker_constants_values_ts-ui_pa-163a9a-2259e0ca4ff4.js.map