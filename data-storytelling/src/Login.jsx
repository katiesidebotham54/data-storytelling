import {useState} from 'react'
import { supabase } from './supabaseClient'
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email, password })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      navigateTo('/dashboard')
    }
    setLoading(false)
  }

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <br/>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email: </label>
                      <input 
                        type="email"
                        name="email" 
                        id="email" 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password: </label>
                      <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="••••••••" 
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <div>
              <button
                type="submit"
                onClick = {handleSignIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <span>Loading</span> : <span>Sign In</span>}
              </button>
            </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Not a member?{' '}
                      <Link to= "/">Sign up!</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

    </>
  )
}

export default Login;