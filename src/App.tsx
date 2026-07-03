import React, { useState, useEffect, useRef } from 'react';
import { Shield, Skull, Flame, Terminal, Play, CheckCircle, Search, Cpu, Key, UserCheck, AlertTriangle, Eye, Lock } from 'lucide-react';

// --- ALL 55+ MEGAPORTAL CORE SEARCH ENGINES & COMPREHENSIVE PIPELINE ---
const URL_PIPELINE_MAP: Record<string, string> = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  yahoo: 'https://search.yahoo.com/search?p=',
  duck: 'https://duckduckgo.com/?q=',
  brave: 'https://search.brave.com/search?q=',
  startpage: 'https://www.startpage.com/sp/search?query=',
  swisscows: 'https://swisscows.com/web?query=',
  qwant: 'https://www.qwant.com/?q=',
  mojeek: 'https://www.mojeek.com/search?q=',
  ask: 'https://www.ask.com/web?q=',
  aol: 'https://search.aol.com/aol/search?q=',
  lycos: 'https://searchlycos.lycos.com/web/?q=',
  github: 'https://github.com/search?q=',
  stackoverflow: 'https://stackoverflow.com/search?q=',
  sourceforge: 'https://sourceforge.net/directory/?q=',
  phind: 'https://www.phind.com/search?q=',
  shodan: 'https://www.shodan.io/search?query=',
  wiki: 'https://en.wikipedia.org/w/index.php?search=',
  scholar: 'https://scholar.google.com/scholar?q=',
  archive: 'https://archive.org/search.php?query=',
  wolfram: 'https://www.wolframalpha.com/input?i=',
  britannica: 'https://www.britannica.com/search?query=',
  youtube: 'https://www.youtube.com/results?search_query=',
  pinterest: 'https://www.pinterest.com/search/pins/?q=',
  flickr: 'https://www.flickr.com/search/?text=',
  reddit: 'https://www.reddit.com/search/?q=',
  giphy: 'https://giphy.com/search/',
  baidu: 'https://www.baidu.com/s?wd=',
  yandex: 'https://yandex.com/search/?text=',
  naver: 'https://search.naver.com/search.naver?query=',
  ecosia: 'https://www.ecosia.org/search?q=',
  searx: 'https://searx.be/search?q=',
  gibiru: 'https://gibiru.com/results.html?q=',
  metager: 'https://metager.org/meta/meta.ger3?eingabe=',
  you: 'https://you.com/search?q=',
  perplex: 'https://www.perplexity.ai/?q=',
  exalead: 'https://www.exalead.com/search/web/results/?q=',
  dogpile: 'https://www.dogpile.com/serp?q=',
  webcrawler: 'https://www.webcrawler.com/serp?q=',
  infospace: 'https://www.infospace.com/serp?q=',
  excite: 'https://results.excite.com/serp?q=',
  hotbot: 'https://www.hotbot.com/web?q=',
  rambler: 'https://search.rambler.ru/?query=',
  seznam: 'https://search.seznam.cz/?q=',
  daum: 'https://search.daum.net/search?w=tot&q=',
  goo: 'https://search.goo.ne.jp/web.jsp?MT=',
  coccoc: 'https://coccoc.com/search?query=',
  swisssearch: 'https://www.swissinfo.ch/eng/search?query=',
  alltheweb: 'https://www.alltheweb.com/search?q=',
  mooter: 'https://www.mooter.com/search?q=',
  teoma: 'https://www.teoma.com/serp?q=',
  entireweb: 'https://www.entireweb.com/search?q=',
  search_ch: 'https://www.search.ch/?q=',
  giga: 'https://www.gigablast.com/search?q=',
  searchencrypt: 'https://www.searchencrypt.com/search?q=',

  // Category 2:🕵️ ઓસિંટ, આઈપી ક્વાલિટી અને ફૂટપ્રિન્ટ
  ipquality: 'https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/',
  naamai: 'https://naam.ai/',
  instantuser: 'https://instantusername.com/#',
  usersearch: 'https://usersearch.org/',
  digitalfootprint: 'https://www.google.com/search?q=site:linkedin.com+OR+site:instagram.com+',
  whatsmyname: 'https://whatsmyname.app/',
  sherlock: 'https://sherlock-project.github.io/',
  haveibeenpwned: 'https://haveibeenpwned.com/unifiedsearch/',
  dehashed: 'https://dehashed.com/search?query=',
  intelx: 'https://intelx.io/?s=',
  virustotal: 'https://www.virustotal.com/gui/search/',
  urlscan: 'https://urlscan.io/search/#',
  dnsdumpster: 'https://dnsdumpster.com/',
  crtsh: 'https://crt.sh/?q=',
  hunterio: 'https://hunter.io/try/search/',
  voilanorbert: 'https://www.voilanorbert.com/',
  anyrun: 'https://app.any.run/',
  hybridanalysis: 'https://www.hybrid-analysis.com/search?query=',
  censys: 'https://censys.io/ipv4?q=',
  zoomeye: 'https://www.zoomeye.org/searchResult?q=',
  ipinfo: 'https://ipinfo.io/',
  ipapi: 'https://ip-api.com/#',
  arin: 'https://rdap.arin.net/registry/ip/',
  ripe: 'https://apps.db.ripe.net/db-web-ui/query?searchtext=',
  bgpview: 'https://bgpview.io/ip/',
  mxtoolbox: 'https://mxtoolbox.com/SuperTool.aspx?action=mx%3a',
  viewdns: 'https://viewdns.info/ipwhois/?ip=',
  threatcrowd: 'https://www.threatcrowd.org/pivot.php?data=',
  otx: 'https://otx.alienvault.com/indicator/ip/',
  abuseipdb: 'https://www.abuseipdb.com/check/',
  scamalytics: 'https://scamalytics.com/ip/',
  blacklistmaster: 'https://www.blacklistmaster.com/',
  builtwith: 'https://builtwith.com/',
  wappalyzer: 'https://www.wappalyzer.com/lookup/',
  wayback: 'https://web.archive.org/web/',
  socialsearcher: 'https://www.social-searcher.com/search/?q=',
  tineye: 'https://tineye.com/search/?url=',
  pimeyes: 'https://pimeyes.com/',
  osintframework: 'https://osintframework.com/',
  spiderfoot: 'https://www.spiderfoot.net/',
  maltego: 'https://www.maltego.com/',
  wigle: 'https://wigle.net/',
  shodandomain: 'https://www.shodan.io/domain/',
  threatminer: 'https://www.threatminer.org/host.php?q=',
  pulsedive: 'https://pulsedive.com/indicator/?ioc=',
  leaklookup: 'https://leak-lookup.com/',
  snusbase: 'https://snusbase.com/',
  inteltechniques: 'https://inteltechniques.com/',
  iknowwhatyoudownload: 'https://iknowwhatyoudownload.com/en/peer/?ip=',
  dnslytics: 'https://dnslytics.com/ip/',
  domaintools: 'https://whois.domaintools.com/',
  securitytrails: 'https://securitytrails.com/domain/',
  spyse: 'https://spyse.com/',
  greynoise: 'https://viz.greynoise.io/ip/',
  phonebookcz: 'https://phonebook.cz/',
  emailrep: 'https://emailrep.io/',
  phoneinfoga: 'https://sundowndev.github.io/phoneinfoga/',
  epieos: 'https://epieos.com/?q=',
  holehe: 'https://github.com/megadose/holehe',
  maigret: 'https://github.com/soxoj/maigret',
  grepapp: 'https://grep.app/search?q=',
  onyphe: 'https://www.onyphe.io/search/?q=',
  fofa: 'https://fofa.info/result?qbase64=',
  binaryedge: 'https://www.binaryedge.io/',
  riskiq: 'https://community.riskiq.com/search/',
  recordedfuture: 'https://www.recordedfuture.com/',
  flashpoint: 'https://www.flashpoint.io/',
  crowdsec: 'https://app.crowdsec.net/cti/',
  urlhaus: 'https://urlhaus.abuse.ch/browse.php?search=',
  maltiverse: 'https://maltiverse.com/search?query=',
  polyverse: 'https://polyverse.com/',
  binaryalert: 'https://github.com/airbnb/binaryalert',
  dnstwist: 'https://dnstwist.it/',
  subfinder: 'https://github.com/projectdiscovery/subfinder',

  // Category 3: 🌍 નેટવર્ક અને ડોમેન ટૂલ્સ
  hackertarget: 'https://hackertarget.com/',
  yougetsignal: 'https://www.yougetsignal.com/tools/',
  pentesttools: 'https://pentest-tools.com/',
  cyberchef: 'https://gchq.github.io/CyberChef/',
  dnschecker: 'https://dnschecker.org/#',
  whois: 'https://www.whois.com/whois/',
  nslookup: 'https://www.nslookup.io/search?q=',
  dnspropagation: 'https://www.dnsperf.com/',
  intodns: 'https://intodns.com/',
  zonemaster: 'https://zonemaster.net/',
  dnstable: 'https://dnstable.com/',
  spfcheck: 'https://www.kitterman.com/spf/validate.html',
  dmarc: 'https://dmarcian.com/',
  blacklistcheck: 'https://mxtoolbox.com/blacklists.aspx',
  ipvoid: 'https://www.ipvoid.com/',
  whatismyip: 'https://www.whatismyip.com/',
  geoplugin: 'https://www.geoplugin.com/',
  ip2location: 'https://www.ip2location.com/',
  ipfingerprints: 'https://www.ipfingerprints.com/',
  ipv6check: 'https://test-ipv6.com/',
  portchecker: 'https://portchecker.co/',
  canyouseeme: 'https://canyouseeme.org/',
  subnetcalc: 'https://www.subnet-calculator.com/',
  bgpviewio: 'https://bgpview.io/',
  asnlookup: 'https://asnlookup.com/',
  peeringdb: 'https://www.peeringdb.com/',
  internetdb: 'https://internetdb.shodan.io/',
  passivetotal: 'https://community.riskiq.com/',
  riskiqio: 'https://www.riskiq.com/',
  netscan: 'https://www.networkscanning.com/',
  neighbors: 'https://www.macvendorlookup.com/',
  traceroute: 'https://www.monitis.com/traceroute/',
  ping: 'https://www.pingim.com/',
  mtr: 'https://www.bitwizard.nl/mtr/',
  dnslookup: 'https://www.dnslookup.org/',
  reversedns: 'https://www.reversednslookup.org/',
  domainbigdata: 'https://domainbigdata.com/',
  whoismind: 'https://www.whoismind.com/',
  domainpulse: 'https://www.domainpulse.com/',
  dnsviz: 'https://dnsviz.net/',

  // Category 4: 💣 એક્સપ્લોઇટ અને નબળાઈ ડેટાબેઝ
  exploitdb: 'https://www.exploit-db.com/search?cve=',
  rapid7: 'https://www.rapid7.com/db/?q=',
  nvd: 'https://nvd.nist.gov/vuln/search/results?query=',
  cve: 'https://www.cvedetails.com/google-search-results.php?q=',
  vulndb: 'https://vulndb.cyberriskanalytics.com/',
  cxsecurity: 'https://cxsecurity.com/search/',
  packetstorm: 'https://packetstormsecurity.com/search/?q=',
  securityfocus: 'https://www.securityfocus.com/bid',
  osvdb: 'https://osvdb.org/',
  vulners: 'https://vulners.com/search?query=',
  exploitprediction: 'https://epss.cyber.njit.edu/',
  sploitus: 'https://sploitus.com/?query=',
  vulmon: 'https://vulmon.com/search?q=',
  cvedb: 'https://cve.mitre.org/cve/search_cve_list.html',
  securityvulns: 'https://securityvulns.com/',
  zeroday: 'https://www.zerodayinitiative.com/advisories/published/',
  exploitalert: 'https://www.exploitalert.com/',
  vulncode: 'https://vulncode-db.com/',
  cvepro: 'https://cve.report/',
  vulnerabilitylab: 'https://www.vulnerability-lab.com/',
  threatpost: 'https://threatpost.com/?s=',
  securityweek: 'https://www.securityweek.com/search/node/',
  darkreading: 'https://www.darkreading.com/search?q=',
  infosecinstitute: 'https://www.infosecinstitute.com/?s=',
  sans: 'https://www.sans.org/search/?q=',
  cvecircle: 'https://cve.circl.lu/api/search/',
  exploitshub: 'https://exploitshub.com/',
  vulndata: 'https://vulndb.info/',
  exploitpack: 'https://exploitpack.com/',
  metasploit: 'https://www.metasploit.com/',

  // Category 5: 🛡️ થ્રેટ ઇન્ટેલિજન્સ અને માલવેર
  misp: 'https://www.misp-project.org/',
  thehive: 'https://thehive-project.org/',
  yara: 'https://virustotal.github.io/yara/',
  malwaresamples: 'https://github.com/ytisf/theMalwareRepo',
  vxunderground: 'https://vx-underground.org/',
  malwarebazaar: 'https://bazaar.abuse.ch/browse/',
  virusshare: 'https://virusshare.com/',
  malsignature: 'https://www.malware-signatures.com/',
  threatfox: 'https://threatfox.abuse.ch/browse/',
  feodotracker: 'https://feodotracker.abuse.ch/',
  spamhaus: 'https://www.spamhaus.org/',
  urlvir: 'https://urlvir.com/',
  virscan: 'https://www.virscan.org/',
  jotti: 'https://virusscan.jotti.org/',
  metadefender: 'https://opswat.com/products/metadefender',
  virusdesk: 'https://virusdesk.kaspersky.com/',
  fortiguard: 'https://www.fortiguard.com/search?q=',
  ibmxforce: 'https://exchange.xforce.ibmcloud.com/',
  talos: 'https://talosintelligence.com/reputation_center/lookup?search=',
  sophos: 'https://www.sophos.com/en-us/threat-center',
  mcafee: 'https://www.mcafee.com/enterprise/en-us/threat-center.html',
  symantec: 'https://www.broadcom.com/support/security-center',
  trendmicro: 'https://www.trendmicro.com/vinfo/us/threat-encyclopedia',
  kaspersky: 'https://threats.kaspersky.com/en/',
  eset: 'https://www.welivesecurity.com/',
  bitdefender: 'https://www.bitdefender.com/blog/labs',
  cybereason: 'https://www.cybereason.com/blog',
  crowdstrike: 'https://www.crowdstrike.com/blog/',
  fireeye: 'https://www.mandiant.com/resources',
  mandiant: 'https://www.mandiant.com/',

  // Category 6: 👤 સોશિયલ અને વ્યક્તિ શોધ
  peekyou: 'https://www.peekyou.com/',
  pipl: 'https://pipl.com/',
  spokeo: 'https://www.spokeo.com/',
  thatsthem: 'https://thatsthem.com/',
  whitepages: 'https://www.whitepages.com/',
  zoominfo: 'https://www.zoominfo.com/',
  linkedin: 'https://www.linkedin.com/search/results/all/?keywords=',
  facebook: 'https://www.facebook.com/search/top/?q=',
  twitter: 'https://twitter.com/search?q=',
  instagram: 'https://www.instagram.com/',
  tiktok: 'https://www.tiktok.com/search?q=',
  snapchat: 'https://www.snapchat.com/',
  telegram: 'https://t.me/',
  discord: 'https://discord.com/',
  reddituser: 'https://www.reddit.com/user/',
  vkontakte: 'https://vk.com/search?c%5Bsection%5D=people&c%5Bq%5D=',
  okru: 'https://ok.ru/search?type=users&query=',
  meetup: 'https://www.meetup.com/find/?keywords=',
  foursquare: 'https://foursquare.com/explore?q=',
  gravatar: 'https://en.gravatar.com/',
  twitterx: 'https://x.com/search?q=',
  mastodon: 'https://mastodon.social/search?q=',
  pinterest2: 'https://www.pinterest.com/search/users/?q=',
  tumblr: 'https://www.tumblr.com/search/',
  flickr2: 'https://www.flickr.com/search/people/?q=',
  imgur: 'https://imgur.com/search/user?q=',
  vimeo: 'https://vimeo.com/search/people?q=',
  dailymotion: 'https://www.dailymotion.com/search/',
  soundcloud: 'https://soundcloud.com/search/users?q=',
  mixcloud: 'https://www.mixcloud.com/search/?type=user&q=',
  bandcamp: 'https://bandcamp.com/search?q=',
  patreon: 'https://www.patreon.com/search?q=',
  github2: 'https://github.com/search?type=users&q=',
  gitlab: 'https://gitlab.com/search?search=',
  bitbucket: 'https://bitbucket.org/repo/all?name=',
  keybase: 'https://keybase.io/',
  aboutme: 'https://about.me/search?q=',
  angelco: 'https://wellfound.com/role/',
  producthunt: 'https://www.producthunt.com/search?q=',
  crunchbase: 'https://www.crunchbase.com/discover/organization.companies?q=',

  // Category 7: 🤖 એડવાન્સ્ડ AI સ્યુટ્સ અને જનરેટિવ ટૂલ્સ
  chatgpt: 'https://chatgpt.com/',
  claude: 'https://claude.ai/',
  perplex_ai: 'https://www.perplexity.ai/?q=',
  gemini: 'https://gemini.google.com/',
  deepseek: 'https://chat.deepseek.com/',
  blackbox: 'https://www.blackbox.ai/',
  hugging: 'https://huggingface.co/models?search=',
  copilot: 'https://copilot.microsoft.com/',
  mistral: 'https://chat.mistral.ai/',
  llama: 'https://www.llama.com/',
  groq: 'https://groq.com/',
  cohere: 'https://cohere.com/',
  ai21: 'https://www.ai21.com/',
  replicate: 'https://replicate.com/',
  runwayml: 'https://runwayml.com/',
  stable_diffusion: 'https://stablediffusionweb.com/',
  midjourney: 'https://www.midjourney.com/',
  dalle: 'https://openai.com/dall-e-3',
  leonardo: 'https://leonardo.ai/',
  playground: 'https://playgroundai.com/',

  // Category 8: 🕶️ ડાર્ક વેબ સર્ચ અને સિક્રેટ ડાયરેક્ટરીઝ
  ahmia: 'https://ahmia.fi/search/?q=',
  torch: 'http://xmh57jrbejuw6c7oqz75cdv4m67v7zfv27bofun7bgyvka6ctcx6kkad.onion/search?q=',
  haystak: 'http://haystak5nhi7274rca6crv4wqu733g6hn5667v7zfv27bofun7bg.onion/?q=',
  onionland: 'https://onionlandsearchengine.com/search?q=',
  notevil: 'http://hss3uro2hsxfogfq.onion/',
  darksearch: 'https://darksearch.io/',
  hiddencorner: 'http://hcorner7274rca6crv4wqu733g6hn5667v7zfv27bofun7bg.onion/',
  onionsearch: 'https://onionsearch-engine.com/',
  hiddenwiki: 'https://thehiddenwiki.org/',
  torlinks: 'http://torlinksge6a4a7b.onion/',
  onionlinks: 'http://onionlinksge6a4a7b.onion/',
  daunt: 'https://daunt.link/',
  phobos: 'http://phobosx733g6hn5667v7zfv27bofun7bgyvka6ctcx6kkad.onion/',
  excavator: 'http://excavator7274rca6crv4wqu733g6hn5667v7zfv27bofun7bgy.onion/',
  torgle: 'http://torglex733g6hn5667v7zfv27bofun7bgyvka6ctcx6kkad.onion/',
  onionindexer: 'https://onionindexer.com/',
  duckonion: 'https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion/',
  protontor: 'https://protonmailrmis5lty6xcfecis6bd64unb7w7zfv27bofun7bgy.onion/',
  tor2web: 'https://www.tor2web.org/',
  onionsite: 'https://onions.live/' ,

  // Category 9: 🪙 ક્રિપ્ટોકરન્સી અને બ્લોકચેઈન ફોરેન્સિક્સ
  blockchain: 'https://www.blockchain.com/explorer/search?q=',
  etherscan: 'https://etherscan.io/search?q=',
  bscscan: 'https://bscscan.com/search?q=',
  tronscan: 'https://tronscan.org/#/home/search/',
  solscan: 'https://solscan.io/search?q=',
  walletexplorer: 'https://www.walletexplorer.com/?q=',
  bitcoinwhoswho: 'https://bitcoinwhoswho.com/address/',
  chainalysis: 'https://www.chainalysis.com/',
  cipherblade: 'https://cipherblade.com/',
  trmlabs: 'https://www.trmlabs.com/',
  elliptic: 'https://www.elliptic.co/',
  cryptoamigo: 'https://cryptoamigo.com/',
  tokenview: 'https://tokenview.io/en/search/',
  blockchair: 'https://blockchair.com/search?q=',
  oxt: 'https://oxt.me/search?q=',
  breadcrumbs: 'https://www.breadcrumbs.app/',
  dune: 'https://dune.com/browse/dashboards?q=',
  coinglass: 'https://www.coinglass.com/search/',
  coinmarketcap: 'https://coinmarketcap.com/search/?q=',
  coingecko: 'https://www.coingecko.com/en/search?q=',

  // Category 10: 🔓 ડેટા લીક અને પેસ્ટબિન મોનિટર
  pastebin: 'https://pastebin.com/search?q=',
  clibin: 'https://clippedbin.com/',
  ghostbin: 'https://ghostbin.co/',
  dumptext: 'https://dumptext.com/',
  pastefs: 'https://pastefs.com/',
  justpaste: 'https://justpaste.it/',
  pastedata: 'https://pastedata.net/',
  leakstats: 'https://leakstats.net/',
  scyleak: 'https://scylla.sh/',
  breached: 'https://breachforums.cx/',
  raidforums: 'https://raidforums.com/',
  leakbase: 'https://leakbase.cc/',
  hastebin: 'https://hastebin.com/',
  privatebin: 'https://privatebin.info/',
  cryptobin: 'https://cryptobin.co/',
  leakdirectory: 'https://leakdirectory.org/',
  pasteorg: 'https://paste.org/',
  vplleak: 'https://vplleak.cc/',
  pwnedpass: 'https://haveibeenpwned.com/Passwords',

  // Category 11: 🔬 ડિજિટલ ફોરેન્સિક્સ અને માલવેર એનાલિસિસ
  virustotal2: 'https://www.virustotal.com/gui/home/search',
  hybridanalysis2: 'https://www.hybrid-analysis.com/',
  'joe-sandbox': 'https://www.joesandbox.com/',
  'tria-ge': 'https://tria.ge/',
  urlscan2: 'https://urlscan.io/',
  browserling: 'https://www.browserling.com/',
  koodous: 'https://koodous.com/',
  appfilter: 'https://appfilter.io/',
  filescan: 'https://www.filescan.io/',
  alienvault: 'https://otx.alienvault.com/',
  threatminer2: 'https://www.threatminer.org/',
  metacomp: 'https://metadefender.opswat.com/',
  intezer: 'https://analyze.intezer.com/',
  securitytrails2: 'https://securitytrails.com/',
  dnsdump: 'https://dnsdumpster.com/',
  mxsuper: 'https://mxtoolbox.com/',
  shodanforensic: 'https://www.shodan.io/',
  censysforensic: 'https://censys.io/',
  threatcrowd2: 'https://www.threatcrowd.org/',
  cyberchef2: 'https://gchq.github.io/CyberChef/',

  // Category 12: ☁️ ક્લાઉડ અને દેવઓપ્સ આઇડેન્ટિટી ઓડિટ
  shodancloud: 'https://www.shodan.io/search?query=cloud+',
  censyscloud: 'https://censys.io/ipv4?q=cloud',
  zoomeyecloud: 'https://www.zoomeye.org/searchResult?q=cloud',
  fofacloud: 'https://fofa.info/result?qbase64=cloud',
  grayhatwarfare: 'https://buckets.grayhatwarfare.com/results?q=',
  leakeds3: 'https://github.com/nagwww/s3-leaks',
  huntercloud: 'https://hunter.io/',
  crtshcloud: 'https://crt.sh/?q=cloud',
  dnsdumpcloud: 'https://dnsdumpster.com/',
  subfindercloud: 'https://github.com/projectdiscovery/subfinder',
  intelxcloud: 'https://intelx.io/',
  githubcloud: 'https://github.com/search?q=secret',
  gitlabcloud: 'https://gitlab.com/',
  binaryedgecloud: 'https://www.binaryedge.io/',
  onyphecloud: 'https://www.onyphe.io/',
  greynoisecloud: 'https://viz.greynoise.io/',
  urlscancloud: 'https://urlscan.io/',
  builtwithcloud: 'https://builtwith.com/',
  wappalyzercloud: 'https://www.wappalyzer.com/',
  anyruncloud: 'https://app.any.run/'
};

