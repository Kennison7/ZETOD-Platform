import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import AuthInput from './AuthInput'
import CountrySelect from './CountrySelect'
import Spinner from './Spinner'
import ColdStartNotice from './ColdStartNotice'
import { registerUser } from '../../services/authService'
import { getApiErrorMessage } from '../../utils/errors'
import useColdStartHint from '../../hooks/useColdStartHint'

const INITIAL_FORM = {
  email: '',
  nom: '',
  prenom: '',
  password: '',
  confirmPassword: '',
  pays: '',
  ville: '',
  metier: '',
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const showColdStart = useColdStartHint(loading)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess(false)
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errors = {}

    if (!form.email.trim()) {
      errors.email = 'L\'email est requis.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Veuillez entrer une adresse email valide.'
    }

    if (!form.nom.trim()) {
      errors.nom = 'Le nom est requis.'
    }

    if (!form.prenom.trim()) {
      errors.prenom = 'Le prénom est requis.'
    }

    if (!form.password) {
      errors.password = 'Le mot de passe est requis.'
    } else if (form.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = 'La confirmation du mot de passe est requise.'
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    }

    if (!form.pays) {
      errors.pays = 'Le pays est requis.'
    }

    if (!form.ville.trim()) {
      errors.ville = 'La ville est requise.'
    }

    if (!form.metier.trim()) {
      errors.metier = 'Le métier est requis.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await registerUser({
        email: form.email.trim(),
        nom: form.nom.trim(),
        prenom: form.prenom.trim(),
        password: form.password,
        pays: form.pays,
        ville: form.ville.trim(),
        metier: form.metier.trim(),
      })

      setSuccess(true)
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Impossible de créer le compte. Veuillez réessayer.'))
    } finally {
      setLoading(false)
    }
  }

  const isDisabled = loading || success

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary"
        >
          Compte créé ! Redirection vers la connexion…
        </div>
      )}

      <ColdStartNotice visible={showColdStart} />

      <AuthInput
        id="nom"
        name="nom"
        label="Nom"
        type="text"
        autoComplete="family-name"
        value={form.nom}
        onChange={handleChange}
        placeholder="Emeka"
        error={fieldErrors.nom}
        disabled={isDisabled}
      />

      <AuthInput
        id="prenom"
        name="prenom"
        label="Prénom"
        type="text"
        autoComplete="given-name"
        value={form.prenom}
        onChange={handleChange}
        placeholder="Chidi"
        error={fieldErrors.prenom}
        disabled={isDisabled}
      />

      <AuthInput
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
        placeholder="vous@exemple.com"
        error={fieldErrors.email}
        disabled={isDisabled}
      />

      <AuthInput
        id="password"
        name="password"
        label="Mot de passe"
        type="password"
        autoComplete="new-password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={fieldErrors.password}
        disabled={isDisabled}
      />

      <AuthInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmation de mot de passe"
        type="password"
        autoComplete="new-password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        error={fieldErrors.confirmPassword}
        disabled={isDisabled}
      />

      <CountrySelect
        id="pays"
        label="Pays"
        value={form.pays}
        onChange={handleChange}
        error={fieldErrors.pays}
        disabled={isDisabled}
      />

      <AuthInput
        id="ville"
        name="ville"
        label="Ville"
        type="text"
        autoComplete="address-level2"
        value={form.ville}
        onChange={handleChange}
        placeholder="Paris"
        error={fieldErrors.ville}
        disabled={isDisabled}
      />

      <AuthInput
        id="metier"
        name="metier"
        label="Métier"
        type="text"
        autoComplete="organization-title"
        value={form.metier}
        onChange={handleChange}
        placeholder="Développeur, médecin, enseignant…"
        error={fieldErrors.metier}
        disabled={isDisabled}
      />

      <Button
        type="submit"
        className="w-full gap-2"
        size="lg"
        disabled={isDisabled}
      >
        {loading && <Spinner />}
        {loading ? 'Création du compte…' : 'Créer un compte'}
      </Button>
    </form>
  )
}
