import React, { useState, useEffect } from 'react';
import { createUpdate, setHelpInfo, signOutAdmin, listenToAllUpdates, updateUpdateById, deleteUpdateById, createImportantLink, listenToImportantLinks, updateImportantLinkById, deleteImportantLinkById } from '../lib/firebase';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('updates');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [updatesList, setUpdatesList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ type: 'admissions', title: '', url: '', description: '', file: null });
  const [deletingId, setDeletingId] = useState(null);

  // Important Links state
  const [linkForm, setLinkForm] = useState({ title: '', url: '' });
  const [linksList, setLinksList] = useState([]);
  const [linkEditId, setLinkEditId] = useState(null);
  const [linkEditForm, setLinkEditForm] = useState({ title: '', url: '' });
  const [linkDeletingId, setLinkDeletingId] = useState(null);

  // Update form state
  const [updateForm, setUpdateForm] = useState({
    type: 'admissions',
    title: '',
    url: '',
    description: '',
    file: null
  });

  // Help form state
  const [helpForm, setHelpForm] = useState({
    helpline: '1800-XXX-XXXX',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    email: 'support@dhepune.gov.in'
  });

  useEffect(() => {
    const off = listenToAllUpdates((list) => setUpdatesList(list));
    return () => { try { if (typeof off === 'function') off(); } catch {} };
  }, []);

  useEffect(() => {
    const offLinks = listenToImportantLinks((list) => setLinksList(list));
    return () => { try { if (typeof offLinks === 'function') offLinks(); } catch {} };
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createUpdate(updateForm);
      setMessage('Update published successfully!');
      setUpdateForm({
        type: 'admissions',
        title: '',
        url: '',
        description: '',
        file: null
      });
      // Reset file input
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setMessage('Error publishing update: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (u) => {
    setEditId(u.id);
    setEditForm({
      type: u.type || 'admissions',
      title: u.title || '',
      url: u.url || '',
      description: u.description || '',
      file: null,
      fileURL: u.fileURL || null,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ type: 'admissions', title: '', url: '', description: '', file: null, fileURL: null });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editId) return;
    setLoading(true);
    setMessage('');
    try {
      await updateUpdateById(editId, editForm);
      setMessage('Update saved successfully!');
      cancelEdit();
    } catch (error) {
      setMessage('Error saving update: ' + error.message);
      console.error('Edit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id) => setDeletingId(id);
  const cancelDelete = () => setDeletingId(null);
  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoading(true);
    setMessage('');
    try {
      await deleteUpdateById(deletingId);
      setMessage('Update deleted successfully!');
    } catch (error) {
      setMessage('Error deleting update: ' + error.message);
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
      setDeletingId(null);
    }
  };

  // Links CRUD handlers
  const handleLinkCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!linkForm.title || !linkForm.url) throw new Error('Title and URL are required.');
      await createImportantLink(linkForm);
      setMessage('Link added successfully!');
      setLinkForm({ title: '', url: '' });
    } catch (error) {
      setMessage('Error adding link: ' + error.message);
      console.error('Link add error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLinkEdit = (l) => {
    setLinkEditId(l.id);
    setLinkEditForm({ title: l.title || '', url: l.url || '' });
  };

  const cancelLinkEdit = () => {
    setLinkEditId(null);
    setLinkEditForm({ title: '', url: '' });
  };

  const handleLinkEditSubmit = async (e) => {
    e.preventDefault();
    if (!linkEditId) return;
    setLoading(true);
    setMessage('');
    try {
      await updateImportantLinkById(linkEditId, linkEditForm);
      setMessage('Link updated successfully!');
      cancelLinkEdit();
    } catch (error) {
      setMessage('Error updating link: ' + error.message);
      console.error('Link update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestLinkDelete = (id) => setLinkDeletingId(id);
  const cancelLinkDelete = () => setLinkDeletingId(null);
  const confirmLinkDelete = async () => {
    if (!linkDeletingId) return;
    setLoading(true);
    setMessage('');
    try {
      await deleteImportantLinkById(linkDeletingId);
      setMessage('Link deleted successfully!');
    } catch (error) {
      setMessage('Error deleting link: ' + error.message);
      console.error('Link delete error:', error);
    } finally {
      setLoading(false);
      setLinkDeletingId(null);
    }
  };

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await setHelpInfo(helpForm);
      setMessage('Help information updated successfully!');
    } catch (error) {
      setMessage('Error updating help info: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Joint Director Higher Education Pune Region</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {message && (
          <div className={`mb-4 p-4 rounded-md ${message.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {message}
          </div>
        )}

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('updates')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'updates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manage Updates
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'help'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Help Information
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'links'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Important Links
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'updates' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Publish New Update</h2>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Update Type</label>
                    <select
                      value={updateForm.type}
                      onChange={(e) => setUpdateForm({...updateForm, type: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="admissions">Latest Admissions</option>
                      <option value="examinations">Examinations</option>
                      <option value="policy">Policy</option>
                      <option value="link">Important Link</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      required
                      value={updateForm.title}
                      onChange={(e) => setUpdateForm({...updateForm, title: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter update title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL (Optional)</label>
                    <input
                      type="url"
                      value={updateForm.url}
                      onChange={(e) => setUpdateForm({...updateForm, url: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={updateForm.description}
                      onChange={(e) => setUpdateForm({...updateForm, description: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Attachment (Optional)</label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(e) => setUpdateForm({...updateForm, file: e.target.files[0]})}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
                  >
                    {loading ? 'Publishing...' : 'Publish Update'}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8 h-px bg-gray-200" />

                {/* Existing Updates List */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Existing Updates</h2>
                  {updatesList.length === 0 ? (
                    <div className="text-sm text-gray-500">No updates yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {updatesList.map((u) => (
                        <div key={u.id} className="border border-gray-200 rounded-lg p-4">
                          {editId === u.id ? (
                            <form onSubmit={handleEditSubmit} className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Update Type</label>
                                  <select
                                    value={editForm.type}
                                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="admissions">Latest Admissions</option>
                                    <option value="examinations">Examinations</option>
                                    <option value="policy">Policy</option>
                                    <option value="link">Important Link</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Title</label>
                                  <input
                                    type="text"
                                    required
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">URL (Optional)</label>
                                  <input
                                    type="url"
                                    value={editForm.url || ''}
                                    onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Description</label>
                                  <textarea
                                    rows={3}
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700">Replace Attachment (Optional)</label>
                                  <input
                                    id="edit-file-input"
                                    type="file"
                                    onChange={(e) => setEditForm({ ...editForm, file: e.target.files[0] })}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  />
                                  {editForm.fileURL && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Current: <a href={editForm.fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Attachment</a>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">
                                  {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                              </div>
                            </form>
                          ) : (
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                              <div>
                                <div className="text-sm text-gray-500">{new Date(u.createdAt || 0).toLocaleString()}</div>
                                <div className="font-medium text-gray-900">{u.title}</div>
                                <div className="text-xs text-gray-600">{u.type}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                {u.url && <a href={u.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Open Link</a>}
                                {u.fileURL && <a href={u.fileURL} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Attachment</a>}
                                {deletingId === u.id ? (
                                  <>
                                    <button onClick={confirmDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs disabled:opacity-50">{loading ? 'Deleting...' : 'Confirm'}</button>
                                    <button onClick={cancelDelete} className="border border-gray-300 px-3 py-1.5 rounded text-xs">Cancel</button>
                                  </>
                                ) : (
                                  <>
                                    <button onClick={() => startEdit(u)} className="bg-gray-800 hover:bg-black text-white px-3 py-1.5 rounded text-xs">Edit</button>
                                    <button onClick={() => requestDelete(u.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs">Delete</button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Update Help Information</h2>
                <form onSubmit={handleHelpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Helpline Number</label>
                    <input
                      type="text"
                      required
                      value={helpForm.helpline}
                      onChange={(e) => setHelpForm({...helpForm, helpline: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1800-XXX-XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hours</label>
                    <input
                      type="text"
                      required
                      value={helpForm.hours}
                      onChange={(e) => setHelpForm({...helpForm, hours: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mon-Fri: 9:00 AM - 6:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Support Email</label>
                    <input
                      type="email"
                      required
                      value={helpForm.email}
                      onChange={(e) => setHelpForm({...helpForm, email: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="support@dhepune.gov.in"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Help Information'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'links' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Manage Important Links</h2>
                <form onSubmit={handleLinkCreateSubmit} className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        required
                        value={linkForm.title}
                        onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., UGC Guidelines"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">URL</label>
                      <input
                        type="url"
                        required
                        value={linkForm.url}
                        onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">
                      {loading ? 'Adding...' : 'Add Link'}
                    </button>
                  </div>
                </form>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Existing Links</h3>
                  {linksList.length === 0 ? (
                    <div className="text-sm text-gray-500">No links added yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {linksList.map((l) => (
                        <div key={l.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          {linkEditId === l.id ? (
                            <form onSubmit={handleLinkEditSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                required
                                value={linkEditForm.title}
                                onChange={(e) => setLinkEditForm({ ...linkEditForm, title: e.target.value })}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                              <input
                                type="url"
                                required
                                value={linkEditForm.url}
                                onChange={(e) => setLinkEditForm({ ...linkEditForm, url: e.target.value })}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                              <div className="flex items-center gap-2 col-span-1 md:col-span-2">
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50">
                                  {loading ? 'Saving...' : 'Save'}
                                </button>
                                <button type="button" onClick={cancelLinkEdit} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <div>
                                <div className="font-medium text-gray-900">{l.title}</div>
                                <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{l.url}</a>
                              </div>
                              <div className="flex items-center gap-2">
                                {linkDeletingId === l.id ? (
                                  <>
                                    <button onClick={confirmLinkDelete} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs disabled:opacity-50">{loading ? 'Deleting...' : 'Confirm'}</button>
                                    <button onClick={cancelLinkDelete} className="border border-gray-300 px-3 py-1.5 rounded text-xs">Cancel</button>
                                  </>
                                ) : (
                                  <>
                                    <button onClick={() => startLinkEdit(l)} className="bg-gray-800 hover:bg-black text-white px-3 py-1.5 rounded text-xs">Edit</button>
                                    <button onClick={() => requestLinkDelete(l.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs">Delete</button>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;