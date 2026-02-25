import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../api/auth';
import NewsAPI from '../api/news';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingCreateAdmin, setLoadingCreateAdmin] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: '',
    body: '',
    img: null,
  });

  const [adminForm, setAdminForm] = useState({
    username: '',
    password: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const userLogged = async () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      await AuthAPI.getLoggedInUser(accessToken);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  const fetchNews = async () => {
    try {
      const data = await NewsAPI.getAllNews();
      setBerita(Array.isArray(data) ? data : data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userLogged();
    fetchNews();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'img') {
      setForm({
        ...form,
        img: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      if (isEdit) {
        await NewsAPI.updateNews(form, accessToken);
      } else {
        await NewsAPI.createNews(form, accessToken);
      }

      await fetchNews();
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoadingCreateAdmin(true);

    try {
      await AuthAPI.createUser({
        ...adminForm,
        accessToken,
      });

      setAdminForm({ username: '', password: '' });
      document.getElementById('modal_admin').close();
      alert('Admin berhasil dibuat');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat admin');
    } finally {
      setLoadingCreateAdmin(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title,
      body: item.body,
      img: null,
    });
    setIsEdit(true);
    document.getElementById('modal_form').showModal();
  };

  const handleDelete = async (id) => {
    try {
      await NewsAPI.deleteNews(id, accessToken);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: '',
      body: '',
      img: null,
    });
    setIsEdit(false);
    document.getElementById('modal_form').close();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await AuthAPI.changePassword({
        ...passwordForm,
        accessToken,
      });

      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      document.getElementById('modal_password').close();
      alert('Password berhasil diganti');
    } catch (error) {
      console.error(error);
      alert('Gagal mengganti password');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Dashboard Admin</h1>

        <div className="space-x-2">
          <button
            className="btn btn-info"
            onClick={() => document.getElementById('modal_admin').showModal()}
          >
            Tambah Admin
          </button>

          <button
            className="btn btn-warning"
            onClick={() =>
              document.getElementById('modal_password').showModal()
            }
          >
            Ganti Password
          </button>

          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>

      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          resetForm();
          document.getElementById('modal_form').showModal();
        }}
      >
        + Tambah Berita
      </button>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Isi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-2">Memuat data berita...</p>
                </td>
              </tr>
            ) : (
              berita.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td className="max-w-xs truncate">{item.body}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit Berita */}
      <dialog id="modal_form" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {isEdit ? 'Edit Berita' : 'Tambah Berita'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              name="img"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
              required={!isEdit}
            />

            <input
              type="text"
              name="title"
              placeholder="Judul"
              className="input input-bordered w-full"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="body"
              placeholder="Isi Berita"
              className="textarea textarea-bordered w-full"
              value={form.body}
              onChange={handleChange}
              required
            />

            <div className="modal-action">
              <button type="button" className="btn" onClick={resetForm}>
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Modal Tambah Admin */}
      <dialog id="modal_admin" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tambah Admin</h3>

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              value={adminForm.username}
              onChange={(e) =>
                setAdminForm({ ...adminForm, username: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              required
            />

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById('modal_admin').close()}
              >
                Batal
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loadingCreateAdmin}
              >
                {loadingCreateAdmin ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Modal Ganti Password tetap seperti sebelumnya */}
      <dialog id="modal_password" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Ganti Password</h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Password Lama"
              className="input input-bordered w-full"
              value={passwordForm.oldPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  oldPassword: e.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password Baru"
              className="input input-bordered w-full"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Konfirmasi Password"
              className="input input-bordered w-full"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              required
            />

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById('modal_password').close()
                }
              >
                Batal
              </button>

              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardAdmin;
