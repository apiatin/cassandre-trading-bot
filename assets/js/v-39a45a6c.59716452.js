"use strict";(self.webpackChunkcassandre_trading_bot_website=self.webpackChunkcassandre_trading_bot_website||[]).push([[662],{180:(n,a,s)=>{s.r(a),s.d(a,{data:()=>e});const e={key:"v-39a45a6c",path:"/learn/exchange-connection-configuration.html",title:"Configure exchange connection",lang:"en-US",frontmatter:{lang:"en-US",title:"Configure exchange connection",description:"Learn how to configure Cassandre to connect to a specific exchange (kucoin, Binance, Coinbase...)"},excerpt:"",headers:[{level:2,title:"How does it works?",slug:"how-does-it-works",children:[]},{level:2,title:"Configuration examples",slug:"configuration-examples",children:[{level:3,title:"Kucoin",slug:"kucoin",children:[]},{level:3,title:"Coinbase",slug:"coinbase",children:[]},{level:3,title:"Binance",slug:"binance",children:[]}]}],filePathRelative:"learn/exchange-connection-configuration.md"}},9099:(n,a,s)=>{s.r(a),s.d(a,{default:()=>b});var e=s(6252);const t=(0,e._)("h1",{id:"configure-exchange-connection",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#configure-exchange-connection","aria-hidden":"true"},"#"),(0,e.Uk)(" Configure exchange connection")],-1),p=(0,e._)("h2",{id:"how-does-it-works",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#how-does-it-works","aria-hidden":"true"},"#"),(0,e.Uk)(" How does it works?")],-1),c=(0,e._)("p",null,"There are two steps to configure an exchange connection in Cassandre.",-1),o=(0,e.Uk)("Cassandre uses "),l={href:"https://github.com/knowm/XChange",target:"_blank",rel:"noopener noreferrer"},i=(0,e.Uk)("XChange"),r=(0,e.Uk)(", a Java library providing a streamlined API for interacting with 60+ Bitcoin and Altcoin exchanges. The first thing you have to do is to find the XChange library suited for the Exchange you chose. The list is "),u={href:"https://search.maven.org/search?q=org.knowm.xchange",target:"_blank",rel:"noopener noreferrer"},g=(0,e.Uk)("here"),d=(0,e.Uk)("."),k=(0,e.uE)('<p>For example, for a Coinbase connection, you have to add this to your <code>pom.xml</code>:</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.knowm.xchange<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>xchange-coinbasepro<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.0.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>The second step is to update those properties in your <code>application.properties</code>:</p><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code><span class="token comment"># Exchange configuration.</span>\n<span class="token attr-name">cassandre.trading.bot.exchange.driver-class-name</span><span class="token punctuation">=</span><span class="token attr-value">org.knowm.xchange.coinbasepro.CoinbaseProExchange</span>\n<span class="token attr-name">cassandre.trading.bot.exchange.username</span><span class="token punctuation">=</span><span class="token attr-value">kucoin.cassandre.test@gmail.com</span>\n<span class="token attr-name">cassandre.trading.bot.exchange.passphrase</span><span class="token punctuation">=</span><span class="token attr-value">cassandre</span>\n<span class="token attr-name">cassandre.trading.bot.exchange.key</span><span class="token punctuation">=</span><span class="token attr-value">6054ad25365ac6000689a998</span>\n<span class="token attr-name">cassandre.trading.bot.exchange.secret</span><span class="token punctuation">=</span><span class="token attr-value">af080d55-afe3-47c9-8ec1-4b479fbcc5e7</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>For <code>cassandre.trading.bot.exchange.driver-class-name</code>, you have to set the main class inside the XChange library.</p><p>The other parameters <code>username</code>, <code>passphrase</code>, <code>key</code> and<code>secret</code> are authentication parameters given by the Exchange when you will create your API access in your account.</p><h2 id="configuration-examples" tabindex="-1"><a class="header-anchor" href="#configuration-examples" aria-hidden="true">#</a> Configuration examples</h2><h3 id="kucoin" tabindex="-1"><a class="header-anchor" href="#kucoin" aria-hidden="true">#</a> Kucoin</h3><p>Add this dependency to your ̀pom.xml`:</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.knowm.xchange<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>xchange-kucoin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.0.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>and update your <code>application.properties</code>:</p><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code><span class="token attr-name">cassandre.trading.bot.exchange.driver-class-name</span><span class="token punctuation">=</span><span class="token attr-value">kucoin</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="coinbase" tabindex="-1"><a class="header-anchor" href="#coinbase" aria-hidden="true">#</a> Coinbase</h3><p>Add this dependency to your ̀pom.xml`:</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.knowm.xchange<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>xchange-coinbasepro<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.0.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>and update your <code>application.properties</code>:</p><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code><span class="token attr-name">cassandre.trading.bot.exchange.driver-class-name</span><span class="token punctuation">=</span><span class="token attr-value">org.knowm.xchange.coinbasepro.CoinbaseProExchange</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="binance" tabindex="-1"><a class="header-anchor" href="#binance" aria-hidden="true">#</a> Binance</h3><p>Add this dependency to your ̀pom.xml`:</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.knowm.xchange<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>xchange-binance<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>5.0.12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>and update your <code>application.properties</code>:</p><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code><span class="token attr-name">cassandre.trading.bot.exchange.driver-class-name</span><span class="token punctuation">=</span><span class="token attr-value">org.knowm.xchange.binance.BinanceExchange</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',22),h={},b=(0,s(3744).Z)(h,[["render",function(n,a){const s=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[t,p,c,(0,e._)("p",null,[o,(0,e._)("a",l,[i,(0,e.Wm)(s)]),r,(0,e._)("a",u,[g,(0,e.Wm)(s)]),d]),k],64)}]])},3744:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,e]of a)s[n]=e;return s}}}]);