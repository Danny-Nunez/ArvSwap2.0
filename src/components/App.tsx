import { useCallback, useRef, useState, useEffect } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget, darkTheme, lightTheme, Theme } from '@uniswap/widgets'

// ↓↓↓ Don't forget to import the widgets' fonts! ↓↓↓
import '@uniswap/widgets/fonts.css'
// ↑↑↑

import { useActiveProvider } from '../connectors'
import { JSON_RPC_URL } from '../constants'
import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'
import icon1 from './icon1.png'
import icon2 from './icon2.png'

// const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
const TOKEN_LIST = [
  {
    name: 'Artemis Vision',
    address: '0x28fDA76721a8077A5dE802Ab0212849B8c38429E',
    symbol: 'ARV',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://artemisvision.io/arvlogo200px.png',
  },
  {
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  {
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
]

const ARV = '0x28fDA76721a8077A5dE802Ab0212849B8c38429E'

export default function App() {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  // The locale to pass to the SwapWidget.
  // This is a value from the SUPPORTED_LOCALES exported by @uniswap/widgets.
  const [locale, setLocale] = useState<SupportedLocale>('en-US')
  const onSelectLocale = useCallback((e) => setLocale(e.target.value), [])
  const [theme, setTheme] = useState('light')
  const [toggle, setToggle] = useState(false)
  const [darkmode, setdarkmode] = useState(false)

  // const [myDarkTheme, setmyDarkTheme] = useState('true')
  const toggleTheme = () => {
    setToggle(!toggle)
    setdarkmode(!darkmode)
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const myLight: Theme = {
    ...lightTheme, // Extend the lightTheme
    primary: '#000000',
    secondary: '#7c527d',
    interactive: '#d1d1d1',
    container: '#efefef',
    module: '#f9f9f9',
    accent: '#b500dc',
    outline: '#b500dc',
    dialog: '#FFF',
    borderRadius: 0.8,
  }
  const myDark: Theme = {
    ...darkTheme, // Extend the darkTheme
    accent: '#b500dc',
    primary: '#FFFFFF',
    secondary: '#888D9B',
    module: '#000000',
    outline: '#b500dc',
    container: '#010101',
    dialog: '#000',
    interactive: '#191919',
  }
  let darkMode = true

  return (
    <div className={styles.container}>
      <div className={`App ${theme}`}>
        <div className="toggleback">
          <button className="togglebutton" onClick={toggleTheme}>
            {toggle ? <img src={icon1} alt="icon1" /> : <img src={icon2} alt="icon2" />}
          </button>
        </div>
      </div>
      <div className={styles.i18n}>
        <label style={{ display: 'flex' }}>
          <FiGlobe />
        </label>
        <select onChange={onSelectLocale}>
          {SUPPORTED_LOCALES.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div>
      <main className={styles.main}>
        <h1 className="headertitle">UniSwap 2.0</h1>
        <span className="headertext">Exchange ARV tokens in seconds</span>
        <div className={styles.demo}>
          <div className={styles.connectors} ref={connectors} tabIndex={-1}>
            <Web3Connectors />
          </div>
          <div className={styles.widget}>
            <SwapWidget
              theme={darkMode ? myDark : myLight}
              jsonRpcEndpoint={JSON_RPC_URL}
              tokenList={TOKEN_LIST}
              provider={provider}
              locale={locale}
              onConnectWallet={focusConnectors}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={ARV}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
