import React, { useEffect, useState } from 'react';
import { Loader2, Eye, ChevronDown } from 'lucide-react';
import { getEnquiries, updateEnquiryStatus } from '../firebase/firestore';

const statusColors = {
  new: 'bg-amber-500/20 text-amber-400',
  contacted: 'bg-blue-500/20 text-blue-400',
  resolved: 'bg-green-500/20 text-green-400',
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
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
      <h1 className="text-2xl font-bold text-white mb-6">Customer Enquiries</h1>

      {enquiries.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-brand-grey">No enquiries yet.</p>
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-gold/10">
                  <th className="text-left text-sm font-medium text-brand-grey px-4 py-3">Name</th>
                  <th className="text-left text-sm font-medium text-brand-grey px-4 py-3 hidden md:table-cell">Email</th>
                  <th className="text-left text-sm font-medium text-brand-grey px-4 py-3 hidden lg:table-cell">Phone</th>
                  <th className="text-left text-sm font-medium text-brand-grey px-4 py-3">Service</th>
                  <th className="text-left text-sm font-medium text-brand-grey px-4 py-3">Status</th>
                  <th className="text-left text-sm font-medium text-brand-grey px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <React.Fragment key={enq.id}>
                    <tr className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-sm text-white">{enq.name}</td>
                      <td className="px-4 py-3 text-sm text-brand-grey hidden md:table-cell">{enq.email}</td>
                      <td className="px-4 py-3 text-sm text-brand-grey hidden lg:table-cell">{enq.phone}</td>
                      <td className="px-4 py-3 text-sm text-brand-grey">{enq.service}</td>
                      <td className="px-4 py-3">
                        <select
                          value={enq.status || 'new'}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${
                            statusColors[enq.status] || statusColors.new
                          } bg-opacity-20`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            setExpandedId(expandedId === enq.id ? null : enq.id)
                          }
                          className="text-brand-gold hover:text-brand-gold/80 text-sm flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                    {expandedId === enq.id && (
                      <tr>
                        <td colSpan={6} className="px-4 py-4 bg-brand-black/30">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-brand-grey">Email:</span>{' '}
                              <span className="text-white">{enq.email}</span>
                            </div>
                            <div>
                              <span className="text-brand-grey">Phone:</span>{' '}
                              <span className="text-white">{enq.phone}</span>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-brand-grey">Message:</span>
                              <p className="text-white mt-1 bg-brand-black/50 p-3 rounded-lg">
                                {enq.message}
                              </p>
                            </div>
                            <div>
                              <span className="text-brand-grey">Date:</span>{' '}
                              <span className="text-white">
                                {enq.createdAt?.toDate
                                  ? enq.createdAt.toDate().toLocaleDateString()
                                  : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
