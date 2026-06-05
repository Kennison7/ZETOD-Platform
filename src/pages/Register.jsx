import { Link } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  return (
    <AuthCard
      headline="Start Your Developer Benchmark"
      subtitle="Measure your real Python skill level with ZeToD."
      accent="secondary"
      footer={
        <p className="text-center text-sm text-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 transition-colors hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  )
}
