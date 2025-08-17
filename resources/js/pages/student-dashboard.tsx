import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Props {
    thesisSubmission?: {
        id: number;
        title: string;
        status: string;
        progress_percentage: number;
        supervisor?: {
            name: string;
        };
        created_at: string;
        approved_at?: string;
        deadline?: string;
    };
    upcomingSchedules: Array<{
        id: number;
        scheduled_at: string;
        agenda: string;
        location: string;
        supervisor: {
            name: string;
        };
        thesisSubmission: {
            title: string;
        };
    }>;
    recentNotes: Array<{
        id: number;
        content: string;
        feedback: string;
        priority: string;
        created_at: string;
        supervisor: {
            name: string;
        };
        is_read: boolean;
    }>;
    [key: string]: unknown;
}

export default function StudentDashboard({ thesisSubmission, upcomingSchedules, recentNotes }: Props) {
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

    const getPriorityBadge = (priority: string) => {
        const variants = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800',
        };
        
        const labels = {
            low: '📊 Rendah',
            medium: '⚠️ Sedang',
            high: '🚨 Tinggi',
        };

        return (
            <Badge className={variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
                {labels[priority as keyof typeof labels] || priority}
            </Badge>
        );
    };

    return (
        <AppLayout>
            <Head title="Dashboard Mahasiswa" />
            
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">🎓 Selamat Datang, Mahasiswa!</h1>
                    <p className="text-blue-100">
                        Kelola progres skripsi Anda dengan mudah dan efisien
                    </p>
                </div>

                {/* Thesis Status Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>📋 Status Skripsi Anda</span>
                            {!thesisSubmission && (
                                <Link href="/thesis-submissions/create">
                                    <Button>
                                        ➕ Ajukan Judul
                                    </Button>
                                </Link>
                            )}
                        </CardTitle>
                        <CardDescription>
                            Informasi lengkap tentang pengajuan skripsi Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {thesisSubmission ? (
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {thesisSubmission.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Pembimbing: {thesisSubmission.supervisor?.name || 'Belum ditentukan'}
                                        </p>
                                    </div>
                                    {getStatusBadge(thesisSubmission.status)}
                                </div>
                                
                                {thesisSubmission.status === 'approved' || thesisSubmission.status === 'in_progress' || thesisSubmission.status === 'completed' ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progres:</span>
                                            <span className="font-medium">{thesisSubmission.progress_percentage}%</span>
                                        </div>
                                        <Progress value={thesisSubmission.progress_percentage} className="w-full" />
                                    </div>
                                ) : null}
                                
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="text-sm text-gray-600">
                                        📅 Diajukan: {new Date(thesisSubmission.created_at).toLocaleDateString('id-ID')}
                                        {thesisSubmission.approved_at && (
                                            <>
                                                <br />
                                                ✅ Disetujui: {new Date(thesisSubmission.approved_at).toLocaleDateString('id-ID')}
                                            </>
                                        )}
                                    </div>
                                    <Link href={`/thesis-submissions/${thesisSubmission.id}`}>
                                        <Button variant="outline" size="sm">
                                            📖 Detail
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 text-6xl mb-4">📝</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Belum Ada Pengajuan Skripsi
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Mulai perjalanan skripsi Anda dengan mengajukan judul terlebih dahulu
                                </p>
                                <Link href="/thesis-submissions/create">
                                    <Button>
                                        🚀 Ajukan Judul Skripsi
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upcoming Schedules */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Jadwal Bimbingan Mendatang</CardTitle>
                            <CardDescription>
                                Jangan sampai terlewat jadwal bimbingan Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcomingSchedules.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingSchedules.map((schedule) => (
                                        <div key={schedule.id} className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        👨‍🏫 {schedule.supervisor.name}
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
                                            📋 Lihat Semua Jadwal
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

                    {/* Recent Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📝 Catatan Bimbingan Terbaru</CardTitle>
                            <CardDescription>
                                Feedback dan rekomendasi dari dosen pembimbing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentNotes.length > 0 ? (
                                <div className="space-y-4">
                                    {recentNotes.map((note) => (
                                        <div key={note.id} className={`p-4 rounded-lg ${note.is_read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        👨‍🏫 {note.supervisor.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(note.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {getPriorityBadge(note.priority)}
                                                    {!note.is_read && (
                                                        <Badge className="bg-blue-100 text-blue-800">
                                                            🆕 Baru
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-2">
                                                {note.content}
                                            </p>
                                            {note.feedback && (
                                                <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded">
                                                    💡 {note.feedback}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                    <Link href="/guidance-notes" className="block">
                                        <Button variant="outline" className="w-full">
                                            📚 Lihat Semua Catatan
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="text-gray-400 text-4xl mb-2">📝</div>
                                    <p className="text-gray-600">Belum ada catatan bimbingan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}