import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Sistem Manajemen Bimbingan Skripsi" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Navigation */}
                <nav className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">📚</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-xl text-gray-900">SIMBIM</h1>
                            <p className="text-xs text-gray-600">Sistem Manajemen Bimbingan</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                            >
                                Dashboard ({auth.user.name})
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                                >
                                    Masuk
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">Daftar</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            📚 Sistem Informasi <br />
                            <span className="text-blue-600">Manajemen Bimbingan Skripsi</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Platform terintegrasi untuk mengelola seluruh proses bimbingan skripsi mahasiswa. 
                            Kelola pengajuan, jadwal bimbingan, dan progres dengan mudah dan efisien.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="lg" className="px-8">
                                        🚀 Buka Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="px-8">
                                            🎓 Mulai Sekarang
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button variant="outline" size="lg" className="px-6">
                                            Masuk
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Fitur Lengkap</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Semua yang Anda butuhkan untuk mengelola bimbingan skripsi
                        </p>
                    </div>

                    <div className="mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {/* Student Features */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="text-4xl mb-4">🎓</div>
                                <dt className="text-xl font-semibold leading-7 text-gray-900">
                                    Untuk Mahasiswa
                                </dt>
                                <dd className="mt-4 text-base leading-7 text-gray-600">
                                    <ul className="space-y-2">
                                        <li>✅ Pengajuan judul skripsi online</li>
                                        <li>📊 Tracking progres secara real-time</li>
                                        <li>📅 Penjadwalan bimbingan otomatis</li>
                                        <li>📝 Catatan bimbingan terintegrasi</li>
                                        <li>🔔 Notifikasi jadwal dan deadline</li>
                                    </ul>
                                </dd>
                            </div>

                            {/* Supervisor Features */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="text-4xl mb-4">👨‍🏫</div>
                                <dt className="text-xl font-semibold leading-7 text-gray-900">
                                    Untuk Dosen Pembimbing
                                </dt>
                                <dd className="mt-4 text-base leading-7 text-gray-600">
                                    <ul className="space-y-2">
                                        <li>📋 Kelola semua bimbingan mahasiswa</li>
                                        <li>💬 Berikan feedback dan catatan</li>
                                        <li>⏰ Atur jadwal bimbingan fleksibel</li>
                                        <li>📈 Monitor progres mahasiswa</li>
                                        <li>🎯 Penilaian dan evaluasi</li>
                                    </ul>
                                </dd>
                            </div>

                            {/* Admin Features */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="text-4xl mb-4">⚙️</div>
                                <dt className="text-xl font-semibold leading-7 text-gray-900">
                                    Untuk Administrator
                                </dt>
                                <dd className="mt-4 text-base leading-7 text-gray-600">
                                    <ul className="space-y-2">
                                        <li>🗃️ Kelola data mahasiswa & dosen</li>
                                        <li>📊 Dashboard analitik lengkap</li>
                                        <li>📋 Laporan kinerja komprehensif</li>
                                        <li>🔍 Monitor seluruh aktivitas</li>
                                        <li>⚡ Manajemen sistem terintegrasi</li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
                    <div className="bg-blue-600 rounded-3xl px-6 py-16 sm:py-20 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    🚀 Platform Modern & Terintegrasi
                                </h2>
                                <p className="mt-4 text-lg leading-8 text-blue-100">
                                    Dirancang khusus untuk kebutuhan perguruan tinggi Indonesia
                                </p>
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-blue-700/50 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-blue-200">Penjadwalan</dt>
                                    <dd className="order-first text-3xl font-bold tracking-tight text-white">Otomatis</dd>
                                </div>
                                <div className="bg-blue-700/50 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-blue-200">Notifikasi</dt>
                                    <dd className="order-first text-3xl font-bold tracking-tight text-white">Real-time</dd>
                                </div>
                                <div className="bg-blue-700/50 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-blue-200">Interface</dt>
                                    <dd className="order-first text-3xl font-bold tracking-tight text-white">Modern</dd>
                                </div>
                                <div className="bg-blue-700/50 p-8">
                                    <dt className="text-sm font-semibold leading-6 text-blue-200">Laporan</dt>
                                    <dd className="order-first text-3xl font-bold tracking-tight text-white">Lengkap</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Siap untuk memulai?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            Bergabunglah dengan sistem manajemen bimbingan skripsi yang telah dipercaya 
                            oleh ribuan mahasiswa dan dosen di seluruh Indonesia.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="lg" className="px-8">
                                        🎯 Lanjut ke Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="px-8">
                                            🚀 Daftar Gratis
                                        </Button>
                                    </Link>
                                    <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                        Sudah punya akun? Masuk <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                © 2024 SIMBIM - Sistem Informasi Manajemen Bimbingan Skripsi. 
                                Dibuat dengan ❤️ untuk kemajuan pendidikan Indonesia.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}