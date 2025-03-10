"use client";
import { useEffect, useState } from "react";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import AlertsPanel from "@/components/admin/dashboard/AlertsPanel";
import RecentMembers from "@/components/admin/dashboard/RecentMembers";
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Calendar, User ,Mail , CreditCard } from "lucide-react";


// Register ChartJS components
ChartJS.register(...registerables);

// Indian number formatter
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

// Test data
const TEST_DATA = {
  stats: {
    totalEvents: 24,
    publishedEvents: 18,
    totalRegistrations: 342,
    activeClubs: 8,
    revenueThisMonth: 1245000, // In paise for accurate formatting
    pendingTasks: 5,
    newMembers: 28
  },
  trends: {
    registrations: [32, 45, 67, 89, 72, 58, 65, 87, 91, 105, 120, 132],
    revenue: [120000, 180000, 220000, 350000, 280000, 190000, 240000, 320000, 410000, 380000, 420000, 460000] // In paise
  },
  membership: [
    { category: 'Standard', count: 245, color: '#4F46E5' },
    { category: 'Premium', count: 125, color: '#10B981' },
    { category: 'VIP', count: 78, color: '#F59E0B' },
    { category: 'Trial', count: 42, color: '#6B7280' }
  ],
  recentMembers: [
    { id: 1, name: 'Piyush Sharma', email: 'piyush@example.com', plan: 'Premium', joinDate: '08/03/2025' },
    { id: 2, name: 'Aditi Mehta', email: 'aditi@example.com', plan: 'Standard', joinDate: '07/03/2025' },
    { id: 3, name: 'Ravi Kumar', email: 'ravi@example.com', plan: 'VIP', joinDate: '06/03/2025' },
    { id: 4, name: 'Ananya Patel', email: 'ananya@example.com', plan: 'Standard', joinDate: '05/03/2025' },
    { id: 5, name: 'Sohail Khan', email: 'sohail@example.com', plan: 'VIP', joinDate: '04/03/2025' }
  ],
  
  alerts: [
    { id: 1, type: 'warning', message: 'Event capacity for "Garba Night" is at 85%', date: '10/03/2025' },
    { id: 2, type: 'info', message: '3 new membership applications need review for "MakerCarnival"', date: '09/03/2025' },
    { id: 3, type: 'error', message: 'Payment processing error for event ticket #28394', date: '08/03/2025' },
    { id: 4, type: 'success', message: 'Monthly revenue target achieved during "Diwali Festival" event', date: '07/03/2025' }
  ],  
  quickLinks: [
    { title: 'Create New Event', path: '/admin/events/create', icon: <Calendar/> },
    { title: 'Add New Member', path: '/admin/members/add', icon: <User/> },
    { title: 'Send Email Campaign', path: '/admin/emails/new', icon: <Mail/> },
    { title: 'View Recent Transactions', path: '/admin/finance/transactions', icon: <CreditCard/> }
  ],
  events: [
    { id: 1, title: 'Annual Charity Gala', date: '2025-04-15', attendees: 120, status: 'upcoming' },
    { id: 2, title: 'Tech Conference 2025', date: '2025-05-22', attendees: 250, status: 'upcoming' },
    { id: 3, title: 'Cultural Festival', date: '2025-03-01', attendees: 180, status: 'completed' }
  ]
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(TEST_DATA.stats);
  const [trendsData, setTrendsData] = useState(TEST_DATA.trends);
  const [membershipData, setMembershipData] = useState(TEST_DATA.membership);
  const [recentMembers, setRecentMembers] = useState(TEST_DATA.recentMembers);
  const [alerts, setAlerts] = useState(TEST_DATA.alerts);
  const [quickLinks, setQuickLinks] = useState(TEST_DATA.quickLinks);
  const [events, setEvents] = useState(TEST_DATA.events);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'events', 'members', 'revenue'

  useEffect(() => {
    // Simulate loading delay to test the loading state
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Prepare chart data
  const registrationChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Registrations',
        data: trendsData.registrations,
        fill: true,
        backgroundColor: 'rgba(255, 153, 0, 0.2)', // Saffron
        borderColor: 'rgba(255, 153, 0, 1)',
        tension: 0.4
      }
    ]
  };

  // Prepare revenue chart data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: trendsData.revenue,
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.2)', // Green
        borderColor: 'rgba(16, 185, 129, 1)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="flex-1">
       
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome to your administration portal</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-md ${viewMode === 'overview' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('events')}
                className={`px-4 py-2 rounded-md ${viewMode === 'events' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Events
              </button>
              <button
                onClick={() => setViewMode('members')}
                className={`px-4 py-2 rounded-md ${viewMode === 'members' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Members
              </button>
              <button
                onClick={() => setViewMode('revenue')}
                className={`px-4 py-2 rounded-md ${viewMode === 'revenue' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                Revenue
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {viewMode === 'overview' && (
                <>
                  <DashboardStats stats={stats} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Event Registration Trends</h2>
                      <div className="h-80">
                        <Line data={registrationChartData} options={{ maintainAspectRatio: false }} />
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Membership Distribution</h2>
                      <div className="h-80">
                        <Doughnut data={{
                          labels: membershipData.map(item => item.category),
                          datasets: [{
                            data: membershipData.map(item => item.count),
                            backgroundColor: membershipData.map(item => item.color)
                          }]
                        }} />
                      </div>
                    </div>
                  </div>
                  <QuickActions quickLinks={quickLinks} />
                  <AlertsPanel alerts={alerts} />
                </>
              )}
              {viewMode === 'events' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Events Management</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Total Events: {stats.totalEvents} | Published: {stats.publishedEvents}</p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attendees</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {events.map((event) => (
                          <tr key={event.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{event.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{event.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{event.attendees}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                event.status === 'upcoming' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {viewMode === 'members' && (
                <RecentMembers recentMembers={recentMembers} />
              )}
              {viewMode === 'revenue' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Revenue Analysis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Revenue This Month</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatter.format(stats.revenueThisMonth/100)}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Average Transaction</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatter.format(3640)}</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total YTD</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatter.format(3240000/100)}</p>
                    </div>
                  </div>
                  <div className="h-80 mt-4">
                    <Line data={revenueChartData} options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          ticks: {
                            callback: function(value) {
                              return formatter.format(value/100);
                            }
                          }
                        }
                      },
                      plugins: {
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return formatter.format(context.raw/100);
                            }
                          }
                        }
                      }
                    }} />
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}