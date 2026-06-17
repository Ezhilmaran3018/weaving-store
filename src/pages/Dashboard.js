import React from 'react';

const Dashboard = () => {
  const orders = [
    { id: '#12345', date: '2024-01-15', status: 'Delivered', total: '₹8,999' },
    { id: '#12344', date: '2024-01-10', status: 'In Transit', total: '₹6,499' },
    { id: '#12343', date: '2024-01-05', status: 'Processing', total: '₹7,999' },
  ];

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">15</div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">₹45,499</div>
            <div className="text-gray-600">Total Spent</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">8</div>
            <div className="text-gray-600">Wishlist Items</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-primary font-semibold">Order ID</th>
                  <th className="text-left py-3 text-primary font-semibold">Date</th>
                  <th className="text-left py-3 text-primary font-semibold">Status</th>
                  <th className="text-left py-3 text-primary font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-100">
                    <td className="py-3">{order.id}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-primary">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
