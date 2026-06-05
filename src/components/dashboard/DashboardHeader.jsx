import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

export default function DashboardHeader({ onLogout, loading }) {
  return (
    <header className="border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="shrink-0">
            <Logo />
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted px-2.5 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary">
              Active session
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={onLogout}
              className="gap-2"
              disabled={loading}
            >
              <LogOut size={14} />
              {loading ? 'Signing out…' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
