import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Props {
    supervisions: Array<{
        id: number;
        title: string;
        status: string;
        progress_percentage: number;
        student: {
            name: string;
            student_id: string;
        };
        created_at: string;
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
        thesisSubmission: {
            title: string;
        };
    }>;
    pendingNotes: Array<{
        id: number;
        content: string;
        priority: string;
        created_at: string;
        student: {
            name: string;
            student_id: string;
        };
        thesisSubmission: {
            title: string;
        };
    }>;
    [key: string]: unknown;
}

export default function SupervisorDashboard({ supervisions, upcomingSchedules, pendingNotes }: Props) {
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
            <Head title="Dashboard Dosen Pembimbing" />
            
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">👨‍🏫 Selamat Datang, Dosen Pembimbing!</h1>
                    <p className="text-green-100">
                        Kelola bimbingan mahasiswa dengan efektif dan terstruktur
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 text-xl">👥</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Bimbingan</p>
                                    <p className="text-2xl font-bold text-gray-900">{supervisions.length}</p>
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
                                    <p className="text-2xl font-bold text-gray-900">
                                        {supervisions.filter(s => s.status === 'pending').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 text-xl">🔄</span>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Berlangsung</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {supervisions.filter(s => s.status === 'in_progress' || s.status === 'approved').length}
                                    </p>
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
                                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {supervisions.filter(s => s.status === 'completed').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Student Supervisions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>👥 Mahasiswa Bimbingan</CardTitle>
                            <CardDescription>
                                Daftar mahasiswa yang sedang Anda bimbing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {supervisions.length > 0 ? (
                                <div className="space-y-4">
                                    {supervisions.slice(0, 5).map((supervision) => (
                                        <div key={supervision.id} className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        🎓 {supervision.student.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        ID: {supervision.student.student_id}
                                                    </p>
                                                </div>
                                                {getStatusBadge(supervision.status)}
                                            </div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                                                {supervision.title}
                                            </h4>
                                            {(supervision.status === 'approved' || supervision.status === 'in_progress' || supervision.status === 'completed') && (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs text-gray-600">
                                                        <span>Progres:</span>
                                                        <span>{supervision.progress_percentage}%</span>
                                                    </div>
                                                    <Progress value={supervision.progress_percentage} className="w-full h-2" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <Link href="/thesis-submissions" className="block">
                                        <Button variant="outline" className="w-full">
                                            👥 Lihat Semua Bimbingan
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="text-gray-400 text-4xl mb-2">👥</div>
                                    <p className="text-gray-600">Belum ada mahasiswa bimbingan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upcoming Schedules */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Jadwal Bimbingan Mendatang</CardTitle>
                            <CardDescription>
                                Jadwal pertemuan dengan mahasiswa bimbingan
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
                                                        🎓 {schedule.student.name}
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

                {/* Pending Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle>📝 Catatan Yang Perlu Ditanggapi</CardTitle>
                        <CardDescription>
                            Catatan dan pertanyaan dari mahasiswa yang memerlukan feedback
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingNotes.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {pendingNotes.map((note) => (
                                    <div key={note.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">
                                                    🎓 {note.student.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {note.thesisSubmission.title}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {getPriorityBadge(note.priority)}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">
                                            {note.content}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-600">
                                            <span>{new Date(note.created_at).toLocaleDateString('id-ID')}</span>
                                            <Button size="sm" variant="outline">
                                                💬 Tanggapi
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-gray-400 text-4xl mb-2">📝</div>
                                <p className="text-gray-600">Semua catatan telah ditanggapi</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}