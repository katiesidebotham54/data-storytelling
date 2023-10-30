// Signup component
import { useState } from 'react'
import { supabase } from './supabaseClient'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigateTo = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                alert(error.error_description || error.message)
            }
        } finally {
            setLoading(false);
            navigateTo('/login')
        }
    };

    return (
        <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col items-center mt-10">
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2"
            />
            <button 
                type="submit" 
                onClick = {handleSignUp}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2">
                {loading ? <span>Loading</span> : <span>Sign Up</span>}
            </button>
            <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">Login</Link>
            </p>
        </form>
        </div>
    );
};

export default Signup;
