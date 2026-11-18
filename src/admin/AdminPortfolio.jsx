import React, { useEffect, useState } from 'react';
import {
  Plus,
  Loader2,
  Trash2,
  Edit3,
  X,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from '../firebase/firestore';
import { uploadImage, uploadMultipleImages } from '../cloudinary/upload';

const categories = [
  'Websites',
  'Mobile Applications',
  'Branding & Logos',
  'Graphic Designs',
  'Promotional Videos',
  'Digital Marketing',
];

const emptyForm = {
  title: '',
  category: '',
  description: '',
  coverImage: '',
  images: [],
  projectUrl: '',
};

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (project) => {
    setForm({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
      coverImage: project.coverImage || '',
      images: project.images || [],
      projectUrl: project.projectUrl || '',
    });
    setEditingId(project.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress('Uploading cover image...');
    try {
      const result = await uploadImage(file);
      setForm((prev) => ({ ...prev, coverImage: result.url }));
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleMultipleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setUploadProgress(`Uploading ${files.length} image(s)...`);
    try {
      const results = await uploadMultipleImages(files);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...results.map((r) => r.url)],
      }));
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.category) {
      alert('Please fill in title and category.');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, form);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...form } : p))
        );
      } else {
        const docRef = await addProject(form);
        setProjects((prev) => [{ id: docRef.id, ...form }, ...prev]);
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="text-brand-gold animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Portfolio Projects</h1>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={18} className="mr-2" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <ImageIcon size={48} className="text-brand-gold/30 mx-auto mb-4" />
          <p className="text-brand-grey">No portfolio projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass-card rounded-xl overflow-hidden">
              <div className="aspect-video bg-brand-black flex items-center justify-center">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={36} className="text-brand-gold/30" />
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-white font-semibold mt-2">{project.title}</h3>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(project)}
                    className="flex items-center gap-1 text-sm text-brand-grey hover:text-brand-gold transition"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Project' : 'Add Project'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-brand-grey hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-grey mb-1 block">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full bg-brand-black/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-brand-grey mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full bg-brand-black/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-brand-grey mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-brand-black/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition resize-none"
                  placeholder="Project description"
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="text-sm font-medium text-brand-grey mb-1 block">Cover Image</label>
                {form.coverImage ? (
                  <div className="relative">
                    <img
                      src={form.coverImage}
                      alt="Cover"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setForm((p) => ({ ...p, coverImage: '' }))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-brand-gold/20 rounded-lg cursor-pointer hover:border-brand-gold/40 transition">
                    <div className="text-center">
                      <Upload size={24} className="text-brand-gold/50 mx-auto mb-2" />
                      <span className="text-brand-grey text-sm">Upload cover image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Additional Images */}
              <div>
                <label className="text-sm font-medium text-brand-grey mb-1 block">
                  Additional Images
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20">
                      <img
                        src={img}
                        alt={`Image ${i}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="inline-flex items-center gap-2 text-brand-gold text-sm cursor-pointer hover:text-brand-gold/80">
                  <Plus size={16} />
                  Add images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-sm font-medium text-brand-grey mb-1 block">
                  Project URL (optional)
                </label>
                <input
                  type="url"
                  value={form.projectUrl}
                  onChange={(e) => setForm((p) => ({ ...p, projectUrl: e.target.value }))}
                  className="w-full bg-brand-black/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition"
                  placeholder="https://example.com"
                />
              </div>

              {uploadProgress && (
                <p className="text-brand-gold text-sm flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  {uploadProgress}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
