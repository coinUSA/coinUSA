
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
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    const bscTest = document.querySelector('#bscTest');
    const bsc = document.querySelector('#bsc');
    bscTest.addEventListener('click', () => {
        registerEthereumChain("bscChainTestNet")
    });
    bsc.addEventListener('click', () => {
        registerEthereumChain("bscChainMainNet")
    });
} else {
    alert("请在钱包内打开，或者安装钱包浏览器插件metamask")
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