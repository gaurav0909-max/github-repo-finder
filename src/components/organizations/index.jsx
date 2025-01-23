"use client"
import React, { useState } from 'react';
import { Users, Link2, MapPin, Calendar, GitFork, Building2 } from 'lucide-react';
import Organizations from '@/lib/github/organizations/organizations.server';
import Pagination from '../pagination';

const Organization = ({ data }) => {
    console.log("data", data)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Number of organizations per page
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Paginated Data
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="px-4 py-2">
            <h1 className="text-3xl font-bold mb-8 text-gray-400">Organizations</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentData.map((org) => (
                    <div
                        key={org.id}
                        className="p-6 bg-[#1B2433] rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-600"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={org.avatar_url}
                                alt={`${org.login} avatar`}
                                className="w-16 h-16 rounded-full border border-slate-300"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-400">{org.login}</h2>

                            </div>
                        </div>

                        {org.description && (
                            <p className="text-gray-600 mb-4 text-sm">{org.description}</p>
                        )}

                        <div className="space-y-2 text-sm">
                            {org.location && (
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <MapPin className="w-4 h-4" color='white' />
                                    <span>{org.location}</span>
                                </div>
                            )}

                            {org.blog && (
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Link2 className="w-4 h-4" />
                                    <a
                                        href={org.blog}
                                        className="text-blue-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Website
                                    </a>
                                </div>
                            )}

                            <div className="flex items-center space-x-2 text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>{org.public_members_count || 0} Members</span>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-400">
                                <GitFork className="w-4 h-4" />
                                <span>{org.public_repos || 0} Repositories</span>
                            </div>

                            {org.created_at && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        Created {new Date(org.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                            {org.type && (
                                <div className="flex items-center space-x-1">
                                    <Building2 className="w-4 h-4" />
                                    <span>{org.type}</span>
                                </div>
                            )}
                            {org.is_verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    Verified
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Organization;
