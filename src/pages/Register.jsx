import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/ui/Logo'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import RegisterForm from '../components/auth/RegisterForm'

export default function Register() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative py-8 lg:py-12">
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-text mb-2">
              Join ZeToD
            </h1>
            <p className="text-muted text-sm">
              Create an account to measure your real Python skill level
            </p>
          </div>

          <Card className="p-6 lg:p-8">
            <RegisterForm />
          </Card>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  )
}
