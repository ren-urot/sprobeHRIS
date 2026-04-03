import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '@/assets/icons/logo.png'

export default function LoginPage() {
  const [email, setEmail] = useState('johndoe@mail.com')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-orange flex flex-col">
      <div className="w-full max-w-[1639px] mx-auto flex flex-col flex-1">
        <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">
          {/* Brand logo */}
          <div className="flex items-center mb-9">
            <img src={logo} alt="Sprobe" className="h-[50px] brightness-0 invert" />
            <div className="w-[2px] h-11 bg-white/60 mx-5" />
            <span className="text-white text-[32px] font-bold tracking-[2px]">HRIS</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl px-6 sm:px-12 py-10 w-full max-w-[440px]">
            <h2 className="text-brand-orange text-[26px] font-semibold mb-7">Login</h2>

            <div className="mb-4">
              <label className="block text-[14px] font-medium text-[#333] mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="johndoe@mail.com"
                className="h-11 border-2"
              />
            </div>

            <div className="mb-1.5">
              <label className="block text-[14px] font-medium text-[#333] mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 border-2 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#888]"
                >
                  {showPw ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <a href="#" className="block text-[13px] text-brand-blue mb-6 hover:underline">
              Forgot Password?
            </a>

            <Button
              className="w-full h-12 text-base rounded-xl"
              onClick={() => navigate('/dashboard')}
            >
              Sign In
            </Button>
          </div>
        </div>

        <footer className="text-center py-4 text-[13px] text-white/70">
          © 2022 Sprobe Inc. All rights Reserved.
        </footer>
      </div>
    </div>
  )
}
