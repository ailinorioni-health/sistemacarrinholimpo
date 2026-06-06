import { useState, useEffect } from 'react'
import RotaExpress from './RotaExpress.jsx'

const ACCESS_PASSWORD = "carrinho2026"

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem("rota_auth")
    if (saved === "true") setAuthed(true)
    setLoading(false)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (pwd.trim() === ACCESS_PASSWORD) {
      sessionStorage.setItem("rota_auth", "true")
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
      setPwd("")
    }
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0B1426", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "32px", height: "32px", border: "3px solid rgba(78,205,196,0.2)", borderTopColor: "#4ECDC4", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (authed) return <RotaExpress />

  return (
    <div style={{ minHeight: "100vh", background: "#0B1426", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "24px", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "380px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "#4ECDC4", border: "1px solid rgba(78,205,196,0.4)", padding: "6px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "28px" }}>SISTEMA CARRINHO LIMPO</div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "4px" }}>Rota Express <span style={{ color: "#4ECDC4" }}>30™</span></h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>Área exclusiva para alunos</p>
        <div style={{ background: "#111D33", borderRadius: "20px", padding: "28px 24px", border: "1px solid rgba(78,205,196,0.1)" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(78,205,196,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px" }}>🔒</div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "20px", lineHeight: 1.5 }}>Digite a senha de acesso que você<br/>recebeu junto com sua compra.</p>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Senha de acesso" value={pwd} onChange={(e) => { setPwd(e.target.value); setError(false) }} autoFocus style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.06)", border: error ? "2px solid #E05555" : "2px solid rgba(78,205,196,0.2)", borderRadius: "12px", fontSize: "16px", fontFamily: "'Poppins', sans-serif", color: "white", outline: "none", textAlign: "center", letterSpacing: "2px", boxSizing: "border-box" }} />
            {error && <p style={{ fontSize: "12px", color: "#E05555", marginTop: "8px", fontWeight: 500 }}>Senha incorreta. Verifique e tente novamente.</p>}
            <button type="submit" style={{ width: "100%", padding: "14px", background: "#4ECDC4", color: "#0B1426", fontSize: "15px", fontWeight: 700, fontFamily: "'Poppins', sans-serif", border: "none", borderRadius: "12px", cursor: "pointer", marginTop: "16px", boxShadow: "0 4px 20px rgba(78,205,196,0.2)" }}>Acessar →</button>
          </form>
        </div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)", marginTop: "24px", letterSpacing: "1px" }}>AILIN ORIONI · HEALTH COACH IIN</p>
      </div>
    </div>
  )
}
