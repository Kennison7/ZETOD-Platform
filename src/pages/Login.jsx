import { Link } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
  return (
    <AuthCard
      headline="Welcome Back"
      subtitle="Continue your journey toward real-world developer readiness."
      footer={
        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Create one
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  )
}
