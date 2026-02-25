import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthAPI from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await AuthAPI.login({
        username: form.username,
        password: form.password,
      });

      localStorage.setItem('accessToken', data.accessToken);

      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-error">Login</h2>
          <p className="text-center text-base-content/60">Masuk ke akun Anda</p>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Masukkan username"
                className="input input-bordered w-full"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-soft btn-error w-full mt-4 ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>

            <Link to="/" className="btn btn-outline btn-error w-full">
              Kembali ke Beranda
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