// Category interface
interface Category {
  title: string;
  className: string;
  engines: Array<{ key: string; name: string }>;
}

export default function App() {
  // --- STATE FOR VISUAL OVERLAYS, AUTH, NOTICE AND ENGINE SELECTION ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuth_jigsi') === 'true';
  });
  const [isNoticeAccepted, setIsNoticeAccepted] = useState<boolean>(() => {
    return localStorage.getItem('notice_accepted_jigsi') === 'true';
  });
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('9898048483');
  const [redirectionLogs, setRedirectionLogs] = useState<string[]>([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [typewrittenTitle, setTypewrittenTitle] = useState('💀 CYBER OSINT GATEWAY & HACKER SCANNER 💀');
  const [terminalAlert, setTerminalAlert] = useState<{ message: string; type: 'error' | 'success' | 'warning' } | null>(null);

  const showTerminalAlert = (message: string, type: 'error' | 'success' | 'warning' = 'error') => {
    setTerminalAlert({ message, type });
    setTimeout(() => {
      setTerminalAlert(null);
    }, 4500);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // --- AUDIO SYNTHESIZER SYSTEM ---
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playBeep = (freq: number, duration: number, type: OscillatorType = "sine", vol = 0.08) => {
    try {
      initAudio();
      const ctx = audioContextRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(vol, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context disabled or not supported
    }
  };

  // Sound feedback on keyboard press
  const handleKeyPressSound = () => {
    playBeep(140 + Math.random() * 60, 0.04, "triangle", 0.08);
  };

  const playHoverSound = () => {
    playBeep(900, 0.02, "sine", 0.01);
  };

  // --- MATRIX DIGITAL CODE RAIN EFFECT ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789🧬☠️🪓💻⚡💀☣️";
    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const rainDrops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- SECURITY AUTHENTICATION PROCESS ---
  const handleAuthSubmit = () => {
    if (!username.trim() || !password.trim()) {
      playBeep(150, 0.3, "sawtooth", 0.25);
      showTerminalAlert('Error: Credentials cannot be left empty.', 'error');
      return;
    }

    if (authMode === 'signup') {
      localStorage.setItem(`jigsi_u_${username.trim()}`, password.trim());
      playBeep(440, 0.15, "sine", 0.15);
      showTerminalAlert('Hacker ID Saved into Core System Successfully. Access Terminal Now.', 'success');
      setAuthMode('login');
    } else {
      const storedPass = localStorage.getItem(`jigsi_u_${username.trim()}`);
      if ((username === 'admin' && password === 'admin') || storedPass === password) {
        playBeep(520, 0.2, "sine", 0.15);
        setIsAuthenticated(true);
        localStorage.setItem('isAuth_jigsi', 'true');
      } else {
        playBeep(150, 0.35, "sawtooth", 0.25);
        showTerminalAlert('ACCESS DENIED: Credentials Invalid.', 'error');
      }
    }
  };

  // --- POLICY ACCEPTANCE AND TYPEWRITER ---
  const handleAcceptNotice = () => {
    localStorage.setItem('notice_accepted_jigsi', 'true');
    setIsNoticeAccepted(true);
    playBeep(700, 0.12, "sine", 0.12);

    // Run Typewriter reveal effect on Title
    const originalTitle = '💀 CYBER OSINT GATEWAY & HACKER SCANNER 💀';
    setTypewrittenTitle('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < originalTitle.length) {
        setTypewrittenTitle(prev => prev + originalTitle.charAt(i));
        playBeep(280, 0.02, "square", 0.02);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
  };

  // --- REDIRECTION LOGS TRANSITION AND LAUNCH ---
  const handleOpenEngine = (key: string) => {
    initAudio();
    playBeep(550, 0.08, "sine", 0.15);
    setIsRedirecting(true);
    setRedirectionLogs([]);

    const logs = [
      ">> ACCESS MATRIX INITIATED: OPENING DIRECT SECURITY PROXY...",
      ">> STACK TUNNEL: ROUTING DATA THROUGH ENCRYPTED GATEWAY...",
      ">> DATA PACKET: INJECTING SCAN ARGS INTO REDIRECTION AGENT...",
      ">> SUCCESS: HANDSHAKE ESTABLISHED, FORWARDING INTEL PORTAL..."
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logs.length) {
        setRedirectionLogs(prev => [...prev, logs[step]]);
        playBeep(350, 0.03, "sawtooth", 0.03);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRedirecting(false);
          const baseUrl = URL_PIPELINE_MAP[key] || 'https://www.google.com/search?q=';
          let targetUrl = '';
          const encodedQuery = encodeURIComponent(searchQuery);

          // Build smart redirection queries
          if (baseUrl.includes('?q=') || baseUrl.includes('?p=') || baseUrl.includes('?query=') || baseUrl.includes('?text=') || baseUrl.includes('?wd=') || baseUrl.includes('?s=')) {
            targetUrl = baseUrl + encodedQuery;
          } else if (baseUrl.endsWith('/') || baseUrl.endsWith('#')) {
            targetUrl = baseUrl + encodedQuery;
          } else {
            targetUrl = baseUrl;
          }

          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }, 300);
      }
    }, 150);
  };

  // --- THE FULL DETAILED ENGINE CATEGORIES IN GUJARATI ---
  const CATEGORIES_LIST: Category[] = [
    {
      title: "🌐 મેગા સર્ચ એન્જિન્સ (55 Core Engines)",
      className: "c-extra",
      engines: [
        { key: 'google', name: 'Google' },
        { key: 'bing', name: 'Bing' },
        { key: 'yahoo', name: 'Yahoo' },
        { key: 'duck', name: 'DuckDuckGo' },
        { key: 'brave', name: 'Brave AI' },
        { key: 'startpage', name: 'Startpage' },
        { key: 'swisscows', name: 'Swisscows' },
        { key: 'qwant', name: 'Qwant' },
        { key: 'mojeek', name: 'Mojeek' },
        { key: 'ask', name: 'Ask.com' },
        { key: 'aol', name: 'AOL Search' },
        { key: 'lycos', name: 'Lycos' },
        { key: 'github', name: 'GitHub' },
        { key: 'stackoverflow', name: 'StackOverflow' },
        { key: 'sourceforge', name: 'SourceForge' },
        { key: 'phind', name: 'Phind (AI)' },
        { key: 'shodan', name: 'Shodan (IoT)' },
        { key: 'wiki', name: 'Wikipedia' },
        { key: 'scholar', name: 'Google Scholar' },
        { key: 'archive', name: 'Internet Archive' },
        { key: 'wolfram', name: 'WolframAlpha' },
        { key: 'britannica', name: 'Britannica' },
        { key: 'youtube', name: 'YouTube' },
        { key: 'pinterest', name: 'Pinterest' },
        { key: 'flickr', name: 'Flickr' },
        { key: 'reddit', name: 'Reddit' },
        { key: 'giphy', name: 'Giphy' },
        { key: 'baidu', name: 'Baidu' },
        { key: 'yandex', name: 'Yandex' },
        { key: 'naver', name: 'Naver' },
        { key: 'ecosia', name: 'Ecosia' },
        { key: 'searx', name: 'SearX' },
        { key: 'gibiru', name: 'Gibiru' },
        { key: 'metager', name: 'MetaGer' },
        { key: 'you', name: 'You.com AI' },
        { key: 'perplex', name: 'Perplexity AI' },
        { key: 'exalead', name: 'Exalead' },
        { key: 'dogpile', name: 'Dogpile' },
        { key: 'webcrawler', name: 'WebCrawler' },
        { key: 'infospace', name: 'InfoSpace' },
        { key: 'excite', name: 'Excite' },
        { key: 'hotbot', name: 'HotBot' },
        { key: 'rambler', name: 'Rambler' },
        { key: 'seznam', name: 'Seznam' },
        { key: 'daum', name: 'Daum' },
        { key: 'goo', name: 'Goo Japan' },
        { key: 'coccoc', name: 'Coccoc' },
        { key: 'swisssearch', name: 'Swiss Search' },
        { key: 'alltheweb', name: 'AllTheWeb' },
        { key: 'mooter', name: 'Mooter' },
        { key: 'teoma', name: 'Teoma' },
        { key: 'entireweb', name: 'EntireWeb' },
        { key: 'search_ch', name: 'Search.ch' },
        { key: 'giga', name: 'Giga Blast' },
        { key: 'searchencrypt', name: 'SearchEncrypt' }
      ]
    },
    {
      title: "🕵️ ઓસિંટ, આઈપી ક્વાલિટી અને ફૂટપ્રિન્ટ (74 Cyber Intel Links)",
      className: "c-osint",
      engines: [
        { key: 'ipquality', name: 'IPQualityScore' },
        { key: 'naamai', name: 'Naam.ai' },
        { key: 'instantuser', name: 'InstantUsername' },
        { key: 'usersearch', name: 'UserSearch' },
        { key: 'digitalfootprint', name: 'DigitalFootprint' },
        { key: 'whatsmyname', name: 'WhatsMyName' },
        { key: 'sherlock', name: 'Sherlock Web' },
        { key: 'haveibeenpwned', name: 'HaveIBeenPwned' },
        { key: 'dehashed', name: 'DeHashed' },
        { key: 'intelx', name: 'Intelligence X' },
        { key: 'virustotal', name: 'VirusTotal' },
        { key: 'urlscan', name: 'URLScan.io' },
        { key: 'dnsdumpster', name: 'DNSDumpster' },
        { key: 'crtsh', name: 'Crt.sh SSL' },
        { key: 'hunterio', name: 'Hunter.io' },
        { key: 'voilanorbert', name: 'VoilaNorbert' },
        { key: 'anyrun', name: 'Any.Run' },
        { key: 'hybridanalysis', name: 'HybridAnalysis' },
        { key: 'censys', name: 'Censys Scan' },
        { key: 'zoomeye', name: 'ZoomEye' },
        { key: 'ipinfo', name: 'IPinfo.io' },
        { key: 'ipapi', name: 'IP-API' },
        { key: 'arin', name: 'ARIN Whois' },
        { key: 'ripe', name: 'RIPE DB' },
        { key: 'bgpview', name: 'BGPView' },
        { key: 'mxtoolbox', name: 'MXToolBox' },
        { key: 'viewdns', name: 'ViewDNS.info' },
        { key: 'threatcrowd', name: 'ThreatCrowd' },
        { key: 'otx', name: 'Alienvault OTX' },
        { key: 'abuseipdb', name: 'AbuseIPDB' },
        { key: 'scamalytics', name: 'Scamalytics' },
        { key: 'blacklistmaster', name: 'BlacklistMaster' },
        { key: 'builtwith', name: 'BuiltWith' },
        { key: 'wappalyzer', name: 'Wappalyzer' },
        { key: 'wayback', name: 'Wayback Machine' },
        { key: 'socialsearcher', name: 'Social Searcher' },
        { key: 'tineye', name: 'TinEye Image' },
        { key: 'pimeyes', name: 'PimEyes Face' },
        { key: 'osintframework', name: 'OSINT Framework' },
        { key: 'spiderfoot', name: 'Spiderfoot' },
        { key: 'maltego', name: 'Maltego Web' },
        { key: 'wigle', name: 'WiGle WiFi' },
        { key: 'shodandomain', name: 'Shodan Domain' },
        { key: 'threatminer', name: 'ThreatMiner' },
        { key: 'pulsedive', name: 'Pulsedive' },
        { key: 'leaklookup', name: 'Leak-Lookup' },
        { key: 'snusbase', name: 'Snusbase' },
        { key: 'inteltechniques', name: 'IntelTechniques' },
        { key: 'iknowwhatyoudownload', name: 'IKnowWhatYouDownload' },
        { key: 'dnslytics', name: 'DNSlytics' },
        { key: 'domaintools', name: 'DomainTools' },
        { key: 'securitytrails', name: 'SecurityTrails' },
        { key: 'spyse', name: 'Spyse' },
        { key: 'greynoise', name: 'GreyNoise' },
        { key: 'phonebookcz', name: 'Phonebook.cz' },
        { key: 'emailrep', name: 'EmailRep' },
        { key: 'phoneinfoga', name: 'PhoneInfoga' },
        { key: 'epieos', name: 'Epieos' },
        { key: 'holehe', name: 'Holehe' },
        { key: 'maigret', name: 'Maigret' },
        { key: 'grepapp', name: 'Grep.app' },
        { key: 'onyphe', name: 'Onyphe' },
        { key: 'fofa', name: 'Fofa.so' },
        { key: 'binaryedge', name: 'BinaryEdge' },
        { key: 'riskiq', name: 'RiskIQ' },
        { key: 'recordedfuture', name: 'Recorded Future' },
        { key: 'flashpoint', name: 'Flashpoint' },
        { key: 'crowdsec', name: 'CrowdSec' },
        { key: 'urlhaus', name: 'URLhaus' },
        { key: 'maltiverse', name: 'Maltiverse' },
        { key: 'polyverse', name: 'Polyverse' },
        { key: 'binaryalert', name: 'BinaryAlert' },
        { key: 'dnstwist', name: 'DNSTwist' },
        { key: 'subfinder', name: 'Subfinder Web' }
      ]
    },
    {
      title: "🌍 નેટવર્ક અને ડોમેન ટૂલ્સ (40 Network/Domain)",
      className: "c-network",
      engines: [
        { key: 'hackertarget', name: 'HackerTarget' },
        { key: 'yougetsignal', name: 'YouGetSignal' },
        { key: 'pentesttools', name: 'PentestTools' },
        { key: 'cyberchef', name: 'CyberChef' },
        { key: 'dnschecker', name: 'DNSChecker' },
        { key: 'whois', name: 'Whois Lookup' },
        { key: 'nslookup', name: 'NSLookup.io' },
        { key: 'dnspropagation', name: 'DNS Propagation' },
        { key: 'intodns', name: 'IntoDNS' },
        { key: 'zonemaster', name: 'Zonemaster' },
        { key: 'dnstable', name: 'DNS Table' },
        { key: 'spfcheck', name: 'SPF Check' },
        { key: 'dmarc', name: 'DMARC Analyzer' },
        { key: 'blacklistcheck', name: 'Blacklist Check' },
        { key: 'ipvoid', name: 'IP Void' },
        { key: 'whatismyip', name: 'WhatIsMyIP' },
        { key: 'geoplugin', name: 'GeoPlugin' },
        { key: 'ip2location', name: 'IP2Location' },
        { key: 'ipfingerprints', name: 'IP Fingerprints' },
        { key: 'ipv6check', name: 'IPv6 Check' },
        { key: 'portchecker', name: 'Port Checker' },
        { key: 'canyouseeme', name: 'CanYouSeeMe' },
        { key: 'subnetcalc', name: 'Subnet Calculator' },
        { key: 'bgpviewio', name: 'BGPView IO' },
        { key: 'asnlookup', name: 'ASN Lookup' },
        { key: 'peeringdb', name: 'PeeringDB' },
        { key: 'internetdb', name: 'InternetDB' },
        { key: 'passivetotal', name: 'PassiveTotal' },
        { key: 'riskiqio', name: 'RiskIQ IO' },
        { key: 'netscan', name: 'NetScan' },
        { key: 'neighbors', name: 'Network Neighbors' },
        { key: 'traceroute', name: 'Traceroute' },
        { key: 'ping', name: 'Ping Tool' },
        { key: 'mtr', name: 'MTR Report' },
        { key: 'dnslookup', name: 'DNS Lookup' },
        { key: 'reversedns', name: 'Reverse DNS' },
        { key: 'domainbigdata', name: 'Domain Big Data' },
        { key: 'whoismind', name: 'Whois Mind' },
        { key: 'domainpulse', name: 'Domain Pulse' },
        { key: 'dnsviz', name: 'DNSViz' }
      ]
    },
    {
      title: "💣 એક્સપ્લોઇટ અને નબળાઈ ડેટાબેઝ (30 Exploit/Vuln DB)",
      className: "c-exploit",
      engines: [
        { key: 'exploitdb', name: 'Exploit-DB' },
        { key: 'rapid7', name: 'Rapid7 DB' },
        { key: 'nvd', name: 'NVD (NIST)' },
        { key: 'cve', name: 'CVE Details' },
        { key: 'vulndb', name: 'VulnDB' },
        { key: 'cxsecurity', name: 'CXSecurity' },
        { key: 'packetstorm', name: 'Packet Storm' },
        { key: 'securityfocus', name: 'SecurityFocus' },
        { key: 'osvdb', name: 'OSVDB' },
        { key: 'vulners', name: 'Vulners' },
        { key: 'exploitprediction', name: 'Exploit Prediction' },
        { key: 'sploitus', name: 'Sploitus' },
        { key: 'vulmon', name: 'Vulmon' },
        { key: 'cvedb', name: 'CVE DB' },
        { key: 'securityvulns', name: 'SecurityVulns' },
        { key: 'zeroday', name: 'ZeroDay Initiative' },
        { key: 'exploitalert', name: 'Exploit Alert' },
        { key: 'vulncode', name: 'VulnCode' },
        { key: 'cvepro', name: 'CVE Pro' },
        { key: 'vulnerabilitylab', name: 'Vulnerability Lab' },
        { key: 'threatpost', name: 'ThreatPost Vuln' },
        { key: 'securityweek', name: 'SecurityWeek Vuln' },
        { key: 'darkreading', name: 'DarkReading Vuln' },
        { key: 'infosecinstitute', name: 'InfoSec Institute' },
        { key: 'sans', name: 'SANS CVE' },
        { key: 'cvecircle', name: 'CVE Circle' },
        { key: 'exploitshub', name: 'Exploits Hub' },
        { key: 'vulndata', name: 'Vuln Data' },
        { key: 'exploitpack', name: 'Exploit Pack' },
        { key: 'metasploit', name: 'Metasploit Modules' }
      ]
    },
    {
      title: "🛡️ થ્રેટ ઇન્ટેલિજન્સ અને માલવેર (30 Threat Intel/Malware)",
      className: "c-threat",
      engines: [
        { key: 'misp', name: 'MISP' },
        { key: 'thehive', name: 'TheHive' },
        { key: 'yara', name: 'YARA' },
        { key: 'malwaresamples', name: 'Malware Samples' },
        { key: 'vxunderground', name: 'VX Underground' },
        { key: 'malwarebazaar', name: 'MalwareBazaar' },
        { key: 'virusshare', name: 'VirusShare' },
        { key: 'malsignature', name: 'MalSignatures' },
        { key: 'threatfox', name: 'ThreatFox' },
        { key: 'feodotracker', name: 'FeodoTracker' },
        { key: 'spamhaus', name: 'Spamhaus' },
        { key: 'urlvir', name: 'URLVir' },
        { key: 'virscan', name: 'VirScan' },
        { key: 'jotti', name: 'Jotti' },
        { key: 'metadefender', name: 'MetaDefender' },
        { key: 'virusdesk', name: 'Virus Desk' },
        { key: 'fortiguard', name: 'FortiGuard' },
        { key: 'ibmxforce', name: 'IBM X-Force' },
        { key: 'talos', name: 'Talos Intelligence' },
        { key: 'sophos', name: 'Sophos Threat' },
        { key: 'mcafee', name: 'McAfee Threat' },
        { key: 'symantec', name: 'Symantec Threat' },
        { key: 'trendmicro', name: 'Trend Micro' },
        { key: 'kaspersky', name: 'Kaspersky Threat' },
        { key: 'eset', name: 'ESET Threat' },
        { key: 'bitdefender', name: 'Bitdefender' },
        { key: 'cybereason', name: 'Cybereason' },
        { key: 'crowdstrike', name: 'CrowdStrike' },
        { key: 'fireeye', name: 'FireEye' },
        { key: 'mandiant', name: 'Mandiant' }
      ]
    },
    {
      title: "👤 સોશિયલ અને વ્યક્તિ શોધ (40 Social/People)",
      className: "c-social",
      engines: [
        { key: 'peekyou', name: 'PeekYou' },
        { key: 'pipl', name: 'Pipl' },
        { key: 'spokeo', name: 'Spokeo' },
        { key: 'thatsthem', name: "That's Them" },
        { key: 'whitepages', name: 'WhitePages' },
        { key: 'zoominfo', name: 'ZoomInfo' },
        { key: 'linkedin', name: 'LinkedIn' },
        { key: 'facebook', name: 'Facebook' },
        { key: 'twitter', name: 'Twitter' },
        { key: 'instagram', name: 'Instagram' },
        { key: 'tiktok', name: 'TikTok' },
        { key: 'snapchat', name: 'Snapchat' },
        { key: 'telegram', name: 'Telegram' },
        { key: 'discord', name: 'Discord' },
        { key: 'reddituser', name: 'Reddit User' },
        { key: 'vkontakte', name: 'VKontakte' },
        { key: 'okru', name: 'OK.ru' },
        { key: 'meetup', name: 'Meetup' },
        { key: 'foursquare', name: 'Foursquare' },
        { key: 'gravatar', name: 'Gravatar' },
        { key: 'twitterx', name: 'X (Twitter)' },
        { key: 'mastodon', name: 'Mastodon' },
        { key: 'pinterest2', name: 'Pinterest' },
        { key: 'tumblr', name: 'Tumblr' },
        { key: 'flickr2', name: 'Flickr' },
        { key: 'imgur', name: 'Imgur' },
        { key: 'vimeo', name: 'Vimeo' },
        { key: 'dailymotion', name: 'Dailymotion' },
        { key: 'soundcloud', name: 'SoundCloud' },
        { key: 'mixcloud', name: 'Mixcloud' },
        { key: 'bandcamp', name: 'Bandcamp' },
        { key: 'patreon', name: 'Patreon' },
        { key: 'github2', name: 'GitHub' },
        { key: 'gitlab', name: 'GitLab' },
        { key: 'bitbucket', name: 'Bitbucket' },
        { key: 'keybase', name: 'Keybase' },
        { key: 'aboutme', name: 'About.me' },
        { key: 'angelco', name: 'AngelList' },
        { key: 'producthunt', name: 'Product Hunt' },
        { key: 'crunchbase', name: 'Crunchbase' }
      ]
    },
    {
      title: "🤖 એડવાન્સ્ડ AI સ્યુટ્સ અને જનરેટિવ ટૂલ્સ (20 AI Tools)",
      className: "c-ai",
      engines: [
        { key: 'chatgpt', name: 'ChatGPT Open' },
        { key: 'claude', name: 'Claude Anthropic' },
        { key: 'perplex_ai', name: 'Perplexity Search' },
        { key: 'gemini', name: 'Google Gemini' },
        { key: 'deepseek', name: 'DeepSeek Portal' },
        { key: 'blackbox', name: 'Blackbox AI' },
        { key: 'hugging', name: 'Hugging Face' },
        { key: 'copilot', name: 'MS Copilot' },
        { key: 'mistral', name: 'Mistral AI' },
        { key: 'llama', name: 'Llama Meta' },
        { key: 'groq', name: 'Groq Cloud' },
        { key: 'cohere', name: 'Cohere' },
        { key: 'ai21', name: 'AI21 Labs' },
        { key: 'replicate', name: 'Replicate' },
        { key: 'runwayml', name: 'RunwayML' },
        { key: 'stable_diffusion', name: 'Stable Diffusion' },
        { key: 'midjourney', name: 'Midjourney (Web)' },
        { key: 'dalle', name: 'DALL·E' },
        { key: 'leonardo', name: 'Leonardo AI' },
        { key: 'playground', name: 'Playground AI' }
      ]
    },
    {
      title: "🕶️ ડાર્ક વેબ સર્ચ અને સિક્રેટ ડાયરેક્ટરીઝ (20 Dark/Onion Links)",
      className: "c-dark",
      engines: [
        { key: 'ahmia', name: 'Ahmia.fi Search' },
        { key: 'torch', name: 'Torch Search Engine' },
        { key: 'haystak', name: 'Haystak Onion' },
        { key: 'onionland', name: 'OnionLand Engine' },
        { key: 'notevil', name: 'Not Evil' },
        { key: 'darksearch', name: 'DarkSearch.io' },
        { key: 'hiddencorner', name: 'Hidden Corner' },
        { key: 'onionsearch', name: 'Onion Search' },
        { key: 'hiddenwiki', name: 'The Hidden Wiki' },
        { key: 'torlinks', name: 'TorLinks Directory' },
        { key: 'onionlinks', name: 'OnionLinks Portal' },
        { key: 'daunt', name: 'Daunt Onion' },
        { key: 'phobos', name: 'Phobos Search' },
        { key: 'excavator', name: 'Excavator Engine' },
        { key: 'torgle', name: 'Torgle Engine' },
        { key: 'onionindexer', name: 'Onion Indexer' },
        { key: 'duckonion', name: 'DuckDuckGo Tor' },
        { key: 'protontor', name: 'Proton Onion Mail' },
        { key: 'tor2web', name: 'Tor2Web Proxy' },
        { key: 'onionsite', name: 'Onion Live Check' }
      ]
    },
    {
      title: "🪙 ક્રિપ્ટોકરન્સી અને બ્લોકચેઈન ફોરેન્સિક્સ (20 Crypto Tools)",
      className: "c-crypto",
      engines: [
        { key: 'blockchain', name: 'Blockchain Explorer' },
        { key: 'etherscan', name: 'Everscan ETH' },
        { key: 'bscscan', name: 'BscScan BNB' },
        { key: 'tronscan', name: 'TronScan TRX' },
        { key: 'solscan', name: 'Solscan SOL' },
        { key: 'walletexplorer', name: 'Wallet Explorer' },
        { key: 'bitcoinwhoswho', name: 'Bitcoin Whos Who' },
        { key: 'chainalysis', name: 'Chainalysis Portal' },
        { key: 'cipherblade', name: 'CipherBlade Info' },
        { key: 'trmlabs', name: 'TRM Labs Intel' },
        { key: 'elliptic', name: 'Elliptic Search' },
        { key: 'cryptoamigo', name: 'CryptoAmigo' },
        { key: 'tokenview', name: 'TokenView Explorer' },
        { key: 'blockchair', name: 'Blockchair Mega' },
        { key: 'oxt', name: 'OXT Bitcoin Intel' },
        { key: 'breadcrumbs', name: 'Breadcrumbs Crypto' },
        { key: 'dune', name: 'Dune Analytics' },
        { key: 'coinglass', name: 'CoinGlass Intel' },
        { key: 'coinmarketcap', name: 'CoinMarketCap' },
        { key: 'coingecko', name: 'CoinGecko Crypto' }
      ]
    },
    {
      title: "🔓 ડેટા લીક અને પેસ્ટબિન મોનિટર (20 Leak Lookup Engines)",
      className: "c-leak",
      engines: [
        { key: 'pastebin', name: 'Pastebin Search' },
        { key: 'clibin', name: 'ClippedBin' },
        { key: 'ghostbin', name: 'Ghostbin Portal' },
        { key: 'dumptext', name: 'DumpText Monitor' },
        { key: 'pastefs', name: 'PasteFS Engine' },
        { key: 'justpaste', name: 'JustPaste.it' },
        { key: 'pastedata', name: 'Paste Data Intel' },
        { key: 'leakstats', name: 'LeakStats Monitor' },
        { key: 'scyleak', name: 'Scylla Leak DB' },
        { key: 'breached', name: 'Breached Forum Portal' },
        { key: 'raidforums', name: 'Raid Archive' },
        { key: 'leakbase', name: 'LeakBase.cc' },
        { key: 'hastebin', name: 'Hastebin Check' },
        { key: 'privatebin', name: 'PrivateBin Safe' },
        { key: 'cryptobin', name: 'CryptoBin' },
        { key: 'leakdirectory', name: 'Leak Directory' },
        { key: 'pasteorg', name: 'Paste.org Tracker' },
        { key: 'vplleak', name: 'VPL Leak Finder' },
        { key: 'leakcheck', name: 'LeakCheck.io' },
        { key: 'pwnedpass', name: 'Pwned Passwords' }
      ]
    },
    {
      title: "🔬 ડિજિટલ ફોરેન્સિક્સ અને માલવેર એનાલિસિસ (20 Forensic Tools)",
      className: "c-forensic",
      engines: [
        { key: 'virustotal2', name: 'VirusTotal API' },
        { key: 'hybridanalysis2', name: 'Hybrid Analysis' },
        { key: 'joe-sandbox', name: 'Joe Sandbox' },
        { key: 'tria-ge', name: 'Triage Malware' },
        { key: 'urlscan2', name: 'URLScan Forensic' },
        { key: 'browserling', name: 'Browserling Safe' },
        { key: 'koodous', name: 'Koodous APK' },
        { key: 'appfilter', name: 'AppFilter Engine' },
        { key: 'filescan', name: 'FileScan.io' },
        { key: 'alienvault', name: 'AlienVault OTX' },
        { key: 'threatminer2', name: 'ThreatMiner Dev' },
        { key: 'metacomp', name: 'Meta Defender Tool' },
        { key: 'intezer', name: 'Intezer Analyze' },
        { key: 'securitytrails2', name: 'SecurityTrails' },
        { key: 'dnsdump', name: 'DNS Dumpster' },
        { key: 'mxsuper', name: 'MX Toolbox Super' },
        { key: 'shodanforensic', name: 'Shodan Forensic' },
        { key: 'censysforensic', name: 'Censys Forensic' },
        { key: 'threatcrowd2', name: 'ThreatCrowd Hub' },
        { key: 'cyberchef2', name: 'CyberChef Local' }
      ]
    },
    {
      title: "☁️ ક્લાઉડ અને દેવઓપ્સ આઇડેન્ટિટી ઓડિટ (20 Cloud Tools)",
      className: "c-cloud",
      engines: [
        { key: 'shodancloud', name: 'Shodan Cloud Scan' },
        { key: 'censyscloud', name: 'Censys Cloud Tracker' },
        { key: 'zoomeyecloud', name: 'ZoomEye Cloud' },
        { key: 'fofacloud', name: 'Fofa Cloud Monitor' },
        { key: 'grayhatwarfare', name: 'Grayhat S3 Buckets' },
        { key: 'leakeds3', name: 'Leaked S3 Finder' },
        { key: 'huntercloud', name: 'Hunter Cloud Domain' },
        { key: 'crtshcloud', name: 'Crt.sh Cloud SSL' },
        { key: 'dnsdumpcloud', name: 'DNS Dump Cloud' },
        { key: 'subfindercloud', name: 'Subfinder Cloud' },
        { key: 'intelxcloud', name: 'IntelX Cloud Leak' },
        { key: 'githubcloud', name: 'GitHub Cloud Secrets' },
        { key: 'gitlabcloud', name: 'GitLab Cloud Repo' },
        { key: 'binaryedgecloud', name: 'BinaryEdge Cloud' },
        { key: 'onyphecloud', name: 'Onyphe Cloud Scan' },
        { key: 'greynoisecloud', name: 'GreyNoise Cloud' },
        { key: 'urlscancloud', name: 'URLScan Cloud' },
        { key: 'builtwithcloud', name: 'BuiltWith Cloud' },
        { key: 'wappalyzercloud', name: 'Wappalyzer Cloud' },
        { key: 'anyruncloud', name: 'Any.Run Cloud Sandbox' }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden text-[#00FF00]">
      {/* Background Matrix Rain */}
      <canvas id="matrix-canvas" ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Custom Hardened Terminal HUD Notification */}
      {terminalAlert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-bounce">
          <div className={`border-2 p-4 bg-black/95 shadow-lg flex items-start gap-3 rounded-none font-mono ${
            terminalAlert.type === 'error' ? 'border-red-500 shadow-red-500/20 text-red-500' :
            terminalAlert.type === 'success' ? 'border-[#00FF00] shadow-[#00FF00]/20 text-[#00FF00]' :
            'border-yellow-500 shadow-yellow-500/20 text-yellow-500'
          }`}>
            <span className="text-xl animate-pulse">
              {terminalAlert.type === 'error' ? '☠️' : terminalAlert.type === 'success' ? '⚡' : '⚠️'}
            </span>
            <div className="flex-1">
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">
                SYSTEM MESSAGE // ALERT
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                {terminalAlert.message}
              </div>
            </div>
            <button
              onClick={() => setTerminalAlert(null)}
              className="text-xs opacity-60 hover:opacity-100 uppercase cursor-pointer"
            >
              [X]
            </button>
          </div>
        </div>
      )}

      {/* --- 1. LOGIN / CREDENTIAL REGISTER OVERLAY --- */}
      {!isAuthenticated && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md border-2 border-[#00FF00] bg-black/90 p-8 shadow-[0_0_35px_rgba(0,255,0,0.6)] rounded-none relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-[#00ff00]/60">
              <Cpu className="w-3 h-3 animate-pulse" />
              <span>SEC_SYSTEM_v4.5</span>
            </div>

            <div className="text-center mb-6">
              <Shield className="w-12 h-12 mx-auto text-[#00FF00] mb-2 animate-pulse" />
              <h2 className="text-xl font-bold tracking-wider matrix-glow uppercase">
                {authMode === 'login' ? '🔐 Cyber OSINT Hub Access' : '📝 Register Encrypted Codes'}
              </h2>
              <p className="text-xs text-[#00ff00]/70 mt-1">
                {authMode === 'login' ? 'Authorization Token is required for ingress' : 'Commit secure keys to the mainframe database'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase mb-1 tracking-wider text-[#00FF00]/80">Hacker ID (Username)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-[#00FF00]/60 text-sm">{">"}</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); handleKeyPressSound(); }}
                    className="w-full pl-8 pr-4 py-3 bg-black/80 border border-[#00FF00] text-[#00FF00] outline-none text-sm font-mono tracking-widest focus:border-white focus:ring-1 focus:ring-[#00ff00]"
                    placeholder="e.g. admin"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase mb-1 tracking-wider text-[#00FF00]/80">Pass Key (Password)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-[#00FF00]/60 text-sm">#</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); handleKeyPressSound(); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAuthSubmit(); }}
                    className="w-full pl-8 pr-4 py-3 bg-black/80 border border-[#00FF00] text-[#00FF00] outline-none text-sm font-mono tracking-widest focus:border-white focus:ring-1 focus:ring-[#00ff00]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                onClick={handleAuthSubmit}
                onMouseEnter={playHoverSound}
                className="w-full py-3.5 bg-transparent border-2 border-[#00FF00] text-[#00FF00] font-bold text-sm hover:bg-[#00FF00] hover:text-black hover:shadow-[0_0_20px_#00ff00] transition-all uppercase tracking-widest cursor-pointer"
              >
                {authMode === 'login' ? 'AUTHORIZE INGRESS' : 'COMMIT KEYS'}
              </button>

              <div className="text-center pt-2">
                <span
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'signup' : 'login');
                    playBeep(400, 0.08, "sine", 0.08);
                  }}
                  onMouseEnter={playHoverSound}
                  className="text-xs text-[#00FF00] underline cursor-pointer hover:text-white transition-all uppercase tracking-wider"
                >
                  {authMode === 'login' ? 'Generate New Security Credentials' : 'Existing Terminal? Return to Log In'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. TRANSITIONAL LOADER POPUP --- */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/98 z-50 flex flex-col justify-center p-12 font-mono text-sm leading-relaxed text-[#00ff00]">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center gap-3 border-b border-[#00ff00]/30 pb-4 mb-4">
              <Terminal className="w-8 h-8 animate-spin text-[#00ff00]" />
              <div>
                <h3 className="text-lg font-bold tracking-widest uppercase">FORWARDING SECURE STREAM</h3>
                <p className="text-xs text-[#00ff00]/60">PORT PROXY HANDSHAKE: LIVE</p>
              </div>
            </div>
            <div className="space-y-2">
              {redirectionLogs.map((log, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-white">✔</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 text-xs text-[#00ff00]/40 animate-pulse uppercase">
              Please wait while target mainframe resolves...
            </div>
          </div>
        </div>
      )}

      {/* --- 3. MAIN DASHBOARD CONTENT --- */}
      {isAuthenticated && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
          
          {/* Header Title section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#00FF00] uppercase tracking-wider matrix-glow mb-2">
              {typewrittenTitle}
            </h1>
            <div className="text-xs md:text-sm text-[#00ff00] font-bold uppercase tracking-widest">
              DEPLOYMENT TIER: <span className="text-white">jigsi_karia</span> SECURITY_HUB_v4.5.98
            </div>
          </div>

          {/* Forensic Restricted Banner */}
          {!isNoticeAccepted ? (
            <div className="w-full border-2 border-red-600 bg-black/95 text-red-500 p-6 mb-8 shadow-[0_0_20px_rgba(255,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 text-red-500 animate-pulse mt-1" />
                <div>
                  <h4 className="font-bold uppercase text-red-400 tracking-wider text-sm mb-1">
                    ⚠️ RESTRICTED INTELLIGENCE DIRECTIVE:
                  </h4>
                  <p className="text-xs leading-relaxed max-w-4xl text-red-500/90 font-mono">
                    Structured explicitly for technical forensic verification, data leak analysis, and infrastructure security diagnostics. Any unauthorized queries or illegal footprint tracking is strictly monitored by network node relays.
                  </p>
                </div>
              </div>
              <button
                onClick={handleAcceptNotice}
                onMouseEnter={playHoverSound}
                className="px-6 py-3 border border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-black uppercase text-xs tracking-widest transition-all cursor-pointer whitespace-nowrap"
              >
                CONFIRM AND SIGN AGREEMENT
              </button>
            </div>
          ) : (
            <div className="w-full border border-[#00FF00]/30 bg-black/60 p-3 mb-8 text-xs flex items-center justify-between gap-2 uppercase tracking-widest text-[#00FF00]/70">
              <span className="flex items-center gap-1.5 text-[#00ff00]">
                <UserCheck className="w-4 h-4 text-[#00FF00]" />
                Terminal session active: <strong className="text-white">APPROVED_HACKER_NODE</strong>
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('isAuth_jigsi');
                  setIsAuthenticated(false);
                  playBeep(200, 0.25, "sine", 0.08);
                }}
                className="hover:underline text-xs text-red-500 cursor-pointer"
              >
                [Disengage Connection]
              </button>
            </div>
          )}

          {/* Ingress Query Control Center */}
          <div className="w-full max-w-3xl mb-12">
            <div className="relative border-2 border-[#00FF00] bg-black/90 shadow-[0_0_20px_rgba(0,255,0,0.3)] focus-within:shadow-[0_0_30px_rgba(0,255,0,0.7)] transition-all">
              <span className="absolute left-4 top-4 text-xl matrix-glow animate-pulse">☠️</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); handleKeyPressSound(); }}
                disabled={!isNoticeAccepted}
                className={`w-full bg-transparent border-none pl-12 pr-6 py-4 outline-none text-xl font-bold tracking-widest text-center uppercase placeholder-[#00FF00]/40 ${
                  isNoticeAccepted ? 'text-[#00FF00] cursor-text' : 'text-[#00FF00]/20 cursor-not-allowed'
                }`}
                placeholder="Ingress target username, domain, hash or ip..."
              />
            </div>
            {!isNoticeAccepted && (
              <p className="text-center text-[11px] text-red-400 mt-2 uppercase tracking-widest animate-pulse">
                Unlock keyboard ingress by confirming the Restricted Directive Agreement above
              </p>
            )}
          </div>

          {/* Grid Layout of Categories */}
          <div className="w-full space-y-12">
            {CATEGORIES_LIST.map((category, catIndex) => (
              <div key={catIndex} className="border border-[#00ff00]/20 bg-black/50 p-6 relative">
                <div className="absolute top-0 left-6 -translate-y-1/2 bg-black px-4 py-1 border-x border-[#00ff00]/40">
                  <span className="text-xs md:text-sm font-bold tracking-widest text-[#00FF00] uppercase">
                    {category.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 pt-4">
                  {category.engines.map((engine) => (
                    <button
                      key={engine.key}
                      onClick={() => {
                        if (isNoticeAccepted) {
                          handleOpenEngine(engine.key);
                        } else {
                          playBeep(150, 0.2, "sawtooth", 0.1);
                          showTerminalAlert("Please accept the Restricted Intelligence Directive first.", "warning");
                        }
                      }}
                      onMouseEnter={playHoverSound}
                      className={`engine-btn text-xs font-bold py-3.5 px-3 uppercase border transition-all duration-300 text-center min-w-[130px] rounded-none cursor-pointer hover:shadow-[0_0_20px_#00ff00] ${
                        isNoticeAccepted
                          ? 'bg-black/80 border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00] hover:text-black hover:scale-105 hover:-translate-y-1'
                          : 'bg-black/30 border-[#00FF00]/20 text-[#00FF00]/20 cursor-not-allowed'
                      }`}
                    >
                      {engine.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
