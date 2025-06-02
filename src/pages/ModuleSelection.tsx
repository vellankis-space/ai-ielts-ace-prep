
import React from 'react';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';

const ModuleSelection = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Modules' }]} />
        <h1 className="text-3xl font-bold text-gray-900">Module Selection - Coming Soon</h1>
        <p className="text-gray-600 mt-4">This page will be implemented in the next iteration.</p>
      </div>
    </Layout>
  );
};

export default ModuleSelection;
