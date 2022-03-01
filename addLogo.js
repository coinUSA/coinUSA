let chainInfo = {
    "bscChainTestNet": {
        "chainId": "0x61",
        "chainName": "BSC TestNet",
        "rpcUrls": [
            "https://data-seed-prebsc-1-s1.binance.org:8545/",
            "https://data-seed-prebsc-2-s1.binance.org:8545/"
        ],
        "iconUrls": [
            "https://dex-bin.bnbstatic.com/static/images/favicon.ico",
            "https://dex-bin.bnbstatic.com/static/images/favicon.ico"
        ],
        "nativeCurrency": {
            "name": "BNB",
            "symbol": "BNB",
            "decimals": 18
        },
        "blockExplorerUrls": [
            "https://testnet.bscscan.com/"
        ]
    },
    "bscChainMainNet": {
        "chainId": "0x38",
        "chainName": "BSC MainNet",
        "rpcUrls": [
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed1.defibit.io/",
            "https://bsc-dataseed1.ninicoin.io/"
        ],
        "iconUrls": [
            "https://dex-bin.bnbstatic.com/static/images/favicon.ico",
            "https://dex-bin.bnbstatic.com/static/images/favicon.ico"
        ],
        "nativeCurrency": {
            "name": "BNB",
            "symbol": "BNB",
            "decimals": 18
        },
        "blockExplorerUrls": [
            "https://bscscan.com/"
        ]
    },
}

async function registerEthereumChain(chain) {
    let chainData = {
        'jsonrpc': '2.0',
        'method': 'wallet_addEthereumChain',
        'params': [
            chainInfo[chain],
        ],
    };
    return window.ethereum.request(chainData)
    // window.ethereum.request($)
}

async function addTokenToWallet(token, symbol, decimals, logo){
    await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
                address: token, // The address that the token is at.
                symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: decimals, // The number of decimals in the token
                image: logo, // A string url of the token logo
            },
        },
    });
}


function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}


function fillValue(id) {
    document.querySelector("#" + id).value = getQueryString(id);
}

function showLogo() {
    document.querySelector("img").src = document.querySelector("#logo").value
}

async function switchChain() {
    let chain = document.querySelector("#chain").value
    await registerEthereumChain(chain)
}

function url() {
    let chain = document.querySelector("#chain").value
    let token = document.querySelector("#token").value
    let symbol = document.querySelector("#symbol").value
    let decimals = document.querySelector("#decimals").value
    let logo = document.querySelector("#logo").value
    document.querySelector("#url").value = `https://falcontokencoin.github.io/addLogo.html?chain=${chain}&token=${token}&symbol=${symbol}&decimals=${decimals}&logo=${logo}`
}

async function initValue() {
    await switchChain()
    await addTokenToWallet(getQueryString("token"),getQueryString("symbol"),getQueryString("decimals"),getQueryString("logo"));
}
function initFrom() {
    fillValue("chain");
    fillValue("token");
    fillValue("symbol");
    fillValue("decimals");
    fillValue("logo");
    showLogo();
}

window.onload = function () {
    initFrom()
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        // bscChainTestNet, bscChainMainNet
        initValue()
    } else {
        alert("请在钱包内打开，或者安装钱包浏览器插件metamask")
    }
}