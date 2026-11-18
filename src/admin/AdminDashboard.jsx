import React, { useEffect, useState } from 'react';
import { MessageSquare, Briefcase, Users, Loader2 } from 'lucide-react';
import { getEnquiries, getProjects } from '../firebase/firestore';

const StatCard = ({ icon: Icon, label, count, color }) => (
  <div className="glass-card rounded-xl p-6">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{count}</p>
        <p className="text-brand-grey text-sm">{label}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, newCount: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [enquiries, projects] = await Promise.all([getEnquiries(), getProjects()]);
        setStats({
          total: enquiries.length,
          newCount: enquiries.filter((e) => e.status === 'new').length,
          projects: projects.length,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="text-brand-gold animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={MessageSquare}
          label="Total Enquiries"
          count={stats.total}
          color="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          icon={Users}
          label="New Enquiries"
          count={stats.newCount}
          color="bg-amber-500/10 text-amber-400"
        />
        <StatCard
          icon={Briefcase}
          label="Portfolio Projects"
          count={stats.projects}
          color="bg-green-500/10 text-green-400"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
