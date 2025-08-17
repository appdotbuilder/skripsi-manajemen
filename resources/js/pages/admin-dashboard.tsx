import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
    stats: {
        total_students: number;
        total_supervisors: number;
        total_submissions: number;
        pending_submissions: number;
        approved_submissions: number;
        completed_submissions: number;
    };
    recentSubmissions: Array<{
        id: number;
        title: string;
        status: string;
        created_at: string;
        student: {
            name: string;
            student_id: string;
        };
        supervisor?: {
            name: string;
        };
    }>;
    upcomingSchedules: Array<{
        id: number;
        scheduled_at: string;
        agenda: string;
        location: string;
        student: {
            name: string;
            student_id: string;
        };
        supervisor: {
            name: string;
        };
        thesisSubmission: {
            title: string;
        };
    }>;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentSubmissions, upcomingSchedules }: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-purple-100 text-purple-800',
        };
        
        const labels = {
            pending: '⏳ Menunggu',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak',
            in_progress: '🔄 Berlangsung',
            completed: '🎉 Selesai',
        };

        return (
            <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
                {labels[status as keyof typeof labels] || status}
            </Badge>
        );
    };

    return (
        <AppLayout>
            <Head title="Dashboard Administrator" />
            
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">⚙️ Dashboard Administrator</h1>
                    <p className="text-purple-100">
                        Kelola seluruh sistem manajemen bimbingan skripsi dengan kontrol penuh
                    </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 text-xl">🎓</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Mahasiswa</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_students}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600 text-xl">👨‍🏫</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Dosen</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_supervisors}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600 text-xl">📋</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Pengajuan</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_submissions}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <span className="text-yellow-600 text-xl">⏳</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Menunggu</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pending_submissions}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-green-600 text-xl">✅</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Disetujui</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.approved_submissions}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-600 text-xl">🎉</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.completed_submissions}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Aksi Cepat</CardTitle>
                        <CardDescription>
                            Akses fitur administrasi utama dengan cepat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link href="/users?role=student" className="block">
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <span className="text-2xl">👥</span>
                                    <span>Kelola Mahasiswa</span>
                                </Button>
                            </Link>
                            <Link href="/users?role=supervisor" className="block">
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <span className="text-2xl">👨‍🏫</span>
                                    <span>Kelola Dosen</span>
                                </Button>
                            </Link>
                            <Link href="/thesis-submissions" className="block">
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <span className="text-2xl">📋</span>
                                    <span>Kelola Pengajuan</span>
                                </Button>
                            </Link>
                            <Link href="/reports" className="block">
                                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                                    <span className="text-2xl">📊</span>
                                    <span>Laporan</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Submissions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Pengajuan Terbaru</CardTitle>
                            <CardDescription>
                                Pengajuan skripsi yang baru diterima sistem
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentSubmissions.length > 0 ? (
                                <div className="space-y-4">
                                    {recentSubmissions.slice(0, 5).map((submission) => (
                                        <div key={submission.id} className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        🎓 {submission.student.name} ({submission.student.student_id})
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {submission.title}
                                                    </p>
                                                    {submission.supervisor && (
                                                        <p className="text-sm text-blue-600">
                                                            👨‍🏫 {submission.supervisor.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-end space-y-1">
                                                    {getStatusBadge(submission.status)}
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(submission.created_at).toLocaleDateString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href="/thesis-submissions" className="block">
                                        <Button variant="outline" className="w-full">
                                            📋 Lihat Semua Pengajuan
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="text-gray-400 text-4xl mb-2">📋</div>
                                    <p className="text-gray-600">Belum ada pengajuan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upcoming Schedules */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Jadwal Bimbingan Mendatang</CardTitle>
                            <CardDescription>
                                Jadwal bimbingan yang akan berlangsung
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcomingSchedules.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingSchedules.slice(0, 5).map((schedule) => (
                                        <div key={schedule.id} className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        🎓 {schedule.student.name} & 👨‍🏫 {schedule.supervisor.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        📍 {schedule.location}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-medium text-blue-600">
                                                    {new Date(schedule.scheduled_at).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            {schedule.agenda && (
                                                <p className="text-sm text-gray-700 bg-white p-2 rounded">
                                                    📋 {schedule.agenda}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                    <Link href="/guidance-schedules" className="block">
                                        <Button variant="outline" className="w-full">
                                            📅 Lihat Semua Jadwal
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="text-gray-400 text-4xl mb-2">📅</div>
                                    <p className="text-gray-600">Tidak ada jadwal mendatang</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}