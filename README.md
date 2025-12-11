<div align="center">

# ⬡ PROTOCOL

### Solana DeFi Primitives on Mobile

*Advanced on-chain financial instruments, reimagined for mobile-first interaction*

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Network](https://img.shields.io/badge/network-Solana%20Devnet-purple?style=flat-square)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-lightgrey?style=flat-square)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

</div>

## 💫 About

**Protocol** is a mobile-native DeFi application showcasing production-grade Solana primitives. Built with Expo and React Native, it demonstrates real-world implementations of financial instruments operating entirely on-chain, with seamless mobile wallet integration and hardware-backed security.

The application serves as both a functional DeFi toolkit and a reference implementation for mobile-first blockchain development on Solana.

<br/>

## 🎯 Implementation Status

### ✅ Production Ready

<table>
<tr>
<td width="30%"><b>Standard Vault</b></td>
<td width="70%">
  <b>✅ FULLY IMPLEMENTED</b><br/>
  Complete deposit/withdraw system with PDA architecture, real-time balance synchronization, dynamic UI state management, and transaction confirmation flow. Includes MAX button functionality and vault-to-wallet ratio visualization.
</td>
</tr>
<tr>
<td><b>Wallet Integration</b></td>
<td>
  <b>✅ FULLY IMPLEMENTED</b><br/>
  Solana Mobile Wallet Adapter integration with session management, multi-account support, and secure transaction signing.
</td>
</tr>
<tr>
<td><b>Design System</b></td>
<td>
  <b>✅ FULLY IMPLEMENTED</b><br/>
  Custom component library with cards, inputs, buttons, charts, and animations. Consistent typography and color system across all screens.
</td>
</tr>
</table>

### 🎨 Interface Complete

<table>
<tr>
<td width="30%"><b>Enclave Vault</b></td>
<td width="70%">
  <b>🎨 UI COMPLETE</b> • Smart contract integration pending<br/>
  Hardware-secured storage with Secp256r1 biometric authentication interface designed and implemented.
</td>
</tr>
<tr>
<td><b>Atomic Escrow</b></td>
<td>
  <b>🎨 UI COMPLETE</b> • Transaction logic pending<br/>
  Trustless P2P asset transfer interface with conditional release mechanics designed.
</td>
</tr>
<tr>
<td><b>Hydraulic AMM</b></td>
<td>
  <b>🎨 UI COMPLETE</b> • Liquidity pool integration pending<br/>
  Constant product market maker interface with swap and liquidity provision flows.
</td>
</tr>
<tr>
<td><b>Flash Loans</b></td>
<td>
  <b>🎨 UI COMPLETE</b> • Atomic transaction execution pending<br/>
  Uncollateralized lending interface with three-step atomic transaction visualization.
</td>
</tr>
</table>

### 📋 Planned Enhancements

<div align="center">

| Feature | Priority | Status |
|---------|----------|--------|
| Transaction History | High | 📝 Planned |
| SPL Token Support | High | 📝 Planned |
| Price Feeds & Charts | Medium | 📝 Planned |
| Mainnet Deployment | Low | 🔒 Post-Audit |
| Security Audit | Critical | 📋 Required |
| App Store Release | Low | 🚀 Future |

</div>

<br/>

## 🏗️ Architecture

```
Protocol Mobile App
│
├── On-Chain Programs (Rust/Anchor)
│   ├── Vault Program        ✅ Deployed
│   ├── Escrow Program       🚧 Development
│   ├── AMM Program          🚧 Development
│   └── Flash Loan Program   🚧 Development
│
├── Mobile Application (TypeScript/React Native)
│   ├── Wallet Integration   ✅ Complete
│   ├── Transaction Layer    ✅ Complete
│   ├── State Management     ✅ Complete
│   └── UI Components        ✅ Complete
│
└── Infrastructure
    ├── Network: Solana Devnet
    ├── RPC: Default Solana RPC
    └── Wallet: Mobile Wallet Adapter
```

<br/>

## 🎨 Design Language

### Color Palette

```
✅ Standard Vault    #fdf0d5  ━━  Cream (Background)
                     #003049  ━━  Deep Blue (Primary)
                     #c1121f  ━━  Atomic Red (Accent)
                     #669bbc  ━━  Sky Blue (Secondary)
                     #0a0908  ━━  Charcoal (Text)
```

### Typography

- **Display Typeface** → Archivo Black (900)
- **Body Typeface** → Space Grotesk (400, 700)  
- **Monospace** → JetBrains Mono (System Fallback)

<br/>

## ⚡ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | Expo SDK 54 + React Native + TypeScript |
| **Blockchain** | Solana Devnet + @solana/web3.js |
| **State** | React Query (TanStack) |
| **Routing** | Expo Router (File-based) |
| **Wallet** | Solana Mobile Wallet Adapter |

</div>

<br/>

## 🔐 Security Notice

<div align="center">

⚠️ **DEVNET DEPLOYMENT ONLY**

This application operates exclusively on Solana's devnet.  
Not audited for production use.  
Educational and demonstration purposes only.  
Never use with real funds on mainnet.

</div>

<br/>

## 📦 Application Details

**App Name:** Protocol  
**Bundle Identifier:** `xyz.skartik.protocol`  
**URL Scheme:** `protocol://`  
**Target Network:** Solana Devnet  
**Min SDK:** Android 8.0+ / iOS 14.0+

<br/>

<img width="3712" height="1152" alt="Gemini_Generated_Image_fhncjafhncjafhnc-min" src="https://github.com/user-attachments/assets/45b70d46-31fa-4699-b2d8-efbecfa922ed" />


<div align="center">

**Built by [Singupalli Kartik](https://skartik.xyz)**

*Crafted with ⚡ on Solana*

</div>
