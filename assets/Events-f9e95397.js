import{r as h,j as n,C as c,L as f,T as p,G as m,b as j,d as x,P as i}from"./index-e28ded28.js";function l({files:r,folders:t}){const o=s=>Math.floor(Math.random()*s);let e="";return r.length?e=r[o(r.length)].thumbnailLink:e=t[o(t.length)].files[r.length].thumbnailLink,n.jsx("img",{src:e,alt:"",loading:"lazy"})}class u extends h.Component{constructor(t){super(t),this.state={folder:[],isLoaded:!1}}initialize(){window.scrollTo(0,0),this.setState({isLoaded:!1}),"caches"in window&&caches.open("folders").then(t=>{t.match("events").then(o=>{o?o.json().then(e=>{Date.now()-e.timestamp<5*60*1e3?fetch("https://keyol.vercel.app/images?folderId=1KEjiPWNH6mCO0b-VrK8Ax9a2PBXDgD9s&folderPath=events&range=3").then(s=>s.json()).then(s=>{const a=new Response(JSON.stringify({folder:s.folders,timestamp:Date.now()}));t.put("events",a),this.setState({folder:s.folders,isLoaded:!0})}).catch(s=>{throw new Error(s)}):this.setState({folder:e.folder,isLoaded:!0})}):fetch("https://keyol.vercel.app/images?folderId=1KEjiPWNH6mCO0b-VrK8Ax9a2PBXDgD9s&folderPath=events&range=3").then(e=>e.json()).then(e=>{const s=new Response(JSON.stringify({folder:e.folders,timestamp:Date.now()}));t.put("events",s),this.setState({folder:e.folders,isLoaded:!0})}).catch(e=>{throw new Error(e)})})})}componentDidMount(){this.initialize()}render(){const{folder:t,isLoaded:o}=this.state;return n.jsxs(c,{children:[o?void 0:n.jsx(f,{}),n.jsx(p,{children:n.jsx("h2",{children:"Events"})}),n.jsx(m,{className:"gallery",children:t==null?void 0:t.map(({name:e,files:s,folders:a},d)=>n.jsxs(j,{to:`/events/${e}`,delay:d,children:[n.jsx(l,{files:s,folders:a}),n.jsx(x,{children:e})]},e))})]})}}l.propTypes={files:i.object,folders:i.object};export{u as default};