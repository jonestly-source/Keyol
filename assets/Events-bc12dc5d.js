import{r as d,j as o,C as i,T as l,G as h,b as c,d as f}from"./index-2c244ab2.js";import{a as n}from"./axios-4a70c6fc.js";class x extends d.Component{constructor(t){super(t),this.state={folder:[]}}initialize(){window.scrollTo(0,0),this.setState({isLoaded:!1}),"caches"in window&&caches.open("folders").then(t=>{t.match("events").then(a=>{a?a.json().then(e=>{Date.now()-e.timestamp<5*60*1e3?n.get("/images?folderId=1KEjiPWNH6mCO0b-VrK8Ax9a2PBXDgD9s&folder=events").then(s=>{const r=new Response(JSON.stringify({folder:s.data.folders,timestamp:Date.now()}));t.put("events",r),this.setState({folder:s.data.folders,isLoaded:!0})}).catch(s=>{throw new Error(s)}):this.setState({folder:e.folder,isLoaded:!0})}):n.get("/images?folderId=1KEjiPWNH6mCO0b-VrK8Ax9a2PBXDgD9s&folder=events").then(e=>{const s=new Response(JSON.stringify({folder:e.data.folders,timestamp:Date.now()}));t.put("events",s),this.setState({folder:e.data.folders,isLoaded:!0})}).catch(e=>{throw new Error(e)})})})}componentDidMount(){this.initialize()}render(){const{folder:t}=this.state;return console.log(t),o.jsxs(i,{children:[o.jsx(l,{children:o.jsx("h2",{children:"Events"})}),o.jsx(h,{className:"gallery",children:t==null?void 0:t.map(({name:a,files:e,folders:s},r)=>o.jsxs(c,{to:`/events/${a}`,delay:r,children:[o.jsx("img",{src:e.length?e[Math.floor(Math.random()*e.length)].src:s[Math.floor(Math.random()*s.length)].files[Math.floor(Math.random()*e.length)].src,loading:"lazy"}),o.jsx(f,{children:a})]},a))})]})}}export{x as default};